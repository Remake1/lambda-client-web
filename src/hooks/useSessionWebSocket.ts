import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/store/store';
import {
    setConnectionStatus,
    setHardwareStatus,
    addMessage,
    restoreSession,
} from '@/store/sessionSlice';

export function useSessionWebSocket() {
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
        // Only save if we have some state worth saving
        if (messages.length > 0 || isConnected) {
            const sessionState = {
                isConnected, // Note: persisting isConnected=true might cause auto-reconnect loops if not handled carefully
                language,
                questionStyle,
                messages,
                hardwareStatus: 'waiting' // Always reset to waiting on reload? Or persist?
            };
            localStorage.setItem('lambda_session', JSON.stringify(sessionState));
        }
    }, [messages, isConnected, language, questionStyle]);

    const connect = useCallback(() => {
        if (socketRef.current?.readyState === WebSocket.OPEN) return;

        const token = accessToken || localStorage.getItem('access_token');

        if (!token) {
            console.error("No token found");
            return;
        }

        // Use relative path or env var in real app, but sticking to localhost:3000 as seen in previous edits
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
                        dispatch(setHardwareStatus('waiting'));
                    } else if (message.payload?.message === 'hardware_connected') {
                        dispatch(setHardwareStatus('connected'));
                    }
                } else if (message.type === 'image_analysis_result') {
                    dispatch(addMessage({
                        type: 'ai',
                        content: message, // Pass full message object so UI can access payload.ai_result
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
                content: message, // Pass object so UI can access type and language
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

    return {
        connect,
        disconnect,
        sendScreenshotRequest
    };
}
