import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Camera, RefreshCw, MessageCircleQuestionMark, CodeXml, AArrowUp, AArrowDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { setQuestionStyle, increaseFontSize, decreaseFontSize, QuestionStyle } from "@/store/sessionSlice";
import { useSessionWebSocket } from "@/contexts/SessionWebSocketContext";
import SettingsModal from "./SettingsModal";
import { cn } from "@/lib/utils";
import { useSessionStatus } from "@/hooks/useSessionStatus";

export default function SessionSidebar() {
    const dispatch = useDispatch();
    const questionStyle = useSelector((state: RootState) => state.session.questionStyle);
    const { isConnected, isFullyConnected } = useSessionStatus();
    const { sendScreenshotRequest, connect } = useSessionWebSocket();

    return (
        <TooltipProvider>
            <div className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-1.5 md:p-2 bg-background/80 backdrop-blur-sm border rounded-xl shadow-lg z-50">
                {/* Screenshot */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-7 w-7 md:h-9 md:w-9 rounded-lg bg-white hover:bg-white/90 text-black shadow-sm border border-border"
                            onClick={sendScreenshotRequest}
                            disabled={!isFullyConnected}
                        >
                            <Camera className="h-4 w-4 md:h-5 md:w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">Take Screenshot</TooltipContent>
                </Tooltip>

                {/* Mode Switch */}
                <div className="flex flex-col gap-1 md:gap-2 mt-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "h-7 w-7 md:h-9 md:w-9 rounded-lg border border-border",
                                    questionStyle === QuestionStyle.LeetCode && "border-gray-500"
                                )}
                                onClick={() => dispatch(setQuestionStyle(QuestionStyle.LeetCode))}
                            >
                                <CodeXml className="h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">LeetCode Mode</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "h-7 w-7 md:h-9 md:w-9 rounded-lg border border-border",
                                    questionStyle === QuestionStyle.Other && "border-gray-500"
                                )}
                                onClick={() => dispatch(setQuestionStyle(QuestionStyle.Other))}
                            >
                                <MessageCircleQuestionMark className="h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Other Mode</TooltipContent>
                    </Tooltip>
                </div>

                <div className="h-px bg-border w-full my-0.5" />

                {/* Font Size */}
                <div className="flex flex-col gap-1 md:gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 md:h-9 md:w-9 rounded-lg border border-border"
                                onClick={() => dispatch(increaseFontSize())}
                            >
                                <AArrowUp className="h-5 w-5 md:h-6 md:w-6" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Increase Font Size</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 md:h-9 md:w-9 rounded-lg border border-border"
                                onClick={() => dispatch(decreaseFontSize())}
                            >
                                <AArrowDown className="h-5 w-5 md:h-6 md:w-6" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Decrease Font Size</TooltipContent>
                    </Tooltip>
                </div>

                <div className="h-px bg-border w-full my-0.5" />

                {/* Status & Refresh */}
                <div className="flex flex-col items-center gap-2 md:gap-3 py-1 md:py-2">
                    <Tooltip>
                        <TooltipTrigger>
                            <div className={cn(
                                "h-2 w-2 md:h-2.5 md:w-2.5 rounded-full shadow-sm transition-colors",
                                isConnected ? "bg-green-500" : "bg-red-500"
                            )} />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </TooltipContent>
                    </Tooltip>

                    {!isConnected && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 md:h-7 md:w-7 rounded-lg text-muted-foreground hover:text-foreground border border-border"
                                    onClick={connect}
                                >
                                    <RefreshCw className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Reconnect</TooltipContent>
                        </Tooltip>
                    )}
                </div>

                <div className="h-px bg-border w-full my-0.5" />

                {/* Settings */}
                <SettingsModal />
            </div>
        </TooltipProvider>
    );
}
