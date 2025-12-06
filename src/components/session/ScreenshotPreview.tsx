import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { removeScreenshotPreview, MAX_SCREENSHOTS } from "@/store/sessionSlice";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

// Screenshot expiry: 3 minutes
const SCREENSHOT_EXPIRY_MS = 3 * 60 * 1000;

export default function ScreenshotPreview() {
    const dispatch = useDispatch();
    const screenshotPreviews = useSelector((state: RootState) => state.session.screenshotPreviews);
    const isAnalyzing = useSelector((state: RootState) => state.session.isAnalyzing);

    // Auto-remove expired screenshots
    useEffect(() => {
        if (screenshotPreviews.length === 0) return;

        const interval = setInterval(() => {
            const now = Date.now();
            screenshotPreviews.forEach((preview) => {
                if (now - preview.timestamp >= SCREENSHOT_EXPIRY_MS) {
                    dispatch(removeScreenshotPreview(preview.id));
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [screenshotPreviews, dispatch]);

    if (screenshotPreviews.length === 0) {
        return null;
    }

    return (
        <div className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-2 bg-background/80 backdrop-blur-sm border rounded-xl shadow-lg z-50">
            {/* Counter */}
            <div className="text-xs text-center text-muted-foreground font-medium">
                {screenshotPreviews.length}/{MAX_SCREENSHOTS}
            </div>

            {/* Preview Grid */}
            <div className="flex flex-col gap-2">
                {screenshotPreviews.map((preview) => (
                    <div
                        key={preview.id}
                        className={cn(
                            "relative group rounded-lg overflow-hidden border border-border",
                            "w-16 h-12 md:w-20 md:h-14",
                            isAnalyzing && "opacity-50"
                        )}
                    >
                        <img
                            src={`data:image/jpeg;base64,${preview.preview}`}
                            alt="Screenshot preview"
                            className="w-full h-full object-cover"
                        />
                        {/* Delete Button */}
                        <button
                            onClick={() => dispatch(removeScreenshotPreview(preview.id))}
                            disabled={isAnalyzing}
                            className={cn(
                                "absolute top-0.5 right-0.5 p-0.5 rounded-full",
                                "bg-black/60 hover:bg-black/80 text-white",
                                "disabled:cursor-not-allowed"
                            )}
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Max reached indicator */}
            {screenshotPreviews.length >= MAX_SCREENSHOTS && (
                <div className="text-[10px] text-center text-amber-500 font-medium">
                    Max reached
                </div>
            )}
        </div>
    );
}
