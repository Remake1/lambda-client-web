import { useSessionStatus } from "@/hooks/useSessionStatus";
import ChatInterface from "@/components/session/ChatInterface";
import ConnectionManager from "@/components/session/ConnectionManager";
import HardwareStatus from "@/components/session/HardwareStatus";
import LanguageSelector from "@/components/session/LanguageSelector";
import { useSessionWebSocket } from "@/hooks/useSessionWebSocket";

export default function Session() {
    const { connect } = useSessionWebSocket();
    const { isFullyConnected } = useSessionStatus();

    if (isFullyConnected) {
        return (
            <div className="container mx-auto max-w-4xl h-full">
                <ChatInterface />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 flex flex-col gap-8 max-w-2xl">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Assessment Session</h1>
                <p className="text-muted-foreground">
                    Connect to the hardware client to start your assessment.
                </p>
            </div>

            <div className="flex flex-col gap-6 p-8 border rounded-xl bg-card shadow-sm">
                <div className="flex flex-col gap-4">
                    <h3 className="font-medium">1. Connection</h3>
                    <ConnectionManager onConnect={connect} />
                    <HardwareStatus />
                </div>

                <div className="h-px bg-border" />

                <div className="flex flex-col gap-4">
                    <h3 className="font-medium">2. Configuration</h3>
                    <LanguageSelector />
                </div>
            </div>
        </div>
    );
}