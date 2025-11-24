import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { setHardwareStatus } from "@/store/sessionSlice";

export default function HardwareStatus() {
    const dispatch = useDispatch();
    const hardwareStatus = useSelector((state: RootState) => state.session.hardwareStatus);

    if (hardwareStatus === 'connected') {
        return null;
    }

    return (
        <div className="p-4 border border-yellow-500 bg-yellow-500/10 rounded-lg flex flex-col gap-4">
            <p className="text-yellow-700 dark:text-yellow-400 font-medium">
                Waiting for your desktop connection.
            </p>
            <Button
                variant="outline"
                onClick={() => dispatch(setHardwareStatus('connected'))}
                className="w-fit"
            >
                I've successfully connected my desktop, proceed anyway
            </Button>
        </div>
    );
}
