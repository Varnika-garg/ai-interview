import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
export const runtime = "nodejs";
export async function POST(req) {
  const body = await req.json();

  const mockId = uuidv4();

  try {
    const resp = await db.insert(MockInterview)
      .values({
        mockId,
        jobPosition: body.jobPosition,
        jobDesc: body.jobDesc,
        jobExperience: body.jobExperience,
        jsonMockResp: JSON.stringify(body.jsonMockResp),
        createdBy: body.createdBy,
        createdAt: moment().format("DD-MM-YYYY"),
      })
      .returning({ mockId: MockInterview.mockId });

    return Response.json({ mockId: resp[0].mockId });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "DB Error" });
  }
}