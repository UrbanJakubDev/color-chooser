import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "../../../../lib/auth";

const prisma = new PrismaClient();

// DELETE /api/palette-colors/[id] - Smazat barvu z palety
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    const authResult = await requireAdmin(request);
    if ("error" in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const colorId = parseInt(params.id);
    if (isNaN(colorId)) {
      return NextResponse.json({ error: "Invalid color ID" }, { status: 400 });
    }

    await prisma.paletteColor.delete({
      where: { id: colorId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting palette color:", error);
    return NextResponse.json(
      { error: "Failed to delete palette color" },
      { status: 500 }
    );
  }
}
