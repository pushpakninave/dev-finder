'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle";


function GlobalTabs() {
    const pathName = usePathname();
    const defaultTab = pathName === "/your-rooms" ? "yourRooms" : "allRooms";

    const isHomeTab = pathName === "/"

    return (

        <div className="container mx-auto flex justify-center items-center">
            <div className={cn("", { "hidden": isHomeTab })}>
                <Tabs value={defaultTab} className="mt-5">
                    <TabsList className="bg-[#e4e2dd]">
                        <Link href="/browse"><TabsTrigger value="allRooms">All Rooms</TabsTrigger></Link>
                        <Link href="/your-rooms"><TabsTrigger value="yourRooms">Your Rooms</TabsTrigger></Link>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex justify-end w-full md:hidden mt-5">
                <div className="p-2 rounded-sm backdrop-blur-saturate bg-[rgba(123,130,145,0.75)] border border-[rgba(255,255,255,0.125)]">
                    <ModeToggle />
                </div>
            </div>
            {/* <div>

            </div> */}

        </div>
    )
}

export default GlobalTabs