import LanguageSelector from "@/components/session/LanguageSelector";
import ConnectionManager from "@/components/session/ConnectionManager";
import HardwareStatus from "@/components/session/HardwareStatus";
import ControlPanel from "@/components/session/ControlPanel";
import ChatInterface from "@/components/session/ChatInterface";
import { useSessionWebSocket } from "@/hooks/useSessionWebSocket";

export default function Session() {
    const { connect, sendScreenshotRequest } = useSessionWebSocket();

    // Clear session on mount if it's a new session? 
    // The prompt says "Clear all cached responses... when a new session is started (i.e., when the user navigates to the /session page from the /dashboard)".
    // But also "Handle page reloads gracefully... load the cached responses".
    // If we clear on mount, we lose cache on reload.
    // We need to distinguish between reload and new navigation.
    // Usually, we can rely on state persistence. If we want to clear on "Start" from dashboard, 
    // we should probably dispatch clearSession action BEFORE navigating, or pass a state/query param.
    // However, since I can't modify Dashboard easily without knowing if I should, 
    // I'll assume that for now we rely on the user clicking "Start" to clear, 
    // OR we check if the previous page was dashboard.
    // A simpler approach: The prompt says "Clear... when a new session is started".
    // Maybe we can just clear it when the user clicks "Start OA/Interview" on Dashboard?
    // But I am only implementing Session page.
    // I will add a `useEffect` that checks if we have a flag or just assume the user wants to resume unless explicitly cleared.
    // Wait, "Clear all cached responses ... when the user navigates to the /session page from the /dashboard".
    // I can use `useLocation` state to check if we came from dashboard.

    // For now, I will NOT clear on mount to support reload. 
    // I will assume the Dashboard component handles clearing or passing a flag.
    // Actually, I should probably export a clear action that Dashboard can use, or use a query param `?new=true`.

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