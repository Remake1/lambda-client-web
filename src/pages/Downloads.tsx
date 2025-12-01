import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle, ItemGroup, ItemSeparator } from "@/components/ui/item";
import { Download, Apple, Grid2x2 } from "lucide-react";

const macOsLink = "https://github.com/Remake1/lambda-client-desktop/releases/download/v1.0.0/Lambda-MacOS.dmg";

export default function Downloads() {
    return (
        <div className="flex-1 flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Downloads</CardTitle>
                    <CardDescription>Download the desktop client for your operating system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ItemGroup>
                        <Item>
                            <ItemContent>
                                <div className="flex items-center gap-4">
                                    <Apple size={24} />
                                    <div>
                                        <ItemTitle>macOS</ItemTitle>
                                        <ItemDescription>
                                            Requires macOS 12.3 or later.
                                        </ItemDescription>
                                    </div>
                                </div>
                            </ItemContent>
                            <ItemActions>
                                <Button asChild>
                                    <a href={macOsLink}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download
                                    </a>
                                </Button>
                            </ItemActions>
                        </Item>
                        <ItemSeparator />
                        <Item>
                            <ItemContent>
                                <div className="flex items-center gap-4">
                                    <Grid2x2 size={24} />
                                    <div>
                                        <ItemTitle>Windows</ItemTitle>
                                        <ItemDescription>
                                            Coming soon.
                                        </ItemDescription>
                                    </div>
                                </div>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="outline" disabled>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Button>
                            </ItemActions>
                        </Item>
                    </ItemGroup>
                </CardContent>
            </Card>
        </div>
    );
}
