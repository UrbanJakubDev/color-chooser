import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "../../../lib/auth";

const prisma = new PrismaClient();

// GET /api/combinations - Získat všechny kombinace barev
export async function GET() {
  try {
    const combinations = await prisma.colorCombination.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
    });

    // Transformovat data pro frontend
    const transformedCombinations = combinations.map((combo) => ({
      id: combo.id.toString(),
      tema: combo.tema,
      miska: combo.miska,
      telo: combo.telo,
      hexMiska: combo.hexMiska,
      hexTelo: combo.hexTelo,
      rgbMiska: JSON.parse(combo.rgbMiska),
      rgbTelo: JSON.parse(combo.rgbTelo),
    }));

    return NextResponse.json(transformedCombinations);
  } catch (error) {
    console.error("Error fetching combinations:", error);
    return NextResponse.json(
      { error: "Failed to fetch combinations" },
      { status: 500 }
    );
  }
}

// POST /api/combinations - Vytvořit novou kombinaci
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
    const { tema, miska, telo, hexMiska, hexTelo, rgbMiska, rgbTelo } = body;

    const combination = await prisma.colorCombination.create({
      data: {
        tema,
        miska,
        telo,
        hexMiska,
        hexTelo,
        rgbMiska: JSON.stringify(rgbMiska),
        rgbTelo: JSON.stringify(rgbTelo),
        isPublic: true,
      },
    });

    return NextResponse.json({
      id: combination.id.toString(),
      tema: combination.tema,
      miska: combination.miska,
      telo: combination.telo,
      hexMiska: combination.hexMiska,
      hexTelo: combination.hexTelo,
      rgbMiska: JSON.parse(combination.rgbMiska),
      rgbTelo: JSON.parse(combination.rgbTelo),
    });
  } catch (error) {
    console.error("Error creating combination:", error);
    return NextResponse.json(
      { error: "Failed to create combination" },
      { status: 500 }
    );
  }
}
