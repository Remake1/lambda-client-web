import type { Message, UserContent, AIContent } from "@/store/sessionSlice";

export const exportToMarkdown = (messages: Message[]) => {
    let markdown = "# Conversation History\n\n";

    messages.forEach((msg) => {
        const timestamp = new Date(msg.timestamp).toLocaleString();

        if (msg.type === 'user') {
            const content = msg.content as UserContent;
            markdown += `## User (${timestamp})\n\n`;
            markdown += `Requested analysis for **${content.type}** in **${content.language}**\n\n`;
        } else if (msg.type === 'ai') {
            const content = msg.content as AIContent;
            markdown += `## AI (${timestamp})\n\n`;
            if (content.payload.message) {
                markdown += `${content.payload.message}\n\n`;
            }
            if (content.payload.ai_result) {
                markdown += `${content.payload.ai_result}\n\n`;
            }
        }

        markdown += "---\n\n";
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${new Date().toISOString()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
