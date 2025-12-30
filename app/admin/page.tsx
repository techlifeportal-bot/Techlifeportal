"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Draft = {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
};

const AI_TYPES = [
  { label: "Weekend Spots", value: "weekend_spots" },
  { label: "Cafes", value: "cafes" },
  { label: "Gyms", value: "gyms" },
  { label: "Companies", value: "companies" },
  { label: "Jobs", value: "jobs" },
];

export default function AdminPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    const { data, error } = await supabase
      .from("ai_suggested_spots")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setDrafts(data || []);
    } else {
      console.error(error);
    }

    setLoading(false);
  };

  const generateAISuggestions = async () => {
    if (!selectedType) {
      alert("Select AI suggestion type first");
      return;
    }

    setGenerating(true);

    try {
      const res = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: selectedType }),
      });

      if (!res.ok) throw new Error();

      await fetchDrafts();
    } catch {
      alert("Failed to generate AI suggestions");
    }

    setGenerating(false);
  };

  const approveDraft = async (draft: Draft) => {
    const { error } = await supabase
      .from(draft.category)
      .insert({
        name: draft.name,
        description: draft.description,
        location: draft.location,
      });

    if (error) {
      alert("Failed to approve");
      return;
    }

    await supabase
      .from("ai_suggested_spots")
      .delete()
      .eq("id", draft.id);

    fetchDrafts();
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <h1>Admin — AI Draft Review</h1>
        <p>
          Automation status: <strong>MANUAL ONLY</strong>
        </p>

        <div className="admin-ai-control">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select AI suggestion type</option>
            {AI_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <button
            className="generate-btn"
            onClick={generateAISuggestions}
            disabled={generating}
          >
            {generating ? "Generating…" : "Generate AI Suggestions"}
          </button>
        </div>
      </header>

      {loading && <p>Loading AI drafts…</p>}

      {!loading && drafts.length === 0 && (
        <p>No AI drafts pending review.</p>
      )}

      <section className="admin-grid">
        {drafts.map((draft) => (
          <div key={draft.id} className="admin-card">
            <div className="admin-card-header">
              <h3>{draft.name}</h3>
              <span className="admin-status">
                {draft.category.replace("_", " ")}
              </span>
            </div>

            <label>Description</label>
            <textarea value={draft.description} rows={4} readOnly />

            <div className="admin-row">
              <div>
                <label>Location</label>
                <input value={draft.location} readOnly />
              </div>

              <div>
                <label>Category</label>
                <input value={draft.category} readOnly />
              </div>
            </div>

            <button
              className="approve-btn"
              onClick={() => approveDraft(draft)}
            >
              Approve
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
