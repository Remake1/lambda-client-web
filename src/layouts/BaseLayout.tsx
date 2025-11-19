import {Outlet} from "react-router";
import NavbarFull from "../components/navbar-full.tsx";

export default function BaseLayout() {
    return (
        <>
            <NavbarFull />
            <Outlet />
        </>
    );
}