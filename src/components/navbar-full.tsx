import {NavLink} from "react-router";

export default function NavbarFull() {
    return (
        <>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/oa">OA Session</NavLink>
            </nav>
        </>
    );
}