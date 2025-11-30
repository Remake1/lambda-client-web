import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { setModel } from "@/store/sessionSlice";
import { AI_MODELS } from "@/lib/constants";

export default function ModelSelector() {
    const dispatch = useDispatch();
    const model = useSelector((state: RootState) => state.session.model);

    return (
        <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Model:</label>
            <Select value={model} onValueChange={(value) => dispatch(setModel(value))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={AI_MODELS.GEMINI_2_5_PRO}>Gemini 2.5 Pro</SelectItem>
                    <SelectItem value={AI_MODELS.GEMINI_2_5_FLASH}>Gemini 2.5 Flash</SelectItem>
                    <SelectItem value={AI_MODELS.GEMINI_2_5_FLASH_LITE}>Gemini 2.5 Flash-Lite</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
