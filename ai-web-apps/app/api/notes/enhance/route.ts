import axios from "axios";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const content = body.content;
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{
        "role": "system",
        "content": `Read the user's note provided below and enhance it by improving the clarity, coherence, 
        and overall quality of the content. Make sure to: 
        - Correct any grammatical errors.
        - Enhance the vocabulary and phrasing to make it more engaging.
        - Ensure that the enhanced note maintains the original meaning and intent.
        - Structure the information logically and clearly. 
        Do not respond directly to the content of the note, only focus on enhancing it. 
        Use the same tone as the original note and keep the result to 250 characters or less. 
        If unable to enhance, do not reply with anything.`
      },
      { role: "system", content: "If a Question is asked enhance the question do not answer it or ask for clarifying information." },
      { role: "user", content: content }],
    })
    return NextResponse.json(completion.choices[0].message.content);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "400", message: "Error" });
  }


}