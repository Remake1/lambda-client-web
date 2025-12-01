import { Button } from "@/components/ui/button"
import LambdaLogo from "@/assets/lambda.svg";
import { Link } from "react-router";
import HrLogo from "@/assets/hr-logo.png";
import HirevueLogo from "@/assets/hirevue-logo.png";
import CodilityLogo from "@/assets/codility-logo.png";
import CodesignalLogo from "@/assets/codesignal-logo.png";

export default function Landing() {
    return (
        <section className="relative w-full flex-1 flex flex-col">
            <div className="relative mx-auto flex flex-1 w-full max-w-6xl flex-col items-center justify-center px-6 md:flex-row md:gap-16 lg:px-8">

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
                        Stealth, window-less and shortcut-less online assessment and interview helper. Solves leetcode and MCQ style question with AI. Provides remote control from helper device.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Button size="lg" className="gap-2" asChild>
                            <Link to="/auth/register">
                                Get started
                            </Link>
                        </Button>
                        <Link
                            to="/auth/login"
                            className="cursor-pointer text-sm font-medium text-slate-300 hover:text-slate-100 underline-offset-4 hover:underline"
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

            {/* Logos Section */}
            <div className="py-12">
                <div className="container mx-auto px-4 md:px-8">
                    <p className="text-center text-sm font-semibold text-slate-400 mb-6">
                        Supports major platforms
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12">
                        <img src={HrLogo} alt="HackerRank Logo" className="h-9 object-contain" />
                        <img src={HirevueLogo} alt="HireVue Logo" className="h-7 object-contain" />
                        <img src={CodilityLogo} alt="Codility Logo" className="h-7 object-contain" />
                        <img src={CodesignalLogo} alt="CodeSignal Logo" className="h-7 object-contain" />
                    </div>
                </div>
            </div>
        </section>
    )
}
