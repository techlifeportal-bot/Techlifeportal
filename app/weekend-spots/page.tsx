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
  status: string;
};

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "trekking", label: "Trekking" },
  { key: "nature", label: "Nature" },
  { key: "waterfalls", label: "Waterfalls" },
  { key: "temples", label: "Temples" },
];

export default function WeekendSpotsPage() {
  const [spots, setSpots] = useState<WeekendSpot[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchSpots = async () => {
      const { data } = await supabase
        .from("weekend_spots")
        .select("id, name, description, category, maps_url, status")
        .eq("status", "active");

      if (data) setSpots(data);
    };

    fetchSpots();
  }, []);

  // Group by category (supports multiple categories per spot)
  const grouped: Record<string, WeekendSpot[]> = {};

  spots.forEach((spot) => {
    if (!spot.category) return;

    spot.category.split(",").forEach((cat) => {
      const key = cat.trim().toLowerCase();
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(spot);
    });
  });

  const renderSection = (title: string, key: string) => {
    if (selectedCategory !== "all" && selectedCategory !== key) return null;
    if (!grouped[key]?.length) return null;

    return (
      <section style={{ marginBottom: "70px" }}>
        <h2 style={{ marginBottom: "24px" }}>{title}</h2>

        <div className="feature-grid">
          {grouped[key].map((spot) => (
            <div key={spot.id} className="feature-card">
              <div>
                {/* FORCE TITLE VISIBILITY */}
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  {spot.name || "Unnamed place"}
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
      </section>
    );
  };

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
          {CATEGORIES.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {renderSection("🥾 Trekking", "trekking")}
      {renderSection("🌿 Nature", "nature")}
      {renderSection("💧 Waterfalls", "waterfalls")}
      {renderSection("🛕 Temples", "temples")}
    </main>
  );
}
