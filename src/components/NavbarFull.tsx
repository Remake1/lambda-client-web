import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import NavLink from "@/components/NavLink.tsx";
import type { RootState, AppDispatch } from "@/store/store";
import { logout } from "@/store/authSlice";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function NavbarFull() {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
        setIsUserMenuOpen(false);
    };

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-background border-b">
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                {/* Left Side - Logo & Desktop Nav */}
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="font-bold text-lg">λambda</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                                <NavLink to="/setup-guide">Setup Guide</NavLink>
                                <NavLink to="/downloads">Downloads</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/features">Features</NavLink>
                                <NavLink to="/setup-guide">Setup Guide</NavLink>
                            </>
                        )}
                    </nav>
                </div>

                {/* Right Side - Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    {isAuthenticated ? (
                        <Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2 font-medium"
                                >
                                    <UserIcon size={18} />
                                    {user?.username || "Account"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-2" align="end">
                                <div className="px-2 py-1.5 text-sm font-semibold">
                                    {user?.username}
                                </div>
                                <div className="h-px bg-border my-1" />
                                <Link to="/account" onClick={() => setIsUserMenuOpen(false)}>
                                    <Button variant="ghost" size="sm" className="w-full justify-start font-normal">
                                        <UserIcon className="mr-2 h-4 w-4" />
                                        Account
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start font-normal text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <>
                            <Link to="/auth/login">
                                <Button variant="ghost" size="sm">
                                    Sign in
                                </Button>
                            </Link>
                            <Link to="/auth/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background px-4 py-4 shadow-lg">
                    <nav className="flex flex-col gap-2">
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/dashboard" onClick={toggleMenu}>Dashboard</NavLink>
                                <NavLink to="/setup-guide" onClick={toggleMenu}>Setup Guide</NavLink>
                                <NavLink to="/downloads" onClick={toggleMenu}>Downloads</NavLink>
                                <hr className="my-2" />
                                <Link
                                    to="/account"
                                    className="flex h-9 items-center rounded-md px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                    onClick={toggleMenu}
                                >
                                    {user?.username || "Account"}
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => {
                                        handleLogout();
                                        toggleMenu();
                                    }}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                                <NavLink to="/features" onClick={toggleMenu}>Features</NavLink>
                                <NavLink to="/setup-guide" onClick={toggleMenu}>Setup Guide</NavLink>
                                <hr className="my-2" />
                                <Link to="/auth/login" onClick={toggleMenu}>
                                    <Button variant="ghost" size="sm" className="w-full justify-start">
                                        Sign in
                                    </Button>
                                </Link>
                                <Link to="/auth/register" onClick={toggleMenu}>
                                    <Button size="sm" className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}