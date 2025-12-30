"use client";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default async function WeekendSpotsPage() {
  const { data, error } = await supabase
    .from("weekend_spots")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Weekend Spots</h1>
        <p style={{ color: "red" }}>Failed to load weekend spots.</p>
      </main>
    );
  }

  if (!data || data.length === 0) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Weekend Spots</h1>
        <p>No weekend spots available yet.</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Weekend Spots</h1>

      <p style={{ color: "#555", marginBottom: 32, maxWidth: 720 }}>
        Curated weekend hangout places, short trips and peaceful spots that
        Bangalore IT professionals usually visit to relax after a busy week.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {data.map((spot: any) => (
          <div
            key={spot.id}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 20,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-6px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 12px 30px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            {/* Name */}
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {spot.name}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: 14,
                color: "#555",
                marginBottom: 16,
              }}
            >
              {spot.description}
            </p>

            {/* Map CTA */}
            {spot.location && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  spot.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  fontSize: 14,
                  color: "#2563eb",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                📍 Open in Google Maps →
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
