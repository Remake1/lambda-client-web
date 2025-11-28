import React, { createContext, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/store/store';
import {
    setConnectionStatus,
    setHardwareStatus,
    addMessage,
    restoreSession,
    HardwareStatus,
    type AIContent
} from '@/store/sessionSlice';

interface SessionWebSocketContextType {
    connect: () => void;
    disconnect: () => void;
    sendScreenshotRequest: () => void;
}

const SessionWebSocketContext = createContext<SessionWebSocketContextType | null>(null);

export { SessionWebSocketContext };

export function SessionWebSocketProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const { isConnected, language, questionStyle, messages } = useSelector((state: RootState) => state.session);
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const socketRef = useRef<WebSocket | null>(null);

    // Restore session from localStorage on mount
    useEffect(() => {
        const savedSession = localStorage.getItem('lambda_session');
        if (savedSession) {
            try {
                const parsedSession = JSON.parse(savedSession);
                dispatch(restoreSession(parsedSession));
            } catch (e) {
                console.error("Failed to restore session", e);
            }
        }
    }, [dispatch]);

    // Save session to localStorage on update
    useEffect(() => {
        if (messages.length > 0 || isConnected) {
            const sessionState = {
                isConnected,
                language,
                questionStyle,
                messages,
                hardwareStatus: HardwareStatus.Waiting
            };
            localStorage.setItem('lambda_session', JSON.stringify(sessionState));
        }
    }, [messages, isConnected, language, questionStyle]);

    const connect = useCallback(() => {
        if (socketRef.current?.readyState === WebSocket.OPEN || socketRef.current?.readyState === WebSocket.CONNECTING) return;

        const token = accessToken || localStorage.getItem('access_token');

        if (!token) {
            console.error("No token found");
            return;
        }

        const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3000/ws';
        const ws = new WebSocket(`${wsUrl}/client?token=${token}`);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
            dispatch(setConnectionStatus(true));
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                if (message.type === 'system_status') {
                    if (message.payload?.message === 'hardware_not_connected') {
                        dispatch(setHardwareStatus(HardwareStatus.Waiting));
                    } else if (message.payload?.message === 'hardware_connected') {
                        dispatch(setHardwareStatus(HardwareStatus.Connected));
                    }
                } else if (message.type === 'image_analysis_result') {
                    const aiContent: AIContent = {
                        type: 'image_analysis_result',
                        payload: message.payload
                    };
                    dispatch(addMessage({
                        type: 'ai',
                        content: aiContent,
                        timestamp: Date.now()
                    }));
                }
            } catch (e) {
                console.error("Failed to parse message", e);
            }
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
            dispatch(setConnectionStatus(false));
            socketRef.current = null;
        };

        ws.onerror = (error) => {
            console.error('WebSocket error', error);
        };

        socketRef.current = ws;
    }, [dispatch, accessToken]);

    // Auto-reconnect if session was connected (and we have a token)
    useEffect(() => {
        if (isConnected && !socketRef.current && accessToken) {
            connect();
        }
    }, [isConnected, connect, accessToken]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    }, []);

    const sendScreenshotRequest = useCallback(() => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            const message = {
                type: questionStyle,
                language: language
            };
            socketRef.current.send(JSON.stringify(message));

            dispatch(addMessage({
                type: 'user',
                content: {
                    type: questionStyle,
                    language: language
                },
                timestamp: Date.now()
            }));
        } else {
            console.error("WebSocket not connected");
        }
    }, [questionStyle, language, dispatch]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    return (
        <SessionWebSocketContext.Provider value={{ connect, disconnect, sendScreenshotRequest }}>
            {children}
        </SessionWebSocketContext.Provider>
    );
}
