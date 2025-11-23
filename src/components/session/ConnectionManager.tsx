import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "@/store/store";
import { refreshSession } from "@/store/authSlice";
import { useState } from "react";

interface ConnectionManagerProps {
    onConnect: () => void;
}

export default function ConnectionManager({ onConnect }: ConnectionManagerProps) {
    const isConnected = useSelector((state: RootState) => state.session.isConnected);

    const dispatch = useDispatch<AppDispatch>();
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            await dispatch(refreshSession()).unwrap();
            onConnect();
        } catch (error) {
            console.error("Failed to refresh session:", error);
            // Optionally show error toast
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-muted-foreground">
                    {isConnected ? 'Connected' : 'Disconnected'}
                </span>
            </div>
            {!isConnected && (
                <Button onClick={handleConnect} disabled={isConnecting}>
                    {isConnecting ? 'Connecting...' : 'Connect to the session'}
                </Button>
            )}
        </div>
    );
}
