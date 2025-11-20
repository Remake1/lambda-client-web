import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4">
            <div className="relative mb-8">
                <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full animate-pulse" />
                <Ghost className="relative h-32 w-32 text-primary animate-bounce duration-[3000ms]" />
            </div>

            <h1 className="text-9xl font-bold tracking-tighter bg-gradient-to-b from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                404
            </h1>

            <h2 className="text-3xl font-semibold tracking-tight mb-4 text-foreground">
                Page Not Found
            </h2>

            <p className="text-muted-foreground text-lg max-w-[500px] mb-8">
                Oops! Looks like you've landed in Vermont. The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex gap-4">
                <Button asChild size="lg" className="font-semibold">
                    <Link to="/">
                        Return Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
