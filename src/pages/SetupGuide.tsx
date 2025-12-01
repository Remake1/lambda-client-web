import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const setupGuideContent = `
### Step 1: Connect the Desktop App
1. Open the desktop app on the computer you will be using for the interview.
2. Go to [Dashboard](/dashboard) and copy your unique ID (UUID).
3. Paste the UUID into the desktop app to connect.
4. Keep the app running in the background after you've successfully connected. You can hide/unhide the app by pressing \`Cmd+Shift+H\`.

### Step 2: Set Up the Web Client
1. On a helper device (phone, tablet, or another computer), open the web client.
2. Log in and start a new interview from your [Dashboard](/dashboard).
3. Connect to the server when prompted.

### Step 3: Finalize Your Setup
1. Check for a green dot in the sidebar. If it's visible, your setup is complete.
2. You can now configure the programming language in **Settings**.
3. If needed, you can switch from "LeetCode" mode to a general question mode in the sidebar.
`;

const SetupGuide: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Setup Guide</CardTitle>
          <CardDescription>Follow these steps to get your interview session started.</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactMarkdown
            components={{
              a: ({ href, ...props }) => {
                if (href && href.startsWith('/')) {
                  return <Link className="text-primary underline hover:text-primary/80" to={href} {...props} />;
                }
                return <a className="text-primary underline hover:text-primary/80" href={href} {...props} />;
              },
              h3: ({ node: _, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-4 first:mt-0" {...props} />,
              ol: ({ node: _, ...props }) => <ol className="list-decimal list-outside pl-5 space-y-3" {...props} />,
              strong: ({ node: _, ...props }) => <strong className="font-semibold" {...props} />,
            }}
          >
            {setupGuideContent}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupGuide;
