import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const queryClient = postgres(process.env.POSTGRES_URL!);
const db = drizzle(queryClient, { schema });
export { db };