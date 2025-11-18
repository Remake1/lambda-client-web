import {Outlet} from "react-router";
import NavbarFull from "../components/NavbarFull";

export default function BaseLayout() {
    return (
        <>
            <NavbarFull />
            <Outlet />
        </>
    );
}