import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function PGsPage() {
  const { data: pgs, error } = await supabase
    .from("pgs_rentals")
    .select("id, name, location, description, maps_url, priority, status")
    .eq("status", "active")
    .order("priority", { ascending: false });

  if (error) {
    return <p className="error-text">Failed to load PG listings.</p>;
  }

  return (
    <main className="list-page">
      <h1 className="page-title">🏠 PGs & Rentals</h1>
      <p className="page-subtitle">
        PGs and rental stays near Bangalore tech hubs.
      </p>

      <section className="card-grid">
        {pgs && pgs.length > 0 ? (
          pgs.map((pg) => (
            <div key={pg.id} className="card">
              <h3>{pg.name}</h3>

              {pg.location && (
                <p className="meta">📍 {pg.location}</p>
              )}

              {pg.description && (
                <p className="description">{pg.description}</p>
              )}

              {pg.maps_url ? (
                <a
                  href={pg.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  📍 View on Google Maps →
                </a>
              ) : pg.location ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    pg.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  📍 Search on Google Maps →
                </a>
              ) : null}
            </div>
          ))
        ) : (
          <p>No PG listings available yet.</p>
        )}
      </section>
    </main>
  );
}
