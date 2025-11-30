import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, ArrowLeft, Download } from "lucide-react";
import LanguageSelector from "@/components/session/LanguageSelector";
import ModelSelector from "@/components/session/ModelSelector";
import ConnectionManager from "@/components/session/ConnectionManager";
import { useSessionWebSocket } from "@/hooks/useSessionWebSocket";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "@/store/sessionSlice";
import { type RootState } from "@/store/store";
import { exportToMarkdown } from "@/lib/exportUtils";
import { useState } from "react";

import { useNavigate } from "react-router";

export default function SettingsModal() {
    const { connect, disconnect } = useSessionWebSocket();
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.session.messages);
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [open, setOpen] = useState(false);

    const handleEndSession = () => {
        disconnect();
        dispatch(clearSession());
        setShowConfirmation(false);
        setOpen(false);
        navigate('/dashboard');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 md:h-9 md:w-9 rounded-lg border border-border">
                    <Settings className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{showConfirmation ? 'End Session?' : 'Session Settings'}</DialogTitle>
                </DialogHeader>

                {showConfirmation ? (
                    <div className="flex flex-col gap-6 py-4">
                        <p className="text-sm text-muted-foreground">
                            Are you sure you want to end the current session? This will disconnect the hardware and clear your chat history.
                        </p>
                        <div className="flex flex-col gap-2">
                            <Button
                                variant="destructive"
                                onClick={handleEndSession}
                                className="w-full"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                End Session
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowConfirmation(false)}
                                className="w-full"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 py-4">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm font-medium">Connection</h3>
                            <ConnectionManager onConnect={connect} />
                        </div>

                        <div className="h-px bg-border" />

                        <div className="flex flex-col gap-4">
                            <LanguageSelector />
                            <ModelSelector />
                        </div>

                        <div className="h-px bg-border" />

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => exportToMarkdown(messages)}
                            disabled={messages.length === 0}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export Conversation
                        </Button>

                        <div className="h-px bg-border" />

                        <Button
                            variant="outline"
                            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/50"
                            onClick={() => setShowConfirmation(true)}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            End Session
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
