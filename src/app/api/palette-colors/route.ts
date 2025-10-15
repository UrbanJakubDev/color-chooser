import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/palette-colors - Získat všechny barvy z palety
export async function GET() {
  try {
    const paletteColors = await prisma.paletteColor.findMany({
      orderBy: { createdAt: "asc" },
    });

    // Transformovat data pro frontend
    const transformedPaletteColors = paletteColors.map((color) => ({
      hex: color.hex,
      name: color.name,
    }));

    return NextResponse.json(transformedPaletteColors);
  } catch (error) {
    console.error("Error fetching palette colors:", error);
    return NextResponse.json(
      { error: "Failed to fetch palette colors" },
      { status: 500 }
    );
  }
}
