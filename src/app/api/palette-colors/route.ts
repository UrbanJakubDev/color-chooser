import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "../../../lib/auth";

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

// POST /api/palette-colors - Vytvořit novou barvu palety
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const authResult = await requireAdmin(request);
    if ("error" in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { name, hex } = body;

    const paletteColor = await prisma.paletteColor.create({
      data: {
        name,
        hex,
      },
    });

    return NextResponse.json({
      hex: paletteColor.hex,
      name: paletteColor.name,
    });
  } catch (error) {
    console.error("Error creating palette color:", error);
    return NextResponse.json(
      { error: "Failed to create palette color" },
      { status: 500 }
    );
  }
}
