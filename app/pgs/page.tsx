"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const IT_HUBS = [
  "Electronic City",
  "Whitefield",
  "Outer Ring Road",
  "Bellandur",
  "HSR Layout",
  "Manyata Tech Park",
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

      const slug = selectedHub.toLowerCase().replace(/\s+/g, "-");

      const { data } = await supabase
        .from("pgs_rentals")
        .select("*")
        .eq("hub", slug);

      setPgs(data || []);
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
              <option key={hub} value={hub}>
                {hub}
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

            {pg.address && (
              <p className="hub-address">{pg.address}</p>
            )}

            {pg.rent && (
              <p className="hub-rent">Rent: ₹{pg.rent}</p>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
