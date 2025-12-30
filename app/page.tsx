export const metadata = {
  title: "TechLifePortal – For Bangalore IT Professionals",
  description:
    "TechLifePortal helps Bangalore IT professionals discover weekend spots and PG stays near major tech hubs. Simple, focused and built for tech life.",
};

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          TechLifePortal
        </h1>

        <p className="mt-3 text-lg text-slate-400">
          Built for Bangalore IT professionals
        </p>

        <p className="mt-6 max-w-2xl text-slate-300 leading-relaxed">
          A focused portal to discover weekend spots and PG stays around Bangalore
          tech hubs. No clutter. No noise. Just what IT professionals need.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/weekend-spots"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
          >
            Explore Weekend Spots
          </Link>

          <Link
            href="/pgs"
            className="px-6 py-3 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-900 transition"
          >
            Find PGs Near Office
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Soft launch • Focused on Bangalore IT lifestyle
        </p>
      </section>

      {/* FEATURE PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 pb-28 space-y-20">
        {/* WEEKEND SPOTS PREVIEW */}
        <div>
          <h2 className="text-2xl font-semibold">
            Weekend Spots
          </h2>
          <p className="mt-2 text-slate-400">
            Short getaways and hangout places preferred by IT professionals.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Nandi Hills Sunrise Ride",
                desc: "Quick early-morning escape before the city wakes up.",
              },
              {
                title: "JP Nagar Mini Forest",
                desc: "Calm walking trail for mental reset after a long week.",
              },
              {
                title: "Agara Lake Walk",
                desc: "Popular evening unwind spot near ORR tech offices.",
              },
            ].map((spot) => (
              <div
                key={spot.title}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition"
              >
                <h3 className="font-semibold text-slate-100">
                  {spot.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {spot.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/weekend-spots"
            className="inline-block mt-6 text-indigo-400 hover:underline"
          >
            View all weekend spots →
          </Link>
        </div>

        {/* PGs PREVIEW */}
        <div>
          <h2 className="text-2xl font-semibold">
            PGs & Rentals
          </h2>
          <p className="mt-2 text-slate-400">
            Stays near Bangalore tech parks, chosen for working professionals.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Men’s PG – Electronic City",
                desc: "Walkable distance to major tech offices.",
              },
              {
                title: "Coliving – Bellandur",
                desc: "Furnished stay with flexible terms.",
              },
              {
                title: "Budget PG – Whitefield",
                desc: "Popular among new IT joiners.",
              },
            ].map((pg) => (
              <div
                key={pg.title}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition"
              >
                <h3 className="font-semibold text-slate-100">
                  {pg.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {pg.desc}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/pgs"
            className="inline-block mt-6 text-indigo-400 hover:underline"
          >
            Explore PGs →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-500">
          Built exclusively for Bangalore IT professionals • TechLifePortal (beta)
        </div>
      </footer>
    </main>
  );
}
