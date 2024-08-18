import { ModeToggle } from "@/components/mode-toggle";
import { db } from "@/db";
import Image from "next/image";

export default async function Home() {

  const items = await db.query.testing.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {
      items.map((item) => {
        return <p key={item.id}>{item.name}</p>
      })
    }  
    </main>
  );
}
