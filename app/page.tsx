import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function HomePage() {
  const { data: weekendSpots, error } = await supabase
    .from('weekend_spots')
    .select('*')
    .order('priority', { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Error loading weekend spots
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Weekend Spots
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {weekendSpots?.map((spot) => (
          <div
            key={spot.id}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold mb-2">
              {spot.Name}
            </h2>

            <p className="text-gray-700 mb-3">
              {spot.description}
            </p>

            <div className="text-sm text-gray-600">
              📍 {spot.hub}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
