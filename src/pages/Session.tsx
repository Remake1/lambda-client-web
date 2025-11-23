import LanguageSelector from "@/components/session/LanguageSelector";
import ConnectionManager from "@/components/session/ConnectionManager";
import HardwareStatus from "@/components/session/HardwareStatus";
import ControlPanel from "@/components/session/ControlPanel";
import ChatInterface from "@/components/session/ChatInterface";
import { useSessionWebSocket } from "@/hooks/useSessionWebSocket";

export default function Session() {
    const { connect, sendScreenshotRequest } = useSessionWebSocket();

    return (
        <div className="container mx-auto py-8 px-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Assessment Session</h1>
                <p className="text-muted-foreground">
                    Connect to the hardware client to start your assessment.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between p-6 border rounded-lg bg-card shadow-sm">
                <LanguageSelector />
                <ConnectionManager onConnect={connect} />
            </div>

            <HardwareStatus />

            <ControlPanel onTakeScreenshot={sendScreenshotRequest} />

            <ChatInterface />
        </div>
    );
}