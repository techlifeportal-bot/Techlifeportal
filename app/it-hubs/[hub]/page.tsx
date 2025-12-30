"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HubPage() {
  const { hub } = useParams();
  const [pgs, setPgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hub) return;

    const fetchPGs = async () => {
      const { data, error } = await supabase
        .from("pgs_rentals")
        .select("*")
        .eq("hub", hub);

      if (error) {
        setError("Failed to load PGs");
      } else {
        setPgs(data || []);
      }
      setLoading(false);
    };

    fetchPGs();
  }, [hub]);

  const hubName =
    typeof hub === "string" ? hub.replace(/-/g, " ") : "";

  return (
    <main className="hub-page">
      <section className="hub-header">
        <h1>{hubName}</h1>
        <p>PGs & rentals available near this IT hub.</p>
      </section>

      {loading && <p>Loading PGs...</p>}

      {error && <p className="hub-error">{error}</p>}

      {!loading && !error && pgs.length === 0 && (
        <p className="hub-empty">
          No PGs listed yet for this IT hub.
        </p>
      )}

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
