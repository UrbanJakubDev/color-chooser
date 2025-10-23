import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const colorCombinationRouter = router({
  // Get all color combinations
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.colorCombination.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // Get public color combinations
  getPublic: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.colorCombination.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Get color combination by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.colorCombination.findUnique({
        where: { id: input.id },
      });
    }),

  // Create new color combination
  create: publicProcedure
    .input(
      z.object({
        tema: z.string(),
        miska: z.string(),
        telo: z.string(),
        hexMiska: z.string(),
        hexTelo: z.string(),
        rgbMiska: z.string(),
        rgbTelo: z.string(),
        userId: z.string().optional(),
        isPublic: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.colorCombination.create({
        data: input,
      });
    }),

  // Update color combination
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        tema: z.string().optional(),
        miska: z.string().optional(),
        telo: z.string().optional(),
        hexMiska: z.string().optional(),
        hexTelo: z.string().optional(),
        rgbMiska: z.string().optional(),
        rgbTelo: z.string().optional(),
        isPublic: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.colorCombination.update({
        where: { id },
        data,
      });
    }),

  // Delete color combination
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.colorCombination.delete({
        where: { id: input.id },
      });
    }),
});
