import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function HomePage() {
  const { data: weekendSpots, error } = await supabase
    .from("weekend_spots")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-600">Error loading weekend spots</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      {/* Intro text */}
      <p className="text-gray-600 mb-8">
        <strong>TechLifePortal</strong> helps Bangalore IT professionals discover
        jobs, companies, places, and weekend getaways — powered by AI.
      </p>

      <h1 className="text-3xl font-bold mb-6">Weekend Spots</h1>

      <div className="space-y-6">
        {weekendSpots?.map((spot) => (
          <div key={spot.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{spot.Name}</h2>
            <p className="text-sm text-gray-500">{spot.hub}</p>
            <p className="mt-2">{spot.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
