// app/pgs/page.tsx
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function PGsPage() {
  // Fetch PGs from Supabase
  const { data: pgs, error } = await supabase
    .from("pgs_rentals") // ✅ correct table name
    .select("*")
    .order("created_at", { ascending: false });

  // Error state
  if (error) {
    console.error("Error loading PGs:", error.message);
    return (
      <main className="page">
        <h1 className="page-title">🏠 PGs & Rentals</h1>
        <p className="error-text">Failed to load PG listings.</p>
      </main>
    );
  }

  // Empty state
  if (!pgs || pgs.length === 0) {
    return (
      <main className="page">
        <h1 className="page-title">🏠 PGs & Rentals</h1>
        <p className="page-subtitle">
          Affordable PGs and rental stays near Bangalore tech hubs.
        </p>
        <p className="empty-text">No PGs available yet.</p>
      </main>
    );
  }

  return (
    <main className="page">
      <h1 className="page-title">🏠 PGs & Rentals</h1>
      <p className="page-subtitle">
        Affordable PGs and rental stays near Bangalore tech hubs.
      </p>

      <section className="card-grid">
        {pgs.map((pg: any) => (
          <div key={pg.id} className="card">
            <h3 className="card-title">{pg.name}</h3>

            <p className="card-meta">
              📍 {pg.location} · 💰 {pg.price_range || "Price not listed"}
            </p>

            {pg.description && (
              <p className="card-description">{pg.description}</p>
            )}

            {pg.google_maps_url && (
              <a
                href={pg.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                View on Google Maps →
              </a>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
