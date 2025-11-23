import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";

interface ConnectionManagerProps {
    onConnect: () => void;
}

export default function ConnectionManager({ onConnect }: ConnectionManagerProps) {
    const isConnected = useSelector((state: RootState) => state.session.isConnected);

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-muted-foreground">
                    {isConnected ? 'Connected' : 'Disconnected'}
                </span>
            </div>
            {!isConnected && (
                <Button onClick={onConnect}>
                    Connect to the session
                </Button>
            )}
        </div>
    );
}
