import { type NextRequest, NextResponse } from "next/server";
import { listings } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rentedCarDetails =
      listings.find((listing) => listing.id === Number.parseInt(id)) || null;
    if (!rentedCarDetails) {
      return NextResponse.json(
        { status: false, message: "Id not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(rentedCarDetails);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

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
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to update listing" },
      { status: 500 }
    );
  }
}
