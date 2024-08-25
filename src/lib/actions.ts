'use server'

import { db } from "@/db";
import { Room, room, users } from "@/db/schema";
import { getSession } from "./auth";
import { revalidatePath, unstable_noStore } from "next/cache";
import { eq, SQL, sql } from "drizzle-orm";
import { StreamChat } from "stream-chat";
import { redirect } from "next/navigation";

export async function createRoomAction(roomData: Omit<Room, 'id' | 'userId'>) {
    const session = await getSession();
    if (!session) {
        throw new Error("You must be logged in to create this room.")
    }
    await db.insert(room).values({ ...roomData, userId: session.user.id })
    revalidatePath("/");
}

export async function editRoomAction(roomData: Omit<Room, 'userId'>) {
    const session = await getSession();
    if (!session) {
        throw new Error("You must be logged in to edit this room.")
    }

    await db.update(room).set(roomData).where(eq(room.id, roomData.id)).returning();

    revalidatePath("/your-rooms");
    revalidatePath("/");
    revalidatePath(`/edit-room/${room.id}`);
    redirect("/your-rooms");
}

export async function getRooms(query: string | undefined) {
    // every time a page loads or gets revalidate it will fetch data without storing cache.
    unstable_noStore();
    const session = await getSession();

    if (!session) {
        throw new Error("user not authenticated");
    }

    // execute (where) only if query is defined else make it undefined.
    const where = query ? sql`lower(${room.tags}) like ${`%${query.toLowerCase()}%`}` : undefined
    const rooms = await db.query.room.findMany({
        where,
    })

    return rooms;
}

export async function getRoomInfoById(roomId: string) {
    unstable_noStore();
    const session = await getSession();

    if (!session) {
        throw new Error("user not authenticated");
    }
    const roomInfo = await db.query.room.findFirst(
        {
            where: eq(room.id, roomId),
        }
    );
    return roomInfo;
}

export async function getUserRooms() {
    unstable_noStore();
    const session = await getSession();

    if (!session) {
        throw new Error("user not authenticated");
    }
    const userId = session.user.id;

    const userRoomsInfo = await db.query.room.findMany({
        where: eq(room.userId, session.user.id),
    })

    return userRoomsInfo;
}

export async function deleteAccountAction() {
    const session = await getSession();

    await db.delete(users).where(eq(users.id, session?.user.id as string));
}

export async function deleteRoomAction(roomId: string) {
    const session = await getSession();

    if (!session) {
        throw new Error("You must be logged in to delete this room.")
    }
    await db.delete(room).where(eq(room.id, roomId));
    revalidatePath("/your-rooms");
}

export async function generateTokenForVideo() {
    const session = await getSession();

    if (!session) {
        throw new Error("No session found");
    }

    const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
    const api_secret = process.env.STREAM_SECRET_KEY!;
    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const token = serverClient.createToken(session.user.id);
    return token;
}