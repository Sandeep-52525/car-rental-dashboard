import { type NextRequest, NextResponse } from "next/server";
import { adminActions, listings } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status, adminName } = await request.json();

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { status: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const listingIndex = listings.findIndex(
      (l) => l.id === Number.parseInt(id)
    );
    if (listingIndex === -1)
      return NextResponse.json(
        { status: false, message: "Id not found" },
        { status: 404 }
      );

    listings[listingIndex] = {
      ...listings[listingIndex],
      status,
      reviewedBy: adminName,
      reviewedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // logging admins actions
    adminActions.push({
      id: adminActions.length + 1,
      name: adminName,
      action: status,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      status: true,
      message: "Status Updated Successfully",
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to review listing" },
      { status: 500 }
    );
  }
}
