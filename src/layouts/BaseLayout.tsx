import { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import NavbarFull from "../components/NavbarFull.tsx";
import { fetchUserProfile } from "@/store/authSlice";
import type { AppDispatch, RootState } from "@/store/store";

export default function BaseLayout() {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isAuthenticated && !user) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, isAuthenticated, user]);

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarFull />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}