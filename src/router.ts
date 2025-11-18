import {createBrowserRouter} from "react-router";
import Home from "./pages/Home.tsx";
import BaseLayout from "./layouts/BaseLayout.tsx";
import About from "./pages/About.tsx";
import InterviewLayout from "./layouts/InterviewLayout.tsx";
import OASession from "./pages/OASession.tsx";

const router = createBrowserRouter([
    {
        Component: BaseLayout,
        children: [
            {index: true, Component: Home},
            {path: "about", Component: About},
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