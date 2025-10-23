import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const potColorRouter = router({
  // Get all pot colors
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.potColor.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // Get active pot colors only
  getActive: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.potColor.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Get pot color by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.potColor.findUnique({
        where: { id: input.id },
      });
    }),

  // Create new pot color
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
      return ctx.prisma.potColor.create({
        data: input,
      });
    }),

  // Update pot color
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
      return ctx.prisma.potColor.update({
        where: { id },
        data,
      });
    }),

  // Delete pot color
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.potColor.delete({
        where: { id: input.id },
      });
    }),
});
