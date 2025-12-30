import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section>
        <h1>TechLifePortal</h1>
        <p>
          A lifestyle platform built for <strong>IT professionals</strong>.
          Helping you navigate work-life essentials around Bangalore — calmly,
          practically, and with trust.
        </p>
      </section>

      {/* FEATURES */}
      <section className="feature-grid">
        {/* Weekend Spots */}
        <div className="feature-card">
          <h2>🌴 Weekend Spots</h2>
          <p>
            Short trips, food streets, walks, and hangout places IT professionals
            usually visit after a busy work week.
          </p>
          <Link href="/weekend-spots">Explore weekend spots →</Link>
        </div>

        {/* PGs */}
        <div className="feature-card">
          <h2>🏠 PGs & Rentals</h2>
          <p>
            PGs and rental stays near Bangalore tech hubs — useful for freshers
            and working professionals.
          </p>
          <Link href="/pgs">View PGs & rentals →</Link>
        </div>

        {/* Cafes */}
        <div className="feature-card">
          <h2>☕ Cafes</h2>
          <p>Work-friendly cafes near IT parks and tech hubs.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        {/* Gyms */}
        <div className="feature-card">
          <h2>🏋️ Gyms</h2>
          <p>Fitness centers preferred by IT professionals.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        {/* Companies */}
        <div className="feature-card">
          <h2>🏢 Companies</h2>
          <p>Nearby tech companies and office locations.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        {/* Jobs */}
        <div className="feature-card">
          <h2>💼 IT Jobs</h2>
          <p>Curated IT job openings around Bangalore.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        {/* AI Resume */}
        <div className="feature-card">
          <h2>🤖 AI Resume Builder</h2>
          <p>Create resumes tailored for IT roles and companies.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>
      </section>

      {/* ABOUT */}
      <section>
        <h2>About TechLifePortal</h2>
        <p>
          TechLifePortal is built with a simple belief:{" "}
          <strong>
            IT professionals need practical, trustworthy information — not
            noise.
          </strong>
        </p>
        <p>
          Instead of trying to do everything at once, we start small and useful.
          Weekend spots and PGs solve real, everyday needs. As the community
          grows, we gradually unlock more features like cafes, gyms, companies,
          jobs, and AI-assisted tools.
        </p>
        <p>
          Every listing is curated, reviewed, and added with intent. No spam. No
          rush. Just value.
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        Built for Bangalore IT professionals · TechLifePortal (Beta)
      </footer>
    </main>
  );
}
