import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function HomePage() {
  // Fetch approved weekend spots (limit for homepage)
  const { data: weekendSpots } = await supabase
    .from('weekend_spots')
    .select('id, name, description')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(6)

  // Fetch PGs (if table exists & has data)
  const { data: pgs } = await supabase
    .from('pg_rentals')
    .select('id, name, location, rent')
    .eq('status', 'approved')
    .limit(4)

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-20">

      {/* HERO SECTION */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          TechLifePortal
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Smart weekend getaways and PGs curated for IT professionals around Bangalore.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/weekend-spots"
            className="px-6 py-3 bg-black text-white rounded-lg"
          >
            Explore Weekend Spots
          </Link>
          <Link
            href="/pgs"
            className="px-6 py-3 border border-black rounded-lg"
          >
            Find PGs
          </Link>
        </div>
      </section>

      {/* WEEKEND SPOTS PREVIEW */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Weekend Spots</h2>
          <Link href="/weekend-spots" className="text-sm underline">
            View all →
          </Link>
        </div>

        {weekendSpots && weekendSpots.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {weekendSpots.map((spot) => (
              <div
                key={spot.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <h3 className="font-semibold text-lg">{spot.name}</h3>
                <p className="text-sm text-gray-600">
                  {spot.description?.slice(0, 120)}...
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Weekend spots will appear here soon.
          </p>
        )}
      </section>

      {/* PG SECTION (B1 LOGIC) */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">PGs for IT Professionals</h2>
          <Link href="/pgs" className="text-sm underline">
            View all →
          </Link>
        </div>

        {pgs && pgs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {pgs.map((pg) => (
              <div
                key={pg.id}
                className="border rounded-lg p-4 space-y-1"
              >
                <h3 className="font-semibold">{pg.name}</h3>
                <p className="text-sm text-gray-600">
                  {pg.location} • ₹{pg.rent}/month
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="border rounded-lg p-6 text-gray-500">
            PG listings coming soon. We’re curating quality stays near IT hubs.
          </div>
        )}
      </section>

      {/* TRUST SECTION */}
      <section className="text-center space-y-3">
        <p className="font-medium">
          Curated with AI. Reviewed by humans.
        </p>
        <p className="text-sm text-gray-600">
          Built specifically for IT professionals who value time, clarity, and trust.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TechLifePortal · About · Contact
      </footer>

    </main>
  )
}
