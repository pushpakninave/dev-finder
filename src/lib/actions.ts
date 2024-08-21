'use server'

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "./auth";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, 'id' | 'userId'>) {
    const session = await getSession();
    if (!session) {
        throw new Error("You must be logged in to create this room.")
    }
    await db.insert(room).values({ ...roomData, userId: session.user.id })
    revalidatePath("/");
}

export async function getRooms(){
    // every time a page loads or gets revalidate it will fetch data without storing cache.
    unstable_noStore();
    return db.query.room.findMany();
}

export async function deleteAccountAction() { }