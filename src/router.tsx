import { createBrowserRouter } from "react-router";
import Home from "./pages/Home.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";
import Features from "./pages/Features.tsx";
import InterviewLayout from "./layouts/InterviewLayout.tsx";
import OASession from "./pages/OASession.tsx";
import SetupGuide from "@/pages/SetupGuide.tsx";
import Login from "@/pages/Login.tsx";
import Register from "@/pages/Register.tsx";
import Account from "@/pages/Account.tsx";
import AuthGuard from "@/components/auth/AuthGuard.tsx";
import GuestGuard from "@/components/auth/GuestGuard.tsx";

const router = createBrowserRouter([
    {
        Component: BaseLayout,
        children: [
            { index: true, Component: Home },
            { path: "features", Component: Features },
            { path: "setup-guide", Component: SetupGuide },
            { path: "account", element: <AuthGuard><Account /></AuthGuard > },
            {
                path: "auth",
                children: [
                    { path: "login", element: <GuestGuard><Login /></GuestGuard> },
                    { path: "register", element: <GuestGuard><Register /></GuestGuard> },
                ],
            },
        ]
    },
    {
        Component: InterviewLayout,
        children: [
            { path: "oa", Component: OASession },
        ]
    }
]);


export default router;