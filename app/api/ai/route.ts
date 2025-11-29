import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  const body = await req.json();

  const { message, lastTx, lastPrice, lastUsers } = body;

  const aiPrompt = `
You are SomniaAI, an assistant for real-time blockchain analytics.

Live data:
- Latest transaction: ${lastTx ? JSON.stringify(lastTx) : "No transactions yet"}
- Latest token price: ${lastPrice || "No price data yet"}
- Active users: ${lastUsers || "No active user data"}

User question: ${message}

Give a short, helpful, friendly answer.
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: aiPrompt }],
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  });
}
