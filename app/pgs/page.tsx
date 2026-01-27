"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Stay = {
  id: number;
  name: string;
  description: string | null;
  tag: string | null;
  maps_url: string | null;
  hub: string | null;
  type: "pg" | "rental";
};

const HIDDEN_HUBS = ["outer ring road", "orr"];

function normalizeHub(hub: string) {
  return hub.trim().toLowerCase();
}

export default function PGsPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedHub, setSelectedHub] = useState("all");
  const [activeType, setActiveType] = useState<"pg" | "rental">("pg");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStays = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("pgs_rentals")
        .select("id, name, description, tag, maps_url, hub, type")
        .order("priority", { ascending: false });

      if (!error) setStays(data || []);
      setLoading(false);
    };

    fetchStays();
  }, []);

  /* Build unique hub list */
  const hubMap = new Map<string, string>();

  stays.forEach((stay) => {
    if (!stay.hub) return;
    const norm = normalizeHub(stay.hub);
    if (HIDDEN_HUBS.includes(norm)) return;
    if (!hubMap.has(norm)) {
      hubMap.set(norm, stay.hub.trim());
    }
  });

  const hubs = Array.from(hubMap.values());

  /* Filter stays by type + hub */
  const filteredStays = stays.filter((stay) => {
    if (stay.type !== activeType) return false;

    if (selectedHub === "all") {
      return stay.hub && !HIDDEN_HUBS.includes(normalizeHub(stay.hub));
    }

    return (
      stay.hub &&
      normalizeHub(stay.hub) === normalizeHub(selectedHub)
    );
  });

  return (
    <main className="page-container">
      {/* HEADER */}
      <header className="page-header">
        <h1>PGs & Rentals</h1>
        <p>Find stays near your IT hub.</p>

        {/* TYPE TABS */}
        <div className="type-tabs">
          <button
            className={`type-tab ${activeType === "pg" ? "active" : ""}`}
            onClick={() => setActiveType("pg")}
          >
            PGs
          </button>

          <button
            className={`type-tab ${activeType === "rental" ? "active" : ""}`}
            onClick={() => setActiveType("rental")}
          >
            Rentals
          </button>
        </div>

        {/* HUB FILTER */}
        <div className="filter-box">
          <label>Select IT hub</label>
          <select
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
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
        <section className="card-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton" />
          ))}
        </section>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredStays.length === 0 && (
        <p className="empty-state">
          No {activeType === "pg" ? "PGs" : "rentals"} found for this hub.
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
