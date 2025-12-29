// ⚠️ MANUAL ONLY
// This route must be triggered intentionally from Admin UI.
// No cron, no background jobs, no auto-run in production.

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

// 🛠 Helper: extract JSON safely from AI response
function extractJSON(text: string) {
  const firstBrace = text.indexOf('{')
  const lastBrace = text.lastIndexOf('}')
  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error('No JSON object found')
  }
  return JSON.parse(text.slice(firstBrace, lastBrace + 1))
}

export async function POST() {
  try {
    // ✅ CREATE CLIENTS **INSIDE** HANDLER (VERY IMPORTANT)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    })

    // 🧠 AI Prompt
    const prompt = `
Suggest ONE new weekend spot in Bangalore for IT professionals.

Respond strictly in JSON with these fields:
{
  "name": "",
  "hub": "",
  "category": "",
  "description": ""
}
`

    // 🤖 Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const rawText = completion.choices[0]?.message?.content
    if (!rawText) {
      throw new Error('Empty AI response')
    }

    const data = extractJSON(rawText)

    // 🗄 Insert into Supabase (draft mode)
    const { error } = await supabase.from('weekend_spots').insert({
      name: data.name,
      hub: data.hub,
      category: data.category,
      description: data.description,
      status: 'draft',
      source: 'ai',
    })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('AI Suggest Error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal error' },
      { status: 500 }
    )
  }
}
