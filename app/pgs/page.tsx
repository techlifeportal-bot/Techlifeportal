"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type PG = {
  id: number;
  name: string;
  description: string | null;
  tag: string | null;
  maps_url: string | null;
  hub: string | null;
};

export default function PGsPage() {
  const [pgs, setPgs] = useState<PG[]>([]);
  const [selectedHub, setSelectedHub] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPGs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("pgs_rentals")
        .select("id, name, description, tag, maps_url, hub")
        .order("priority", { ascending: false });

      if (!error) setPgs(data || []);
      setLoading(false);
    };

    fetchPGs();
  }, []);

  const hubs = Array.from(
    new Set(pgs.map((pg) => pg.hub).filter(Boolean))
  ) as string[];

  const filteredPGs =
    selectedHub === "all"
      ? pgs
      : pgs.filter((pg) => pg.hub === selectedHub);

  return (
    <main className="page-container">
      {/* HEADER */}
      <header className="page-header">
        <h1>PGs & Rentals</h1>
        <p>Find PGs near your IT hub.</p>

        <div className="filter-box">
          <label>Select hub</label>
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
          <small className="filter-hint">
            Choose a hub to see nearby PGs
          </small>
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

      {/* EMPTY */}
      {!loading && filteredPGs.length === 0 && (
        <p className="empty-state">
          No PGs added for this hub yet.
        </p>
      )}

      {/* CARDS */}
      {!loading && filteredPGs.length > 0 && (
        <section className="card-grid">
          {filteredPGs.map((pg) => (
            <div key={pg.id} className="card pg-card">
              {/* TAG */}
              {pg.tag && <span className="pg-tag">{pg.tag}</span>}

              {/* NAME */}
              <h3 className="pg-title">{pg.name}</h3>

              {/* DESCRIPTION */}
              {pg.description && (
                <p className="pg-desc">{pg.description}</p>
              )}

              {/* MAP LINK */}
              {pg.maps_url && (
                <a
                  href={pg.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  Open in Google Maps →
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
