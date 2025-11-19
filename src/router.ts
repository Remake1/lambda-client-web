import {createBrowserRouter} from "react-router";
import Home from "./pages/Home.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";
import Features from "./pages/Features.tsx";
import InterviewLayout from "./layouts/InterviewLayout.tsx";
import OASession from "./pages/OASession.tsx";
import SetupGuide from "@/pages/SetupGuide.tsx";
import Login from "@/pages/Auth/Login.tsx";
import Register from "@/pages/Auth/Register.tsx";

const router = createBrowserRouter([
    {
        Component: BaseLayout,
        children: [
            {index: true, Component: Home},
            {path: "features", Component: Features},
            {path: "setup-guide", Component: SetupGuide},
            {
                path: "auth",
                children: [
                    { path: "login", Component: Login },
                    { path: "register", Component: Register },
                ],
            },
        ]
    },
    {
        Component: InterviewLayout,
        children: [
            {path: "oa", Component: OASession},
        ]
    }
]);


export default router;