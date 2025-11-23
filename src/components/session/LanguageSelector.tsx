import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { setLanguage } from "@/store/sessionSlice";

export default function LanguageSelector() {
    const dispatch = useDispatch();
    const language = useSelector((state: RootState) => state.session.language);

    return (
        <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Language:</label>
            <Select value={language} onValueChange={(value) => dispatch(setLanguage(value))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
