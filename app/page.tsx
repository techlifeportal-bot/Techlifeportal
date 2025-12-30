import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-14">
        <h1 className="text-4xl font-bold text-slate-900">
          TechLifePortal
        </h1>

        <p className="mt-2 text-lg text-slate-600">
          For IT professionals in Bangalore
        </p>

        <p className="mt-4 text-slate-600 max-w-2xl">
          Discover weekend spots and PG stays near major tech hubs.
          Built specifically for Bangalore IT employees.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/weekend-spots"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Explore Weekend Spots
          </Link>

          <Link
            href="/pgs"
            className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100"
          >
            Find PGs Near Office
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Currently focused on Bangalore tech hubs • Beta launch
        </p>
      </section>

      {/* PREVIEW CARDS */}
      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-16">
        {/* WEEKEND SPOTS */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Weekend Spots for IT Folks
          </h2>
          <p className="text-slate-600 mt-1">
            Popular short trips & hangouts near tech areas.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Nandi Hills Sunrise Point",
                location: "Near Bangalore",
                desc: "Early morning ride & sunrise views."
              },
              {
                name: "Nexus Mall, Bellandur",
                location: "Bellandur",
                desc: "Food, movies & relaxed hangout."
              },
              {
                name: "JP Nagar Mini Forest",
                location: "JP Nagar",
                desc: "Calm walking trail & greenery."
              }
            ].map((spot) => (
              <div
                key={spot.name}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <h3 className="font-semibold text-slate-800">
                  {spot.name}
                </h3>
                <p className="text-sm text-slate-500">{spot.location}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {spot.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/weekend-spots"
            className="inline-block mt-4 text-blue-600 font-medium hover:underline"
          >
            View all weekend spots →
          </Link>
        </div>

        {/* PGs */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            PGs & Rentals for IT Employees
          </h2>
          <p className="text-slate-600 mt-1">
            Affordable stays near tech parks.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              {
                name: "Men’s PG – Electronic City",
                price: "₹7,500 / month",
                desc: "Walking distance to tech offices."
              },
              {
                name: "Coliving – Bellandur",
                price: "₹9,000 / month",
                desc: "Fully furnished, IT-friendly stay."
              },
              {
                name: "Budget PG – Whitefield",
                price: "₹8,000 / month",
                desc: "Popular among new joiners."
              }
            ].map((pg) => (
              <div
                key={pg.name}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <h3 className="font-semibold text-slate-800">
                  {pg.name}
                </h3>
                <p className="text-sm text-slate-500">{pg.price}</p>
                <p className="mt-2 text-sm text-slate-600">
                  {pg.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/pgs"
            className="inline-block mt-4 text-blue-600 font-medium hover:underline"
          >
            View all PGs →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-slate-500">
          Built for Bangalore IT professionals • TechLifePortal (beta)
          <br />
          Data curated manually + with AI. Always verify details.
        </div>
      </footer>
    </main>
  );
}
