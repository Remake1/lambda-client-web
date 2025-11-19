import {NavLink} from "react-router";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";

export default function NavbarFull() {
    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-10 bg-background mx-6">
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
                    {/*Left Side*/}
                    <div className="flex items-center gap-6">
                        {/*Logo*/}
                        <div className="flex items-center">
                            <span className="font-bold text-lg">λambda</span>
                        </div>

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                cn(
                                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                                    isActive
                                        ? "bg-accent text-accent-foreground"
                                        : "text-foreground/80 hover:text-foreground"
                                )
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/features"
                            className={({ isActive }) =>
                                cn(
                                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                                    isActive
                                        ? "bg-accent text-accent-foreground"
                                        : "text-foreground/80 hover:text-foreground"
                                )
                            }
                        >
                            Features
                        </NavLink>

                        <NavLink
                            to="/setup-guide"
                            className={({ isActive }) =>
                                cn(
                                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                                    isActive
                                        ? "bg-accent text-accent-foreground"
                                        : "text-foreground/80 hover:text-foreground"
                                )
                            }
                        >
                            Setup Guide
                        </NavLink>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <NavLink to="/auth/login">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            >
                                Sign in
                            </Button>
                        </NavLink>
                        <NavLink to="/auth/register">
                            <Button
                                size="sm"
                                className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                            >
                                Get Started
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </header>
        </>
    );
}