import { Button } from "@/components/ui/button";
import Link from "next/link";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import { getUserRooms } from "@/lib/actions";
import { UserRoomCard } from "@/components/user-room-card";

export default async function YourRoomsPage() {
    unstable_noStore();
    const rooms = await getUserRooms();
    return (
        <main className="min-h-screen py-16 px-2 md:p-16">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl md:text-4xl">Your Dev Rooms</h1>
                <Button asChild className="border-[3px]  bg-indigo-500 dark:bg-indigo-600 dark:text-white">
                    <Link href="/create-room" className="py-4">+ Create Room</Link>
                </Button>
            </div>

            <div className="grid md:grid-cols-3">
                {rooms.map((room) => {
                    return <UserRoomCard key={room.id} room={room} />;
                })}
            </div>

            {rooms.length === 0 && (
                <div className="flex flex-col gap-4 justify-center items-center mt-24">
                    <Image
                        src="/assets/images/notfound.svg"
                        width="200"
                        height="200"
                        alt="no data image"
                    />

                    <h2 className="text-2xl">You have no rooms</h2>

                    <p className="text-lg text-slate-500 dark:text-slate-300 p-10">It looks like you haven&apos;t created any rooms yet. Click the button below to create your first room.</p>
            
                </div>
            )}
        </main>
    );
}