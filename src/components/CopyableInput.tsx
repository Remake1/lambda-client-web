import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface CopyableInputProps {
    label: string;
    value: string;
    className?: string;
}

export function CopyableInput({ label, value, className }: CopyableInputProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (value) {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(value).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                });
            } else {
                // Fallback for insecure contexts
                const textArea = document.createElement("textarea");
                textArea.value = value;
                textArea.style.position = "absolute";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }
                document.body.removeChild(textArea);
            }
        }
    };

    return (
        <div className={`space-y-2 ${className || ''}`}>
            <Label htmlFor={`copyable-${label}`}>{label}</Label>
            <div className="flex gap-2">
                <Input
                    id={`copyable-${label}`}
                    value={value}
                    readOnly
                    className="font-mono text-sm bg-muted"
                />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    title={`Copy ${label}`}
                >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    );
}
