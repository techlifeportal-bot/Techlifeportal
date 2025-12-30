"use client";

import { useState } from "react";
import Link from "next/link";
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

          <p className="hub-note">
            Personalized hub-based results will unlock as the community grows.
          </p>
        </div>
      </section>

      {/* FEATURES */}
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
          <span className="badge">
            Unlocks gradually as community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>🏋️ Gyms</h2>
          <span className="badge">
            Unlocks gradually as community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>🏢 Companies</h2>
          <span className="badge">
            Unlocks gradually as community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>💼 IT Jobs</h2>
          <span className="badge">
            Unlocks gradually as community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>🤖 AI Resume Builder</h2>
          <span className="badge">
            Unlocks gradually as community grows
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        Built for Bangalore IT professionals · TechLifePortal (Beta)
      </footer>
    </main>
  );
}
