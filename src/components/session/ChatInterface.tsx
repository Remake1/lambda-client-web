import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { CodeBlock, CodeBlockItem, CodeBlockContent } from "@/components/ui/shadcn-io/code-block";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { type AIContent, type UserContent } from "@/store/sessionSlice";

export default function ChatInterface() {
    const messages = useSelector((state: RootState) => state.session.messages);
    const fontSize = useSelector((state: RootState) => state.session.fontSize);

    return (
        <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto mt-8" style={{ fontSize: `${fontSize}px` }}>
            {messages.map((msg, index) => {
                const isUser = msg.type === 'user';
                const userContent = isUser ? (msg.content as UserContent) : null;
                const aiContent = !isUser ? (msg.content as AIContent) : null;

                return (
                    <div
                        key={index}
                        className={cn(
                            "flex flex-col gap-2 p-4 rounded-lg",
                            isUser ? "bg-primary/10 self-end max-w-[80%]" : "bg-card border self-start w-full"
                        )}
                    >
                        <span className="text-xs font-semibold text-muted-foreground uppercase">
                            {isUser ? 'You' : 'AI Assistant'}
                        </span>

                        {isUser && userContent ? (
                            <div>
                                Requested {userContent.type} solution
                                {userContent.type !== 'other' && ` in ${userContent.language}`}
                                {userContent.screenshotCount && userContent.screenshotCount > 0 && (
                                    <span className="text-muted-foreground"> ({userContent.screenshotCount} screenshot{userContent.screenshotCount > 1 ? 's' : ''})</span>
                                )}
                            </div>
                        ) : aiContent ? (
                            <div className="w-full overflow-hidden rounded-md">
                                <ReactMarkdown
                                    components={{
                                        code({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            const language = match ? match[1] : 'text';

                                            if (!inline && match) {
                                                return (
                                                    <div className="my-4">
                                                        <CodeBlock
                                                            defaultValue="solution"
                                                            data={[{
                                                                language: language,
                                                                code: String(children).replace(/\n$/, '')
                                                            }]}
                                                        >
                                                            <CodeBlockItem value="solution" lineNumbers>
                                                                <CodeBlockContent language={language}>
                                                                    {String(children).replace(/\n$/, '')}
                                                                </CodeBlockContent>
                                                            </CodeBlockItem>
                                                        </CodeBlock>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <code className={cn("bg-muted px-1.5 py-0.5 rounded font-mono text-sm", className)} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        }
                                    }}
                                >
                                    {aiContent.payload.ai_result}
                                </ReactMarkdown>
                            </div>
                        ) : null}
                        <span className="text-[10px] text-muted-foreground self-end">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                );
            })}
            {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                    No messages yet. Connect and take a screenshot to start.
                </div>
            )}
        </div>
    );
}
