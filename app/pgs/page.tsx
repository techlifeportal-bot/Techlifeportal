"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const IT_HUBS = [
  { label: "Electronic City", value: "electronic city" },
  { label: "Whitefield", value: "whitefield" },
  { label: "Outer Ring Road", value: "outer ring road" },
  { label: "Bellandur", value: "bellandur" },
  { label: "HSR Layout", value: "hsr layout" },
  { label: "Manyata Tech Park", value: "manyata tech park" },
];

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PGsPage() {
  const [selectedHub, setSelectedHub] = useState("");
  const [pgs, setPgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedHub) return;

    const fetchPGs = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("pgs_rentals")
        .select("*")
        .ilike("hub", selectedHub);

      if (error) {
        console.error(error);
        setPgs([]);
      } else {
        setPgs(data || []);
      }

      setLoading(false);
    };

    fetchPGs();
  }, [selectedHub]);

  return (
    <main className="hub-page">
      {/* HEADER */}
      <section className="hub-header">
        <h1>PGs & Rentals</h1>
        <p>
          Select your IT hub to view PGs & rentals near your hub.
        </p>

        {/* HUB SELECTOR */}
        <div className="hub-switcher">
          <select
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
          >
            <option value="" disabled>
              Select your IT hub
            </option>

            {IT_HUBS.map((hub) => (
              <option key={hub.value} value={hub.value}>
                {hub.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* STATES */}
      {loading && <p>Loading PGs...</p>}

      {!loading && selectedHub && pgs.length === 0 && (
        <p className="hub-empty">
          No PGs listed yet for this IT hub.
        </p>
      )}

      {/* PG LIST */}
      <section className="hub-grid">
        {pgs.map((pg) => (
          <div key={pg.id} className="hub-card">
            <h3>{pg.name}</h3>

            {pg.description && (
              <p className="hub-address">{pg.description}</p>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
