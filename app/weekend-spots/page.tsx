import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function WeekendSpotsPage() {
  const { data: spots, error } = await supabase
    .from("weekend_spots")
    .select("id, location, maps_url, priority, status")
    .eq("status", "active")
    .order("priority", { ascending: false });

  if (error) {
    return <p>Failed to load weekend spots.</p>;
  }

  return (
    <main className="list-page">
      <h1>🌴 Weekend Spots</h1>
      <p>
        Handpicked weekend getaways and hangout places for Bangalore IT
        professionals.
      </p>

      {/* Scoped styles — affects ONLY this page */}
      <style>{`
        .weekend-card {
          border-radius: 14px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .weekend-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }

        .weekend-card h3 {
          margin-bottom: 6px;
        }

        .weekend-card a {
          display: inline-block;
          margin-top: 10px;
          font-weight: 500;
        }
      `}</style>

      <section className="card-grid">
        {spots && spots.length > 0 ? (
          spots.map((spot) => (
            <div key={spot.id} className="weekend-card">
              <h3>{spot.location}</h3>

              {spot.maps_url && (
                <a
                  href={spot.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 Open in Google Maps →
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No weekend spots available yet.</p>
        )}
      </section>
    </main>
  );
}
