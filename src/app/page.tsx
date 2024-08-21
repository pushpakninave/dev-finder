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
import { getRooms } from "@/lib/actions";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="m-5">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {
          room.githubRepo && <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        }
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
export default async function Home() {

  const items = await getRooms();
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Room</h1>
        <Button asChild>
          <Link href={'/create-room'}>create room</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3">
        {
          items.map((item) => {
            return <RoomCard key={item.id} room={item} />
          })
        }
      </div>
    </main>
  );
}
