import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { logout, fetchUserProfile } from "@/store/authSlice"
import { type AppDispatch, type RootState } from "@/store/store"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { CopyableInput } from "@/components/CopyableInput"

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
        <div className="flex items-center justify-center h-full bg-background py-30">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Your account information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {loading ? (
                        <p>Loading profile...</p>
                    ) : user ? (
                        <div className="space-y-4">
                            {user.id && (
                                <CopyableInput label="User ID" value={user.id} />
                            )}
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <div className="font-medium">{user.username}</div>
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <div className="font-medium">{user.email}</div>
                            </div>
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
