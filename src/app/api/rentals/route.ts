import { NextResponse } from "next/server";
import { getData } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { page, limit, status } = await request.json();
    const parsedPage = parseInt(page || "1", 10);
    const parsedLimit = parseInt(limit || "10", 10);

    if (status && !["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { status: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const { data, totalCount, totalPages } = await getData(
      parsedPage,
      parsedLimit,
      status || null
    );

    return NextResponse.json({
      data,
      totalCount,
      totalPages,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to process request" },
      { status: 500 }
    );
  }
}
