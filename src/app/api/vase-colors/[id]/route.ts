import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "../../../../lib/auth";

const prisma = new PrismaClient();

// DELETE /api/vase-colors/[id] - Smazat barvu vázy
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

    const vaseColorId = parseInt(params.id);
    if (isNaN(vaseColorId)) {
      return NextResponse.json(
        { error: "Invalid vase color ID" },
        { status: 400 }
      );
    }

    await prisma.vaseColor.delete({
      where: { id: vaseColorId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vase color:", error);
    return NextResponse.json(
      { error: "Failed to delete vase color" },
      { status: 500 }
    );
  }
}
