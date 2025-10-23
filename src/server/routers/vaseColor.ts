import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const vaseColorRouter = router({
  // Get all vase colors
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.vaseColor.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // Get active vase colors only
  getActive: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.vaseColor.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Get vase color by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.vaseColor.findUnique({
        where: { id: input.id },
      });
    }),

  // Create new vase color
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        hex: z.string(),
        rgb: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.vaseColor.create({
        data: input,
      });
    }),

  // Update vase color
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        hex: z.string().optional(),
        rgb: z.string().optional(),
        description: z.string().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.vaseColor.update({
        where: { id },
        data,
      });
    }),

  // Delete vase color
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.vaseColor.delete({
        where: { id: input.id },
      });
    }),
});
