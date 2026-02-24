"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type WeekendSpot = {
  id: number;
  tag: string | null;
  category: string | null;
  location: string | null;
  travel_time: string | null;
  maps_url: string | null;
  image_url: string | null;
};

export default function WeekendSpotsPage() {
  const [spots, setSpots] = useState<WeekendSpot[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);

      // Try cache first
      const cached = localStorage.getItem("weekend_spots_cache");
      if (cached) {
        setSpots(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fetch from Supabase
      const { data, error } = await supabase
        .from("weekend_spots")
        .select(
          "id, tag, category, location, travel_time, maps_url, image_url"
        )
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching weekend spots:", error);
      } else {
        setSpots(data || []);
        localStorage.setItem("weekend_spots_cache", JSON.stringify(data || []));
      }

      setLoading(false);
    };

    fetchSpots();
  }, []);

  const filteredSpots =
    selectedCategory === "all"
      ? spots
      : spots.filter((spot) => {
          if (!spot.category) return false;
          return spot.category
            .toLowerCase()
            .split(",")
            .map((c) => c.trim())
            .includes(selectedCategory);
        });

  return (
    <main className="page-container">
      {/* HEADER */}
      <header className="page-header">
        <h1>Explore Weekend Spots</h1>

        <p>
          Explore famous temples, nature spots, and short weekend getaways in and
          around Bangalore.
        </p>

        {/* CATEGORY SELECT */}
        <div className="filter-box">
          <label>Select category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="temple">Temples</option>
            <option value="trekking">Trekking</option>
            <option value="nature">Nature</option>
            <option value="waterfalls">Waterfalls</option>
            <option value="heritage">Heritage</option>
            <option value="resorts">Resorts</option>
          </select>
        </div>
      </header>

      {/* SKELETON LOADER */}
      {loading && (
        <section className="card-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton" />
          ))}
        </section>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredSpots.length === 0 && (
        <p>No weekend spots found.</p>
      )}

      {/* CARDS */}
      {!loading && filteredSpots.length > 0 && (
        <section className="card-grid">
          {filteredSpots.map((spot) => (
            <div key={spot.id} className="card">
              {/* IMAGE */}
              {spot.image_url && (
                <img
                  src={spot.image_url}
                  alt={spot.tag || "Weekend spot"}
                  className="spot-image"
                  loading="lazy"
                />
              )}

              {/* TITLE */}
              <h3>{spot.tag || "Unnamed Spot"}</h3>

              {/* LOCATION */}
              {spot.location && (
                <p className="location">📍 {spot.location}</p>
              )}

              {/* TRAVEL TIME */}
              {spot.travel_time && (
                <p className="travel-time">
                  ⏱️ ~{spot.travel_time} from Bangalore
                </p>
              )}

              {/* MAP LINK */}
              {spot.maps_url && (
                <a
                  href={spot.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
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
