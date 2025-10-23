import { initTRPC } from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";
import { prisma } from "@/lib/prisma";

// Context type
export interface Context {
  prisma: typeof prisma;
}

// Create tRPC instance with context
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Create context
export const createContext = (): Context => ({
  prisma,
});

// Export tRPC instance
export { t };
