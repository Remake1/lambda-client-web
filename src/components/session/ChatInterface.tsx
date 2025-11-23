import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { CodeBlock, CodeBlockItem, CodeBlockContent } from "@/components/ui/shadcn-io/code-block";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export default function ChatInterface() {
    const messages = useSelector((state: RootState) => state.session.messages);

    return (
        <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto mt-8">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={cn(
                        "flex flex-col gap-2 p-4 rounded-lg",
                        msg.type === 'user' ? "bg-primary/10 self-end max-w-[80%]" : "bg-card border self-start w-full"
                    )}
                >
                    <span className="text-xs font-semibold text-muted-foreground uppercase">
                        {msg.type === 'user' ? 'You' : 'AI Assistant'}
                    </span>

                    {msg.type === 'user' ? (
                        <div className="text-sm">
                            Requested {msg.content.type} solution in {msg.content.language}
                        </div>
                    ) : (
                        <div className="w-full overflow-hidden rounded-md text-sm">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }: any) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const language = match ? match[1] : 'text';

                                        if (!inline && match) {
                                            return (
                                                <div className="my-4">
                                                    <CodeBlock
                                                        defaultValue="solution"
                                                        data={[{
                                                            language: language,
                                                            filename: `solution.${language === 'c++' ? 'cpp' : language === 'python' ? 'py' : 'txt'}`,
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
                                {msg.content.payload.ai_result}
                            </ReactMarkdown>
                        </div>
                    )}
                    <span className="text-[10px] text-muted-foreground self-end">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                </div>
            ))}
            {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                    No messages yet. Connect and take a screenshot to start.
                </div>
            )}
        </div>
    );
}
