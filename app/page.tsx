export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="container">
        <h1>TechLifePortal</h1>
        <p style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          A lifestyle guide built for <b>Bangalore IT professionals</b>.
          Discover weekend spots and PGs near tech hubs — curated for tech
          life.
        </p>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(59,130,246,0.15)",
              color: "#3b82f6",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            🚀 Soft Launch · Bangalore IT Community
          </span>
        </div>

        {/* FEATURE CARDS */}
        <div className="feature-grid">
          <div className="card">
            <h2>🌴 Weekend Spots</h2>
            <p>
              Short trips, walks, food streets and hangout places IT employees
              usually visit after a busy work week.
            </p>
            <a className="feature-link" href="/weekend-spots">
              Explore weekend spots →
            </a>
          </div>

          <div className="card">
            <h2>🏠 PGs & Rentals</h2>
            <p>
              PGs and rental stays near Bangalore tech hubs — useful for
              freshers and working professionals.
            </p>
            <a className="feature-link" href="/pgs">
              View PGs & rentals →
            </a>
          </div>
        </div>

        {/* UPCOMING */}
        <div className="upcoming">
          <h3>🔒 More features coming soon</h3>
          <p>
            Cafés, Gyms, Nearby Companies, IT Jobs and AI Resume Builder will
            unlock gradually as the community grows.
          </p>
        </div>

        {/* FOOTER */}
        <div className="footer">
          Built for Bangalore IT professionals · Community-first ·
          TechLifePortal (Beta)
        </div>
      </section>
    </main>
  );
}
