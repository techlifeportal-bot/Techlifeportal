import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { type } = await req.json();

    if (!type) {
      return NextResponse.json(
        { error: "Missing suggestion type" },
        { status: 400 }
      );
    }

    const promptMap: Record<string, string> = {
      weekend_spots:
        "Suggest 3 Bangalore weekend spots for IT professionals.",
      cafes:
        "Suggest 3 cafes in Bangalore popular among IT professionals.",
      gyms:
        "Suggest 3 gyms in Bangalore near IT hubs.",
      companies:
        "Suggest 3 IT companies in Bangalore.",
      jobs:
        "Suggest 3 IT job roles currently popular in Bangalore.",
    };

    const prompt = promptMap[type];
    if (!prompt) {
      return NextResponse.json(
        { error: "Invalid suggestion type" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Return STRICT JSON array. Each item must have name, description, location.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("Empty AI response");

    const items = JSON.parse(content);

    for (const item of items) {
      await supabase.from("ai_suggested_spots").insert({
        name: item.name,
        description: item.description,
        location: item.location,
        category: type,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("AI suggest error:", error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
