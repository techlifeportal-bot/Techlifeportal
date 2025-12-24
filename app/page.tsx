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
            {/* Spot name */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {spot.Name}
            </h2>

            {/* Human-written description */}
            {spot.description && (
              <p className="text-gray-700 mb-3">
                {spot.description}
              </p>
            )}

            {/* AI summary (collapsed by default) */}
            {spot.ai_summary && (
              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-blue-600 font-medium">
                  🤖 View AI summary
                </summary>
                <div className="mt-2 text-sm text-gray-600 whitespace-pre-line">
                  {spot.ai_summary}
                </div>
              </details>
            )}

            {/* Meta info */}
            <div className="mt-3 text-sm text-gray-500">
              {spot.hub && <>📍 {spot.hub}</>}
              {spot.category && <> · 🏷️ {spot.category}</>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
