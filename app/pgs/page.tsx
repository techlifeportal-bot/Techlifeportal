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

const HIDDEN_HUBS = ["outer ring road", "orr"];

const normalizeHub = (hub: string) =>
  hub.trim().toLowerCase();

export default function PGsPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedHub, setSelectedHub] = useState("all");
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    const fetchStays = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("pgs_rentals")
        .select("id, name, description, tag, maps_url, hub")
        .order("priority", { ascending: false });

      if (!error && data) {
        setStays(data);
      }

      setLoading(false);
    };

    fetchStays();
  }, []);

  /* ---------------- BUILD HUB LIST ---------------- */

  const hubMap = new Map<string, string>();

  stays.forEach((stay) => {
    if (!stay.hub) return;

    const normalized = normalizeHub(stay.hub);
    if (HIDDEN_HUBS.includes(normalized)) return;

    if (!hubMap.has(normalized)) {
      hubMap.set(normalized, stay.hub.trim());
    }
  });

  const hubs = Array.from(hubMap.values());

  /* ---------------- FILTER STAYS ---------------- */

  const filteredStays = stays.filter((stay) => {
    if (!stay.hub) return false;

    if (selectedHub === "all") {
      return !HIDDEN_HUBS.includes(normalizeHub(stay.hub));
    }

    return normalizeHub(stay.hub) === normalizeHub(selectedHub);
  });

  /* ---------------- UI ---------------- */

  return (
    <main className="page-container">
      <header className="page-header">
        <h1>PGs & Rentals</h1>
        <p>Find stays near your IT hub.</p>

        {/* HUB FILTER */}
        <div className="filter-box">
          <label>Select IT hub</label>

          <select
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
            className="hub-select"
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
      {loading && (
        <p style={{ marginTop: "20px" }}>Loading PGs…</p>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredStays.length === 0 && (
        <p className="empty-state">
          No PGs found for this hub.
        </p>
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
