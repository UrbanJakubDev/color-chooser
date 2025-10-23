import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const paletteColorRouter = router({
  // Get all palette colors
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.paletteColor.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // Get palette color by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.paletteColor.findUnique({
        where: { id: input.id },
      });
    }),

  // Create new palette color
  create: publicProcedure
    .input(
      z.object({
        hex: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.paletteColor.create({
        data: input,
      });
    }),

  // Update palette color
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        hex: z.string().optional(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.paletteColor.update({
        where: { id },
        data,
      });
    }),

  // Delete palette color
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.paletteColor.delete({
        where: { id: input.id },
      });
    }),
});
