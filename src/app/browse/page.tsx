import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/lib/actions";
import { unstable_noStore } from "next/cache";
import { RoomCard } from "@/components/room-card";
import SearchBar from "../search-bar";


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
        <Button asChild className="border-[3px] bg-indigo-500 dark:bg-indigo-600 dark:text-white">
          <Link href={'/create-room'} className="py-4">+ Create Room</Link>
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
