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
  status: string;
  type: string;
};

/* ---------------- HELPERS ---------------- */

const normalizeHub = (hub: string) => hub.trim().toLowerCase();

/* ---------------- PAGE ---------------- */

export default function PGsPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedHub, setSelectedHub] = useState("Electronic City");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PG LISTINGS ---------------- */

  useEffect(() => {
    const fetchStays = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("pgs_rentals")
        .select(`
          id,
          name,
          description,
          tag,
          maps_url,
          hub,
          location,
          status,
          type
        `)
        .eq("type", "pg")
        .eq("status", "active")
        .order("priority", { ascending: false });

      if (error) {
        console.error("Error fetching PGs:", error.message);
      }

      setStays(data || []);
      setLoading(false);
    };

    fetchStays();
  }, []);

  /* ---------------- FIXED HUB LIST ---------------- */

  const hubs = [
    "Electronic City",
    "Manyata Tech Park",
    "Whitefield",
    "HSR Layout",
  ];

  /* ---------------- FILTER BY HUB ---------------- */

  const filteredStays = stays.filter((stay) => {
    if (!stay.hub) return false;

    if (selectedHub === "Electronic City") {
      return normalizeHub(stay.hub) === normalizeHub("Electronic City");
    }

    return false;
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
            {selectedHub}
            <span className="arrow">▾</span>
          </button>

          {open && (
            <div className="dropdown-menu">
              {hubs.map((hub) => (
                <div
                  key={hub}
                  className="dropdown-item"
                  onClick={() => {
                    if (hub !== "Electronic City") {
                      alert(`${hub} launching soon.`);
                      setOpen(false);
                      return;
                    }

                    setSelectedHub(hub);
                    setOpen(false);
                  }}
                  style={{
                    opacity: hub === "Electronic City" ? 1 : 0.6,
                    cursor:
                      hub === "Electronic City"
                        ? "pointer"
                        : "not-allowed",
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
        <p className="empty-state">
          No verified PGs found in Electronic City.
        </p>
      )}

      {/* PG LIST */}
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

              {stay.location && (
                <p className="pg-location">
                  🏠 {stay.location}
                </p>
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