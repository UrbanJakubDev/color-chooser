import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "../../../lib/auth";

const prisma = new PrismaClient();

// GET /api/vase-colors - Získat všechny barvy váží
export async function GET() {
  try {
    const vaseColors = await prisma.vaseColor.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    // Transformovat data pro frontend
    const transformedVaseColors = vaseColors.map((color) => ({
      id: color.id.toString(),
      name: color.name,
      hex: color.hex,
      rgb: JSON.parse(color.rgb),
      description: color.description || "",
    }));

    return NextResponse.json(transformedVaseColors);
  } catch (error) {
    console.error("Error fetching vase colors:", error);
    return NextResponse.json(
      { error: "Failed to fetch vase colors" },
      { status: 500 }
    );
  }
}

// POST /api/vase-colors - Vytvořit novou barvu vázy
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
    const { name, hex, rgb, description } = body;

    const vaseColor = await prisma.vaseColor.create({
      data: {
        name,
        hex,
        rgb: JSON.stringify(rgb),
        description,
        isActive: true,
      },
    });

    return NextResponse.json({
      id: vaseColor.id.toString(),
      name: vaseColor.name,
      hex: vaseColor.hex,
      rgb: JSON.parse(vaseColor.rgb),
      description: vaseColor.description || "",
    });
  } catch (error) {
    console.error("Error creating vase color:", error);
    return NextResponse.json(
      { error: "Failed to create vase color" },
      { status: 500 }
    );
  }
}
