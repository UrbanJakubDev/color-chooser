import { router } from "./trpc";
import { potColorRouter } from "./routers/potColor";
import { vaseColorRouter } from "./routers/vaseColor";
import { colorCombinationRouter } from "./routers/colorCombination";
import { paletteColorRouter } from "./routers/paletteColor";

export const appRouter = router({
  potColor: potColorRouter,
  vaseColor: vaseColorRouter,
  colorCombination: colorCombinationRouter,
  paletteColor: paletteColorRouter,
});

export type AppRouter = typeof appRouter;
