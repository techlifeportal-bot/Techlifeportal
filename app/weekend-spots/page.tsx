import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function WeekendSpotsPage() {
  const { data: spots, error } = await supabase
    .from("weekend_spots")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-4">Weekend Spots</h1>
        <p className="text-red-600">
          Failed to load weekend spots. Please try again later.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-4">
        Weekend Spots
      </h1>

      <p className="text-slate-600 mb-8 max-w-3xl">
        Curated weekend places, short trips and hangout spots popular among
        Bangalore IT professionals.
      </p>

      {spots.length === 0 ? (
        <p className="text-slate-600">
          No weekend spots available right now.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spots.map((spot) => (
            <div
              key={spot.id}
              className="border rounded-xl p-5 bg-white hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-2">
                {spot.name}
              </h2>

              <p className="text-sm text-slate-600 mb-4">
                {spot.description}
              </p>

              {spot.location && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    spot.location
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-medium"
                >
                  Open in Google Maps →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
