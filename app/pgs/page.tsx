"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ---------------- TYPES ---------------- */

type Stay = {
  id: string;
  name: string;
  description: string | null;
  tag: string | null;
  maps_url: string | null;
  hub: string | null;
  location: string | null;

  status: string; // active / pending
  type: string;   // pg / rental
};

/* ---------------- HELPERS ---------------- */

const normalizeHub = (hub: string) => hub.trim().toLowerCase();

/* ---------------- PAGE ---------------- */

export default function PGsPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedHub, setSelectedHub] = useState("all");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PG LISTINGS ---------------- */

  useEffect(() => {
    const fetchStays = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("pgs_rentals")
        .select(
          `
          id,
          name,
          description,
          tag,
          maps_url,
          hub,
          location,
          status,
          type
        `
        )
        .eq("type", "pg")         // ONLY PGs
        .eq("status", "active")   // ONLY VERIFIED
        .order("priority", { ascending: false });

      if (error) {
        console.error("Error fetching PGs:", error.message);
      }

      setStays(data || []);
      setLoading(false);
    };

    fetchStays();
  }, []);

  /* ---------------- HUB DROPDOWN LIST ---------------- */

  const hubs = Array.from(
    new Set(
      stays
        .map((s) => s.hub)
        .filter(Boolean)
        .map((h) => h!.trim())
    )
  );

  /* ---------------- FILTER BY HUB ---------------- */

  const filteredStays = stays.filter((stay) => {
    if (!stay.hub) return false;
    if (selectedHub === "all") return true;
    return normalizeHub(stay.hub) === normalizeHub(selectedHub);
  });

  /* ---------------- UI ---------------- */

  return (
    <main className="page-container">
      {/* HEADER */}
      <header className="page-header">
        <h1>Verified PGs Near IT Hubs</h1>
        <p>
          Only trusted PG listings. Direct enquiry. No brokers.
        </p>

        {/* HUB DROPDOWN */}
        <div className="dropdown">
          <label>Select IT Hub</label>

          <button
            className="dropdown-trigger"
            onClick={() => setOpen(!open)}
          >
            {selectedHub === "all" ? "All hubs" : selectedHub}
            <span className="arrow">▾</span>
          </button>

          {open && (
            <div className="dropdown-menu">
              {/* ALL */}
              <div
                className="dropdown-item"
                onClick={() => {
                  setSelectedHub("all");
                  setOpen(false);
                }}
              >
                All hubs
              </div>

              {/* HUBS */}
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

      {/* LOADING */}
      {loading && (
        <p className="empty-state">Loading verified PGs…</p>
      )}

      {/* EMPTY */}
      {!loading && filteredStays.length === 0 && (
        <p className="empty-state">No verified PGs found.</p>
      )}

      {/* PG LIST */}
      {!loading && filteredStays.length > 0 && (
        <section className="card-grid">
          {filteredStays.map((stay) => (
            <div key={stay.id} className="card pg-card">
              {/* TAG */}
              {stay.tag && (
                <span className="pg-tag">{stay.tag}</span>
              )}

              {/* TITLE */}
              <h3 className="pg-title">{stay.name}</h3>

              {/* HUB */}
              {stay.hub && (
                <p className="pg-hub">📍 {stay.hub}</p>
              )}

              {/* LOCATION */}
              {stay.location && (
                <p className="pg-location">
                  🏠 {stay.location}
                </p>
              )}

              {/* DESCRIPTION */}
              {stay.description && (
                <p className="pg-desc">{stay.description}</p>
              )}

              {/* MAP */}
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

              {/* PREMIUM PLACEHOLDER */}
              <div className="premium-box">
                ⭐ Premium Owners will get more enquiries here
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
