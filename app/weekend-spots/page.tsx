"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type WeekendSpot = {
  id: string;
  name: string | null;
  description: string | null;
  category: string | null;
  maps_url: string | null;
};

export default function WeekendSpotsPage() {
  const [spots, setSpots] = useState<WeekendSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchSpots = async () => {
      const { data, error } = await supabase
        .from("weekend_spots")
        .select("id, name, description, category, maps_url");

      if (error) {
        console.error("Supabase error:", error);
      } else {
        setSpots(data || []);
      }

      setLoading(false);
    };

    fetchSpots();
  }, []);

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading weekend spots…</p>;
  }

  const categories = Array.from(
    new Set(
      spots
        .flatMap((s) =>
          s.category ? s.category.split(",").map((c) => c.trim()) : []
        )
        .filter(Boolean)
    )
  );

  const filteredSpots =
    selectedCategory === "all"
      ? spots
      : spots.filter((s) =>
          s.category
            ?.split(",")
            .map((c) => c.trim())
            .includes(selectedCategory)
        );

  return (
    <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 20px" }}>
      <h1 style={{ marginBottom: "10px" }}>Explore Weekend Spots</h1>
      <p style={{ marginBottom: "30px", color: "#cbd5f5" }}>
        Discover weekend destinations around Bangalore — explore by interest,
        not location.
      </p>

      {/* CATEGORY SELECT */}
      <div style={{ marginBottom: "50px", maxWidth: "260px" }}>
        <label style={{ display: "block", marginBottom: "6px" }}>
          Choose category
        </label>
        <select
          className="hub-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* SPOTS GRID */}
      {filteredSpots.length === 0 ? (
        <p>No weekend spots found.</p>
      ) : (
        <div className="feature-grid">
          {filteredSpots.map((spot) => (
            <div key={spot.id} className="feature-card">
              <div>
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  {spot.name}
                </h3>
                <p>{spot.description}</p>
              </div>

              {spot.maps_url && (
                <a
                  href={spot.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
