"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const IT_HUBS = [
  "Electronic City",
  "Whitefield",
  "Outer Ring Road",
  "Bellandur",
  "HSR Layout",
  "Manyata Tech Park",
];

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    const slug = selected.toLowerCase().replace(/\s+/g, "-");
    router.push(`/it-hubs/${slug}`);
  };

  return (
    <main className={inter.className}>
      {/* HERO */}
      <section className="hero">
        <h1>TechLifePortal</h1>
        <p>
          A lifestyle platform built for <strong>IT professionals</strong>.
          Discover places, stays, and work-life essentials around Bangalore —
          based on where you work.
        </p>

        {/* IT HUB SELECTOR */}
        <div className="hub-wrapper">
          <label>Your IT hub</label>

          <div
            className="hub-select"
            onClick={() => setOpen(!open)}
          >
            📍{" "}
            {selected
              ? selected
              : "Select your IT hub (e.g., Electronic City)"}
          </div>

          {open && (
            <div className="hub-dropdown">
              {IT_HUBS.map((hub) => (
                <div
                  key={hub}
                  className="hub-option"
                  onClick={() => {
                    setSelected(hub);
                    setOpen(false);
                  }}
                >
                  {hub}
                </div>
              ))}
            </div>
          )}

          <button
            className="hub-continue"
            onClick={handleContinue}
            disabled={!selected}
          >
            Continue →
          </button>

          <p className="hub-note">
            Personalized hub-based results will unlock as the community grows.
          </p>
        </div>
      </section>

      {/* FEATURES (RESTORED) */}
      <section className="feature-grid">
        <div className="feature-card">
          <h2>🌴 Weekend Spots</h2>
          <p>Relaxed places IT professionals visit after work.</p>
          <Link href="/weekend-spots">Explore weekend spots →</Link>
        </div>

        <div className="feature-card">
          <h2>🏠 PGs & Rentals</h2>
          <p>PGs and rentals near Bangalore tech hubs.</p>
          <Link href="/pgs">View PGs & rentals →</Link>
        </div>

        <div className="feature-card">
          <h2>☕ Cafes</h2>
          <p>Cafes around IT hubs for work, meetings, and breaks.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>🏋️ Gyms</h2>
          <p>Gyms and fitness centers near major tech corridors.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>🏢 Companies</h2>
          <p>IT companies and startups operating in nearby tech hubs.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>💼 IT Jobs</h2>
          <p>Job openings from companies located in IT hubs.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>

        <div className="feature-card">
          <h2>🤖 AI Resume Builder</h2>
          <p>Create ATS-friendly resumes tailored for IT jobs.</p>
          <span className="badge">Unlocks gradually as community grows</span>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <h2>About TechLifePortal</h2>
        <p>
          TechLifePortal is a Bangalore-focused lifestyle platform designed for
          IT professionals. It helps you discover cafes, stays, weekend spots,
          jobs, and companies around your IT hub — all in one place.
        </p>
        <p>
          We’re starting small and growing gradually with the community. As more
          users join, features unlock and hub-based personalization becomes
          smarter.
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        Built for Bangalore IT professionals · TechLifePortal (Beta)
      </footer>
    </main>
  );
}
