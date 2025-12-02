import { useCallback, useEffect, useRef, useState } from "react";

export function useScreenWakeLock() {
    const wakeLockRef = useRef<WakeLockSentinel | null>(null);
    const [isWakeLockActive, setIsWakeLockActive] = useState(false);

    const requestWakeLock = useCallback(async () => {
        if (wakeLockRef.current) {
            return; // Already locked
        }

        if ("wakeLock" in navigator) {
            try {
                wakeLockRef.current = await navigator.wakeLock.request("screen");
                setIsWakeLockActive(true);
                console.log("Screen Wake Lock is active.");

                // Listen for release events (e.g., tab visibility change)
                wakeLockRef.current.addEventListener("release", () => {
                    console.log("Screen Wake Lock was released by the browser.");
                    wakeLockRef.current = null;
                    setIsWakeLockActive(false);
                });
            } catch (err) {
                console.error(`Screen Wake Lock failed: ${(err as Error).message}`);
                wakeLockRef.current = null;
                setIsWakeLockActive(false);
            }
        }
    }, []);

    const releaseWakeLock = useCallback(async () => {
        if (wakeLockRef.current) {
            await wakeLockRef.current.release();
            // The 'release' event listener will handle state updates.
        }
    }, []);

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (wakeLockRef.current) {
                wakeLockRef.current.release();
            }
        };
    }, []);

    return { requestWakeLock, releaseWakeLock, isWakeLockActive };
}