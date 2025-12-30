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

      {/* FEATURES */}
      <section className="feature-grid">
        {/* (unchanged – keeping it clean) */}
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
