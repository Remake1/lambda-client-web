import { useContext } from 'react';
import { SessionWebSocketContext } from '@/contexts/SessionWebSocketContext';

export function useSessionWebSocket() {
    const context = useContext(SessionWebSocketContext);
    if (!context) {
        throw new Error("useSessionWebSocket must be used within a SessionWebSocketProvider");
    }
    return context;
}
