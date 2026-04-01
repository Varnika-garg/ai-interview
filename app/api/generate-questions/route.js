import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {

    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt) {
      return Response.json({ error: "Prompt missing" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return Response.json({ data: text });

  } catch (error) {
    console.error("Gemini Error:", error);
    return Response.json({ error: "Something went wrong" });
  }
}