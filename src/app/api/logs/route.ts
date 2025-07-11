import { NextResponse } from "next/server";
import { getLogs } from "@/lib/db";

export async function GET() {
  try {
    const data = await getLogs();

    return NextResponse.json({
      data,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Failed to process request" },
      { status: 500 }
    );
  }
}
