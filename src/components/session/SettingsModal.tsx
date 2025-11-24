import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import LanguageSelector from "@/components/session/LanguageSelector";
import ConnectionManager from "@/components/session/ConnectionManager";
import HardwareStatus from "@/components/session/HardwareStatus";
import { useSessionWebSocket } from "@/contexts/SessionWebSocketContext";

export default function SettingsModal() {
    const { connect } = useSessionWebSocket();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 md:h-9 md:w-9 rounded-lg border border-border">
                    <Settings className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Session Settings</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-medium">Connection</h3>
                        <ConnectionManager onConnect={connect} />
                        <HardwareStatus />
                    </div>
                    <div className="flex flex-col gap-4">
                        <LanguageSelector />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
