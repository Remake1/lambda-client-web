import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { setQuestionStyle } from "@/store/sessionSlice";

interface ControlPanelProps {
    onTakeScreenshot: () => void;
}

export default function ControlPanel({ onTakeScreenshot }: ControlPanelProps) {
    const dispatch = useDispatch();
    const questionStyle = useSelector((state: RootState) => state.session.questionStyle);
    const hardwareStatus = useSelector((state: RootState) => state.session.hardwareStatus);

    if (hardwareStatus !== 'connected') {
        return null;
    }

    return (
        <div className="flex flex-col gap-6 p-6 border rounded-lg bg-card">
            <div className="flex flex-col gap-3">
                <Label>Question Style</Label>
                <RadioGroup
                    value={questionStyle}
                    onValueChange={(value) => dispatch(setQuestionStyle(value as 'leetcode' | 'other'))}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="leetcode" id="leetcode" />
                        <Label htmlFor="leetcode">LeetCode</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                    </div>
                </RadioGroup>
            </div>

            <Button onClick={onTakeScreenshot} size="lg" className="w-full sm:w-auto">
                Take screenshot
            </Button>
        </div>
    );
}
