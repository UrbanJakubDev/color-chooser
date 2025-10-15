import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "../../../../lib/auth";

const prisma = new PrismaClient();

// DELETE /api/combinations/[id] - Smazat kombinaci barev
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

    const combinationId = parseInt(params.id);
    if (isNaN(combinationId)) {
      return NextResponse.json(
        { error: "Invalid combination ID" },
        { status: 400 }
      );
    }

    await prisma.colorCombination.delete({
      where: { id: combinationId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting combination:", error);
    return NextResponse.json(
      { error: "Failed to delete combination" },
      { status: 500 }
    );
  }
}
