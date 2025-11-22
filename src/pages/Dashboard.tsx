import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle, ItemGroup, ItemSeparator } from "@/components/ui/item";
import { CopyableInput } from "@/components/CopyableInput";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchUserProfile } from "@/store/authSlice";
import { Download, Play } from "lucide-react";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    return (
        <div className="flex-1 flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                    <CardDescription>Manage your account and activities.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ItemGroup>
                            <Item>
                                <ItemContent>
                                    <ItemTitle>User ID</ItemTitle>
                                    <ItemDescription>
                                        Your unique identifier.
                                    </ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    {user?.id && <CopyableInput label="UUID" value={user.id} className="w-[300px]" />}
                                </ItemActions>
                            </Item>
                            <ItemSeparator />
                            <Item>
                                <ItemContent>
                                    <ItemTitle>Downloads</ItemTitle>
                                    <ItemDescription>
                                        Download client for your desktop.
                                    </ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <Button variant="outline">
                                        <Download className="mr-2 h-4 w-4" />
                                        Downloads
                                    </Button>
                                </ItemActions>
                            </Item>
                            <ItemSeparator />
                            <Item>
                                <ItemContent>
                                    <ItemTitle>Interview</ItemTitle>
                                    <ItemDescription>
                                        Start Online Assessment or Interview.
                                    </ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <Button>
                                        <Play className="mr-2 h-4 w-4" />
                                        Start OA/Interview
                                    </Button>
                                </ItemActions>
                            </Item>
                        </ItemGroup>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
