import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white font-[Inter]">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
          TechLifePortal
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
          A lifestyle guide built for{" "}
          <span className="text-blue-400 font-medium">
            Bangalore IT professionals
          </span>
          . Discover weekend spots and PGs near tech hubs — curated for tech
          life.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-5 py-2 text-sm text-blue-400 border border-blue-500/20">
          🚀 Soft Launch · Bangalore IT Community
        </div>
      </section>

      {/* MAIN CARDS */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 pb-20">
        {/* WEEKEND SPOTS */}
        <Link
          href="/weekend-spots"
          className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300
                     hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            🌴 Weekend Spots
          </h2>

          <p className="mt-3 text-slate-300">
            Short trips, walks, food streets and hangout places IT employees
            usually visit after a busy work week.
          </p>

          <span className="mt-6 inline-block text-blue-400 font-medium">
            Explore weekend spots →
          </span>
        </Link>

        {/* PGs */}
        <Link
          href="/pgs"
          className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300
                     hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            🏠 PGs & Rentals
          </h2>

          <p className="mt-3 text-slate-300">
            PGs and rental stays near Bangalore tech hubs — useful for freshers
            and working professionals.
          </p>

          <span className="mt-6 inline-block text-blue-400 font-medium">
            View PGs & rentals →
          </span>
        </Link>
      </section>

      {/* UPCOMING FEATURES */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
          <h3 className="text-xl font-semibold mb-4">
            🔒 More features coming soon
          </h3>

          <p className="text-slate-300">
            Cafés, Gyms, Nearby Companies and IT Jobs will unlock gradually as
            the community grows.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            {[
              "☕ Cafés",
              "🏋️ Gyms",
              "🏢 Companies",
              "💼 IT Jobs",
              "🧠 AI Resume Builder",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/10 px-4 py-2 text-slate-300 border border-white/10"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-t border-white/10 py-10 text-center text-sm text-slate-400">
        Built for Bangalore IT professionals · Community-first · TechLifePortal
        (Beta)
      </section>
    </main>
  );
}
