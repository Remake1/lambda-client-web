import { Button } from "@/components/ui/button"
import LambdaLogo from "@/assets/lambda.svg";
import { Link } from "react-router";

export default function Landing() {
    return (
        <section className="relative w-full min-h-screen ">
            <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16 md:flex-row md:items-center md:gap-16 lg:px-8">

                {/*<div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4"/>*/}

                {/* left side: text */}
                <div className="flex-1 space-y-6">
                    <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
                        <span className="block bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                            Lambda
                        </span>
                        Stealth Online Assessment Helper
                    </h1>

                    <p className="max-w-xl text-balance text-sm text-slate-300 sm:text-base">
                        GUI-less and shortcut-less AI assistant for Online Assessments. Minimises detection by providing input and output via helper device.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Button size="lg" className="gap-2" asChild>
                            <Link to="/auth/register">
                                Get started
                            </Link>
                        </Button>
                        <Link
                            to="/auth/login"
                            className="text-sm font-medium text-slate-300 hover:text-slate-100 underline-offset-4 hover:underline"
                        >
                            Login to Dashboard
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 pt-4 text-xs text-slate-400">
                        <span>Invisible to Zoom, Microsoft Teams, Amazon Chime, Google Meet and others</span>
                    </div>
                </div>

                {/* right side: glowing logo */}
                <div className="flex justify-center items-center relative">
                    {/* Glow behind the logo */}
                    <div className="absolute inset-0 bg-blue-400/40 blur-[100px] rounded-full transform scale-75" />

                    <img src={LambdaLogo} alt="Lambda Logo" className="relative h-48 w-48 md:h-80 md:w-80" />
                </div>
            </div>
        </section>
    )
}
