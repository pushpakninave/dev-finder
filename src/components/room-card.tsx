import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema";
import { getRoomInfoById } from "@/lib/actions";
import { TagsList } from "@/components/taglist";
import { splitTags } from "@/lib/utils";
import { GithubIcon} from "lucide-react";

export async function RoomCard({ room }: { room: Room }) {
    const roomInfoById = await getRoomInfoById(room.id);

    if (!roomInfoById) {
        return <div>No room of this ID found</div>;
    }

    const relatedTags = splitTags(roomInfoById.tags);

    return (
        <Card className="m-5">
            <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {
                    room.githubRepo && <Link
                        href={room.githubRepo}
                        className="flex items-center gap-2 hover:text-[#db4a2b]"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GithubIcon />
                        Github Project
                    </Link>
                }
                <TagsList tags={relatedTags} />
            </CardContent>


            <CardFooter>
                <Button asChild>
                    <Link href={`/rooms/${room.id}`}>
                        Join Room
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );

}

