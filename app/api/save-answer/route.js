import { db } from "../../../utils/db";
import { UserAnswer } from "../../../utils/schema";
import { NextResponse } from "next/server";
import moment from "moment";
export const runtime = "nodejs";
export async function POST(req) {
  try {
    const body = await req.json();

    const resp = await db.insert(UserAnswer).values({
      mockId: body.mockId,
      question: body.question,
      correctAns: body.correctAns,
      userAnswer: body.userAnswer,
      feedback: body.feedback,
      rating: body.rating,
      userEmail: body.userEmail,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    return NextResponse.json({ success: true, data: resp });

  } catch (error) {
    console.error("DB ERROR:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}