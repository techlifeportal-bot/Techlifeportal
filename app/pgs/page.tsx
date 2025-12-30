import { createClient } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function PGsPage() {
  const supabase = createClient();

  const { data: pgs, error } = await supabase
    .from("pgs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p style={{ padding: 20 }}>Failed to load PGs</p>;
  }

  return (
    <main className="list-page">
      <h1>🏠 PGs & Rentals</h1>
      <p className="subtitle">
        PGs and rental stays near Bangalore tech hubs for IT professionals.
      </p>

      <div className="card-grid">
        {pgs?.map((pg) => (
          <div key={pg.id} className="card">
            <h2>{pg.name}</h2>

            <p className="meta">
              📍 {pg.area} · 🏠 {pg.type}
            </p>

            <p className="description">{pg.description}</p>

            {pg.maps_link && (
              <a
                href={pg.maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                📍 View on Google Maps →
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
