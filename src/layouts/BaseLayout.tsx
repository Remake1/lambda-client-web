import {Outlet} from "react-router";
import NavbarFull from "../components/NavbarFull.tsx";

export default function BaseLayout() {
    return (
        <>
            <NavbarFull />
            <Outlet />
        </>
    );
}