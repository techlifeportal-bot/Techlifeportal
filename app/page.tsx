export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            TechLifePortal
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A lifestyle guide built <strong>for Bangalore IT professionals</strong>.
            Discover weekend spots and PGs near tech hubs — curated for tech life.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-700">
            🚀 Soft Launch • Bangalore IT Community
          </div>
        </div>
      </section>

      {/* PRIMARY FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Weekend Spots */}
          <div className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              🌴 Weekend Spots
            </h2>
            <p className="text-slate-600 mb-4">
              Short trips, walks, food streets and hangout places IT employees
              usually visit after a busy work week.
            </p>
            <a
              href="/weekend-spots"
              className="inline-block text-blue-600 font-medium hover:underline"
            >
              Explore weekend spots →
            </a>
          </div>

          {/* PGs */}
          <div className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              🏠 PGs & Rentals
            </h2>
            <p className="text-slate-600 mb-4">
              PGs and rental stays near Bangalore tech hubs —
              useful for freshers and working professionals.
            </p>
            <a
              href="/pgs"
              className="inline-block text-blue-600 font-medium hover:underline"
            >
              View PGs & rentals →
            </a>
          </div>

        </div>
      </section>

      {/* COMING SOON */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-2xl bg-slate-50 border border-dashed border-slate-300 p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">
            More features coming soon
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto">
            AI Resume Builder, Cafés, Gyms, Nearby Companies and IT Jobs will be
            unlocked gradually as the community grows.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        Made with ❤️ in Bangalore • TechLifePortal (Beta)
      </footer>
    </main>
  );
}
