import { Message } from "@/store/sessionSlice";

export const exportToMarkdown = (messages: Message[]) => {
    let markdown = "# Conversation History\n\n";

    messages.forEach((msg) => {
        const role = msg.type === 'user' ? 'User' : 'AI';
        const timestamp = new Date(msg.timestamp).toLocaleString();

        markdown += `## ${role} (${timestamp})\n\n`;

        if (msg.type === 'user') {
            // User content is currently just text/code in the payload (based on sessionSlice types)
            // But looking at sessionSlice, UserContent has type and language, but where is the text?
            // Let's re-check sessionSlice.ts. 
            // Wait, I saw UserContent: { type: QuestionStyle; language: string; }
            // It seems I might have missed where the actual user text is stored.
            // Let me double check sessionSlice.ts content from previous turn.
            // Ah, I see:
            // export interface AIContent { type: 'image_analysis_result'; payload: { ai_result: string; message?: string; }; }
            // export interface UserContent { type: QuestionStyle; language: string; }
            // This looks incomplete for UserContent. Where is the user's text?
            // Let me check how messages are added.
            // I'll assume for now I need to check how messages are structured in the app.
            // But based on the slice definition I saw:
            // export type SessionMessageContent = AIContent | UserContent;
            // It seems UserContent might be missing the actual text or I misread it.
            // Let me re-read sessionSlice.ts carefully.
            // I will pause writing this file and check sessionSlice.ts again.
        }
    });
};
