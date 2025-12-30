'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Draft = {
  id: string
  name: string
  description: string
  hub: string
  category: string
}

export default function AdminPage() {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [approvingId, setApprovingId] = useState<string | null>(null)

  // 📥 Load AI drafts
  useEffect(() => {
    loadDrafts()
  }, [])

  async function loadDrafts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('ai_suggested_spots')
      .select('id, name, description, hub, category')
      .order('created_at', { ascending: false })

    if (!error) {
      setDrafts(data || [])
    }

    setLoading(false)
  }

  // 🤖 Manual AI trigger
  async function generateAI() {
    setGenerating(true)
    setMessage(null)

    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'AI generation failed')
      }

      setMessage('AI suggestions generated successfully')
      await loadDrafts()
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setGenerating(false)
    }
  }

  // ✏️ Edit draft locally
  function updateDraft(
    id: string,
    field: keyof Draft,
    value: string
  ) {
    setDrafts((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, [field]: value } : d
      )
    )
  }

  // ✅ Approve draft
  async function approveDraft(draft: Draft) {
    setApprovingId(draft.id)

    const { error } = await supabase
      .from('approved_spots')
      .insert({
        name: draft.name,
        description: draft.description,
        hub: draft.hub,
        category: draft.category,
        source: 'ai',
      })

    if (error) {
      alert('Approval failed')
      console.error(error)
      setApprovingId(null)
      return
    }

    await supabase
      .from('ai_suggested_spots')
      .delete()
      .eq('id', draft.id)

    setDrafts((prev) =>
      prev.filter((d) => d.id !== draft.id)
    )

    setApprovingId(null)
  }

  // ⏳ Loading screen
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading admin dashboard…
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-2">
        Admin — AI Draft Review
      </h1>

      {/* 🟢 Automation status */}
      <div className="mb-4 text-xs text-green-700 bg-green-100 p-2 rounded">
        Automation status: MANUAL ONLY (admin-triggered)
      </div>

      {/* 🤖 Generate AI */}
      <div className="mb-6">
        <button
          onClick={generateAI}
          disabled={generating}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {generating ? 'Generating…' : 'Generate AI Suggestions'}
        </button>

        {message && (
          <p className="mt-2 text-sm text-gray-700">
            {message}
          </p>
        )}
      </div>

      {/* 📄 Draft list */}
      {drafts.length === 0 && (
        <p className="text-gray-500">
          No AI drafts available.
        </p>
      )}

      <div className="space-y-6">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="bg-white border rounded p-4 space-y-3"
          >
            <input
              className="w-full border px-3 py-2 font-semibold"
              value={draft.name}
              onChange={(e) =>
                updateDraft(draft.id, 'name', e.target.value)
              }
            />

            <textarea
              className="w-full border px-3 py-2 text-sm"
              rows={4}
              value={draft.description}
              onChange={(e) =>
                updateDraft(
                  draft.id,
                  'description',
                  e.target.value
                )
              }
            />

            <div className="flex gap-3">
              <input
                className="flex-1 border px-3 py-2 text-sm"
                value={draft.hub}
                onChange={(e) =>
                  updateDraft(draft.id, 'hub', e.target.value)
                }
              />

              <input
                className="flex-1 border px-3 py-2 text-sm"
                value={draft.category}
                onChange={(e) =>
                  updateDraft(
                    draft.id,
                    'category',
                    e.target.value
                  )
                }
              />
            </div>

            <button
              onClick={() => approveDraft(draft)}
              disabled={approvingId === draft.id}
              className="bg-green-600 text-white px-4 py-1 text-sm rounded"
            >
              {approvingId === draft.id
                ? 'Approving…'
                : 'Approve'}
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
