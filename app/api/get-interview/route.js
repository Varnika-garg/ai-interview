import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    console.log("EMAIL:", email);

    if (!email) {
      return Response.json({ error: "Email missing" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, email));

    return Response.json(result);

  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}