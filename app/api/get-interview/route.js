import { getDb } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    console.log("EMAIL:", email);

    if (!email) {
      return NextResponse.json(
        { error: "Email missing" },
        { status: 400 }
      );
    }

    const db = getDb();

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, email));

    return NextResponse.json(result);

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}