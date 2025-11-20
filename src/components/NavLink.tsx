import { NavLink as RouterNavLink, type NavLinkProps as RouterNavLinkProps } from "react-router";
import { cn } from "@/lib/utils";

interface NavLinkProps extends RouterNavLinkProps {
    children: React.ReactNode;
    className?: string | ((props: { isActive: boolean; isPending: boolean; isTransitioning: boolean }) => string | undefined);
}

export default function NavLink({ to, children, className, ...props }: NavLinkProps) {
    return (
        <RouterNavLink
            to={to}
            className={({ isActive, isPending, isTransitioning }) =>
                cn(
                    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                    isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/80 hover:text-foreground",
                    typeof className === "function"
                        ? className({ isActive, isPending, isTransitioning })
                        : className
                )
            }
            {...props}
        >
            {children}
        </RouterNavLink>
    );
}
