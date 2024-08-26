import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        console.log(":: MIDDLEWARE CALLED :: ")
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                if (!token) {
                    console.error("Token is missing in middleware.");
                } else {
                    console.log("token present in middleware :: ");
                }
                // This callback returns true if the user is authenticated.
                return !!token;
            },
        },
    });

export const config = {
    matcher: ["/your-rooms", "/browse", "/edit-room"],
};