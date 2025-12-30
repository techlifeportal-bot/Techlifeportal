import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function HomePage() {
  return (
    <main
      className={inter.className}
      style={{
        background:
          "radial-gradient(1200px 600px at top, rgba(59,130,246,0.12), transparent 60%)",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          paddingTop: "3.5rem",
          paddingBottom: "1.5rem",
        }}
      >
        <h1>TechLifePortal</h1>
        <p style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
          A lifestyle platform built for <strong>IT professionals</strong>.
          Discover places, stays, and work-life essentials around Bangalore —
          based on where you work.
        </p>
      </section>

      {/* IT HUB SEARCH (UI ONLY) */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          paddingBottom: "2.5rem",
        }}
      >
        <label
          style={{
            fontSize: "0.9rem",
            opacity: 0.85,
            display: "block",
            marginBottom: "0.4rem",
          }}
        >
          Your IT hub
        </label>

        <div
          style={{
            position: "relative",
            maxWidth: "420px",
          }}
        >
          {/* Fake input */}
          <div
            style={{
              padding: "0.7rem 0.9rem",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.04)",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            📍 Select your IT hub (e.g., Electronic City)
          </div>

          {/* Dropdown (static UI) */}
          <div
            style={{
              marginTop: "0.4rem",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(10,15,30,0.95)",
              padding: "0.3rem 0",
              maxWidth: "420px",
            }}
          >
            {[
              "Electronic City",
              "Whitefield",
              "Outer Ring Road",
              "Bellandur",
              "HSR Layout",
              "Manyata Tech Park",
            ].map((hub) => (
              <div
                key={hub}
                style={{
                  padding: "0.55rem 0.9rem",
                  fontSize: "0.85rem",
                  opacity: 0.9,
                }}
              >
                {hub}
              </div>
            ))}
          </div>
        </div>

        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.8rem",
            opacity: 0.6,
          }}
        >
          Personalized hub-based results will unlock as the community grows.
        </p>
      </section>

      {/* FEATURES */}
      <section className="feature-grid">
        <div className="feature-card">
          <h2>🌴 Weekend Spots</h2>
          <p>
            Short trips, food streets, walks, and hangout places IT professionals
            usually visit after a busy work week.
          </p>
          <Link href="/weekend-spots">Explore weekend spots →</Link>
        </div>

        <div className="feature-card">
          <h2>🏠 PGs & Rentals</h2>
          <p>
            PGs and rental stays near Bangalore tech hubs — useful for freshers
            and working professionals.
          </p>
          <Link href="/pgs">View PGs & rentals →</Link>
        </div>

        <div className="feature-card">
          <h2>☕ Cafes</h2>
          <p>Work-friendly cafes near IT parks and tech hubs.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>🏋️ Gyms</h2>
          <p>Fitness centers preferred by IT professionals.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>🏢 Companies</h2>
          <p>Nearby tech companies and office locations.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>💼 IT Jobs</h2>
          <p>Curated IT job openings around Bangalore.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>🤖 AI Resume Builder</h2>
          <p>Create resumes tailored for IT roles and companies.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2>About TechLifePortal</h2>
        <p>
          TechLifePortal is built with a simple belief:{" "}
          <strong>
            IT professionals need practical, trustworthy information — not
            noise.
          </strong>
        </p>
        <p>
          We organize everyday needs around where you work. As the community
          grows, we’ll unlock smarter, hub-based discovery — without rushing or
          compromising quality.
        </p>
      </section>

      <footer style={{ marginTop: "4rem" }}>
        Built for Bangalore IT professionals · TechLifePortal (Beta)
      </footer>
    </main>
  );
}
