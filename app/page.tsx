import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-wrapper">
      {/* HERO */}
      <section className="hero">
        <h1>TechLifePortal</h1>
        <p>
          A lifestyle guide built for <strong>Bangalore IT professionals</strong>.
          Discover weekend spots and PGs near tech hubs — curated for tech life.
        </p>

        <span className="badge">
          🚀 Soft Launch · Bangalore IT Community
        </span>
      </section>

      {/* FEATURE CARDS */}
      <section className="feature-grid">
        {/* Weekend Spots */}
        <div className="card feature-card">
          <h2>🌴 Weekend Spots</h2>
          <p>
            Short trips, walks, food streets and hangout places IT employees
            usually visit after a busy work week.
          </p>
          <Link href="/weekend-spots">Explore weekend spots →</Link>
        </div>

        {/* PGs */}
        <div className="card feature-card">
          <h2>🏠 PGs & Rentals</h2>
          <p>
            PGs and rental stays near Bangalore tech hubs — useful for freshers
            and working professionals.
          </p>
          <Link href="/pgs">View PGs & rentals →</Link>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="upcoming">
        <h3>🔒 More features coming soon</h3>
        <p>
          Cafés, Gyms, Nearby Companies, IT Jobs and AI Resume Builder will unlock
          gradually as the community grows.
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        Built for Bangalore IT professionals · Community-first · TechLifePortal
        (Beta)
      </footer>
    </main>
  );
}
