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
  type: "pg" | "rental" | null;
};

const normalizeHub = (hub: string) => hub.trim().toLowerCase();

export default function PGsPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedHub, setSelectedHub] = useState("all");
  const [activeType, setActiveType] = useState<"pg" | "rental">("pg");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* FETCH DATA */
  useEffect(() => {
    const fetchStays = async () => {
      setLoading(true);

      const { data } = await supabase
        .from("pgs_rentals")
        .select("id, name, description, tag, maps_url, hub, type")
        .order("priority", { ascending: false });

      setStays(data || []);
      setLoading(false);
    };

    fetchStays();
  }, []);

  /* HUB LIST (BASED ON ACTIVE TAB) */
  const hubs = Array.from(
    new Set(
      stays
        .filter((s) => (s.type ?? "pg") === activeType)
        .map((s) => s.hub)
        .filter(Boolean)
        .map((h) => h!.trim())
    )
  );

  /* FILTER STAYS */
  const filteredStays = stays.filter((stay) => {
    const stayType = stay.type ?? "pg";
    if (stayType !== activeType) return false;
    if (!stay.hub) return false;

    if (selectedHub === "all") return true;

    return normalizeHub(stay.hub) === normalizeHub(selectedHub);
  });

  return (
    <main className="page-container">
      <header className="page-header">
        <h1>PGs & Rentals</h1>
        <p>Find stays near your IT hub.</p>

        {/* TABS */}
        <div className="type-tabs">
          <button
            className={`type-tab ${activeType === "pg" ? "active" : ""}`}
            onClick={() => {
              setActiveType("pg");
              setSelectedHub("all");
            }}
          >
            PGs
          </button>

          <button
            className={`type-tab ${activeType === "rental" ? "active" : ""}`}
            onClick={() => {
              setActiveType("rental");
              setSelectedHub("all");
            }}
          >
            Rentals
          </button>
        </div>

        {/* CUSTOM DARK DROPDOWN */}
        <div className="dropdown">
          <label>Select IT hub</label>

          <button
            className="dropdown-trigger"
            onClick={() => setOpen(!open)}
          >
            {selectedHub === "all" ? "All hubs" : selectedHub}
            <span className="arrow">▾</span>
          </button>

          {open && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => {
                  setSelectedHub("all");
                  setOpen(false);
                }}
              >
                All hubs
              </div>

              {hubs.map((hub) => (
                <div
                  key={hub}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedHub(hub);
                    setOpen(false);
                  }}
                >
                  {hub}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* STATES */}
      {!loading && filteredStays.length === 0 && (
        <p className="empty-state">
          No {activeType === "pg" ? "PGs" : "rentals"} found.
        </p>
      )}

      {!loading && filteredStays.length > 0 && (
        <section className="card-grid">
          {filteredStays.map((stay) => (
            <div key={stay.id} className="card pg-card">
              {stay.tag && <span className="pg-tag">{stay.tag}</span>}

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
