import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "TechLifePortal – For Bangalore IT Professionals",
  description:
    "TechLifePortal helps Bangalore IT professionals discover weekend spots, PGs & rentals near tech hubs.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.svg"
            alt="TechLifePortal logo"
            width={72}
            height={72}
            priority
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          TechLifePortal
        </h1>

        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          A lifestyle guide built for{" "}
          <span className="text-blue-400 font-medium">
            Bangalore IT professionals
          </span>
          . Discover weekend spots and PGs near tech hubs — curated for tech
          life.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300 border border-blue-500/30">
          🚀 Soft Launch · Bangalore IT Community
        </div>
      </section>

      {/* PRIMARY FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid gap-6 md:grid-cols-2">
        {/* Weekend Spots */}
        <div className="rounded-2xl bg-slate-800/70 border border-slate-700 p-6 hover:border-blue-500/40 transition">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🌴 Weekend Spots
          </h2>
          <p className="mt-2 text-slate-300">
            Short trips, walks, food streets and hangout places IT employees
            usually visit after a busy work week.
          </p>
          <Link
            href="/weekend-spots"
            className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium"
          >
            Explore weekend spots →
          </Link>
        </div>

        {/* PGs */}
        <div className="rounded-2xl bg-slate-800/70 border border-slate-700 p-6 hover:border-blue-500/40 transition">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🏠 PGs & Rentals
          </h2>
          <p className="mt-2 text-slate-300">
            PGs and rental stays near Bangalore tech hubs — useful for freshers
            and working professionals.
          </p>
          <Link
            href="/pgs"
            className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium"
          >
            View PGs & rentals →
          </Link>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <div className="rounded-2xl border border-dashed border-slate-600 p-8 bg-slate-800/40">
          <h3 className="text-lg font-semibold">More features coming soon</h3>
          <p className="mt-2 text-slate-400">
            AI Resume Builder, Cafés, Gyms, Nearby Companies and IT Jobs will be
            unlocked gradually as the community grows.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-400">
        <p>
          Built for Bangalore IT employees · Powered by AI · TechLifePortal
          (beta)
        </p>
        <p className="mt-1">
          Founder: KB · Always verify details before making decisions
        </p>
      </footer>
    </main>
  );
}
