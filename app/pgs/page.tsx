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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const hubs = Array.from(
    new Set(
      stays
        .map((s) => s.hub)
        .filter(Boolean)
        .map((h) => h!.trim())
    )
  );

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

      {!loading && filteredStays.length === 0 && (
        <p>No PGs found.</p>
      )}

      {!loading && filteredStays.length > 0 && (
        <section className="card-grid">
          {filteredStays.map((stay) => (
            <div key={stay.id} className="card pg-card">
              {stay.tag && <span className="pg-tag">{stay.tag}</span>}
              <h3>{stay.name}</h3>
              <p className="pg-hub">📍 {stay.hub}</p>
              {stay.description && <p>{stay.description}</p>}
              {stay.maps_url && (
                <a href={stay.maps_url} target="_blank">
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
