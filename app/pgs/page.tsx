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

export default function PGsPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedHub, setSelectedHub] = useState("Electronic City");
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
        console.error(error.message);
      }

      setStays(data || []);
      setLoading(false);
    };

    fetchStays();
  }, []);

  const hubs = [
    "Electronic City",
    "Manyata Tech Park",
    "Whitefield",
    "HSR Layout",
  ];

  const filteredStays = stays.filter(
    (stay) => stay.hub === selectedHub
  );

  const handleHubChange = (hub: string) => {
    if (hub !== "Electronic City") {
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
          No verified PGs found in {selectedHub}.
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