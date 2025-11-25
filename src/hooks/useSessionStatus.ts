import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { HardwareStatus } from "@/store/sessionSlice";

export const useSessionStatus = () => {
    const isConnected = useSelector((state: RootState) => state.session.isConnected);
    const hardwareStatus = useSelector((state: RootState) => state.session.hardwareStatus);

    const isFullyConnected = isConnected && hardwareStatus === HardwareStatus.Connected;

    return {
        isConnected,
        hardwareStatus,
        isFullyConnected,
    };
};
