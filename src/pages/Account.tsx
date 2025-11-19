import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import { logout, fetchUserProfile } from "@/store/authSlice"
import { type AppDispatch, type RootState } from "@/store/store"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export default function Account() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Your account information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading ? (
                        <p>Loading profile...</p>
                    ) : user ? (
                        <div className="space-y-2">
                            <div>
                                <span className="font-semibold">Username:</span> {user.username}
                            </div>
                            <div>
                                <span className="font-semibold">Email:</span> {user.email}
                            </div>
                            {/* UUID is not in the UserInfoResponse based on swagger, but if it was in the token or another endpoint we could show it. 
                                The prompt asked for uuid, email and username. 
                                The swagger /auth/me only returns email and username.
                                I will display what is available. */}
                        </div>
                    ) : (
                        <p>Failed to load profile.</p>
                    )}
                    <Button variant="destructive" className="w-full" onClick={handleLogout}>
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
