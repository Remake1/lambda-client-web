import { Outlet } from "react-router";
import SessionSidebar from "@/components/session/SessionSidebar";
import { SessionWebSocketProvider } from "@/contexts/SessionWebSocketContext";

export default function SessionLayout() {
    return (
        <SessionWebSocketProvider>
            <div className="min-h-screen bg-background relative">
                <SessionSidebar />
                <main className="pl-20 pr-4 py-4 min-h-screen">
                    <Outlet />
                </main>
            </div>
        </SessionWebSocketProvider>
    );
}
