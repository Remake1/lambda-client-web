import { createBrowserRouter } from "react-router";
import Home from "./pages/Home.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";
import SessionLayout from "./layouts/SessionLayout.tsx";
import Session from "./pages/Session.tsx";
import Login from "@/pages/Login.tsx";
import Register from "@/pages/Register.tsx";
import Account from "@/pages/Account.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import AuthGuard from "@/components/guards/AuthGuard.tsx";
import GuestGuard from "@/components/guards/GuestGuard.tsx";
import NotFound from "@/pages/NotFound.tsx";

const router = createBrowserRouter([
    {
        Component: BaseLayout,
        children: [
            { index: true, Component: Home },
            // { path: "features", Component: Features },
            // { path: "setup-guide", Component: SetupGuide },
            { path: "account", element: <AuthGuard><Account /></AuthGuard > },
            { path: "dashboard", element: <AuthGuard><Dashboard /></AuthGuard> },
            {
                path: "auth",
                children: [
                    { path: "login", element: <GuestGuard><Login /></GuestGuard> },
                    { path: "register", element: <GuestGuard><Register /></GuestGuard> },
                ],
            },
            { path: "*", Component: NotFound },
        ]
    },
    {
        Component: SessionLayout,
        children: [
            { path: "session", Component: Session },
        ]
    }
]);


export default router;