import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '@/store/store';
import {
    setConnectionStatus,
    setHardwareStatus,
    addMessage,
    restoreSession,
    type Message
} from '@/store/sessionSlice';


export function useSessionWebSocket() {
    const dispatch = useDispatch();
    const { isConnected, language, questionStyle } = useSelector((state: RootState) => state.session);
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
    const sessionState = useSelector((state: RootState) => state.session);
    useEffect(() => {
        if (sessionState.messages.length > 0 || sessionState.isConnected) {
            localStorage.setItem('lambda_session', JSON.stringify(sessionState));
        }
    }, [sessionState]);

    const connect = useCallback(() => {
        if (socketRef.current?.readyState === WebSocket.OPEN) return;

        const token = localStorage.getItem('access_token');

        if (!token) {
            console.error("No token found");
            return;
        }

        const ws = new WebSocket(`ws://localhost:3000/ws/client?token=${token}`);

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
                        content: message,
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
    }, [dispatch]);

    // Auto-reconnect if session was connected
    useEffect(() => {
        if (isConnected && !socketRef.current) {
            connect();
        }
    }, [isConnected, connect]);

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
                content: message,
                timestamp: Date.now()
            }));
        } else {
            console.error("WebSocket not connected");
        }
    }, [questionStyle, language, dispatch]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // We don't necessarily        const token = localStorage.getItem('access_token');eeded.
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
