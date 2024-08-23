import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { room, Room } from "@/db/schema";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GithubIcon } from "lucide-react";
import { getRoomInfoById, getRooms } from "@/lib/actions";
import { TagsList } from "@/components/taglist";
import { splitTags } from "@/lib/utils";
import SearchBar from "./search-bar";
import { unstable_noStore } from "next/cache";

async function RoomCard({ room }: { room: Room }) {
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
export default async function Home({
  searchParams
}: {
  searchParams?: {
    query?: string,
  }
}) {
  unstable_noStore();
  const items = await getRooms(searchParams?.query);
  
  return (
    <main className="min-h-screen py-16 px-2 md:p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-4xl">Find Dev Room</h1>
        <Button asChild className="border-[3px] border-green-500">
          <Link href={'/create-room'}>create room</Link>
        </Button>
      </div>

      {/* search bar */}
      <SearchBar />

      {/* list of dev rooms */}
      <div className="grid md:grid-cols-3">
        {
          items.map((item) => {
            return <RoomCard key={item.id} room={item} />
          })
        }
      </div>
    </main>
  );
}
