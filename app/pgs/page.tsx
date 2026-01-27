"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Stay = {
  id: string;
  name: string;
  description: string | null;
  tag: string | null;
  maps_url: string | null;
  hub: string | null;
};

const normalizeHub = (hub: string) => hub.trim().toLowerCase();

export default function PGsPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedHub, setSelectedHub] = useState("all");
  const [loading, setLoading] = useState(true);

  /* FETCH DATA */
  useEffect(() => {
    const fetchStays = async () => {
      setLoading(true);

      const { data } = await supabase
        .from("pgs_rentals")
        .select("id, name, description, tag, maps_url, hub")
        .order("priority", { ascending: false });

      setStays(data || []);
      setLoading(false);
    };

    fetchStays();
  }, []);

  /* HUB LIST */
  const hubs = Array.from(
    new Set(
      stays
        .map((s) => s.hub)
        .filter(Boolean)
        .map((h) => h!.trim())
    )
  );

  /* FILTER */
  const filteredStays = stays.filter((stay) => {
    if (!stay.hub) return false;
    if (selectedHub === "all") return true;
    return normalizeHub(stay.hub) === normalizeHub(selectedHub);
  });

  return (
    <main className="page-container">
      <header className="page-header">
        <h1>PGs & Rentals</h1>
        <p>Find stays near your IT hub.</p>

        {/* HUB SELECT */}
        <div style={{ marginTop: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "#e5e7eb",
            }}
          >
            Select IT hub
          </label>

          <select
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
            className="dark-select"
          >
            <option value="all">All hubs</option>
            {hubs.map((hub) => (
              <option key={hub} value={hub}>
                {hub}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* LOADING */}
      {loading && <p style={{ marginTop: "20px" }}>Loading PGs…</p>}

      {/* EMPTY */}
      {!loading && filteredStays.length === 0 && (
        <p style={{ marginTop: "20px" }}>No PGs found.</p>
      )}

      {/* CARDS */}
      {!loading && filteredStays.length > 0 && (
        <section className="card-grid">
          {filteredStays.map((stay) => (
            <div key={stay.id} className="card pg-card">
              {stay.tag && (
                <span className="pg-tag">{stay.tag}</span>
              )}

              <h3 className="pg-title">{stay.name}</h3>

              {stay.hub && (
                <p className="pg-hub">📍 {stay.hub}</p>
              )}

              {stay.description && (
                <p className="pg-desc">{stay.description}</p>
              )}

              {stay.maps_url && (
                <a
                  href={stay.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  View on Google Maps →
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
