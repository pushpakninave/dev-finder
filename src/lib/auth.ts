import { db } from "@/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { AuthOptions, DefaultSession, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// overriding default session by adding user's id.
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}


export const authConfig = {
    adapter: DrizzleAdapter(db) as Adapter,
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            const dbUser = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, token.email!),
            });

            if (!dbUser) {
                throw new Error("no user with email found");
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
        async session({ token, session }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                };
            }

            return session;
        },
    },
    secret: process.env.JWT_SECRET
} satisfies AuthOptions;

export function getSession() {
    return getServerSession(authConfig);
}