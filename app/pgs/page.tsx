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
  location: string | null;
  status: string;
  type: string;
};

const normalizeHub = (hub: string) => hub.trim().toLowerCase();

export default function PGsPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedHub, setSelectedHub] = useState("electronic city");
  const [loading, setLoading] = useState(true);

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

  const hubs = [
    "electronic city",
    "Manyata tech park",
    "whitefield",
    "HSR layout",
  ];

  const filteredStays = stays.filter((stay) => {
    if (!stay.hub) return false;
    return normalizeHub(stay.hub) === selectedHub;
  });

  const handleHubChange = (hub: string) => {
    if (hub !== "electronic city") {
      alert(`${hub} launching soon.`);
      return;
    }

    setSelectedHub(hub);
  };

  return (
    <main className="page-container">
      <header className="page-header">
        <h1>Verified PGs Near IT Hubs</h1>
        <p>Only trusted PG listings. Direct enquiry. No brokers.</p>

        <div className="filter-box">
          <label>Select IT Hub</label>
          <select
            value={selectedHub}
            onChange={(e) => handleHubChange(e.target.value)}
          >
            {hubs.map((hub) => (
              <option key={hub} value={hub}>
                {hub}
              </option>
            ))}
          </select>
        </div>
      </header>

      {loading && (
        <p className="empty-state">Loading verified PGs…</p>
      )}

      {!loading && filteredStays.length === 0 && (
        <p className="empty-state">
          No verified PGs found in Electronic City.
        </p>
      )}

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
                <p className="pg-location">🏠 {stay.location}</p>
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