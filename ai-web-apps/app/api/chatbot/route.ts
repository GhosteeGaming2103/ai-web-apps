import axios from "axios";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI();

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const messages = body.messages;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    max_tokens: 50,

  })
  return NextResponse.json(completion.choices[0].message.content);
}