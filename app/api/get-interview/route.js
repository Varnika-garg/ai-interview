import { getDb } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req) {
  const db = getDb();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email missing" }, { status: 400 });
  }

  const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.createdBy, email));

  return NextResponse.json(result);
}