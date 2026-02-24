"use client";

import { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import FeedbackBox from "@/app/components/FeedbackBox";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function HomePage() {
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  const handleComingSoonClick = (hub: string) => {
    setSelectedHub(hub);
  };

  return (
    <main className={inter.className}>
      {/* HERO SECTION */}
      <section className="hero">
        <h1>TechLifePortal</h1>

        <p className="tagline">
          Built for Bangalore IT Professionals
        </p>

        <p className="hero-description">
          A lifestyle platform designed exclusively for IT professionals.
          Discover PGs, rentals, and weekend spots around Bangalore —
          all curated with IT life in mind.
        </p>

        {/* OWNER CTA */}
        <div style={{ marginTop: 30 }}>
          <Link href="/owner/login" className="owner-cta">
            List Your PG – Free →
          </Link>
        </div>
      </section>

      {/* HUB ROLLOUT SECTION */}
      <section style={{ textAlign: "center", margin: "60px 0" }}>
        <h2>Currently Serving</h2>

        <div style={{ marginTop: 20 }}>
          <span className="active-hub">Electronic City ✅</span>
        </div>

        <h3 style={{ marginTop: 40 }}>Launching Soon</h3>

        <div className="coming-soon-grid">
          <button onClick={() => handleComingSoonClick("Manyata Tech Park")}>
            Manyata Tech Park 🚀
          </button>

          <button onClick={() => handleComingSoonClick("Whitefield")}>
            Whitefield 🚀
          </button>

          <button onClick={() => handleComingSoonClick("HSR Layout")}>
            HSR Layout 🚀
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="feature-grid">
        <div className="feature-card">
          <h2>🌴 Weekend Spots</h2>
          <p>
            Handpicked weekend destinations where IT professionals
            relax, travel, and recharge after a busy work week.
          </p>
          <Link href="/weekend-spots">
            Explore weekend spots →
          </Link>
        </div>

        <div className="feature-card">
          <h2>🏠 PGs & Rentals</h2>
          <p>
            Find PGs and rental stays near Bangalore IT hubs,
            curated specifically for working professionals.
          </p>
          <Link href="/pgs">
            View PGs & rentals →
          </Link>
        </div>

        {/* Other feature cards unchanged */}
      </section>

      <FeedbackBox />

      {/* COMING SOON MODAL */}
      {selectedHub && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedHub} – Launching Soon</h3>
            <p>
              We are onboarding PGs in this hub.
              Want to be notified when it goes live?
            </p>

            <input placeholder="Enter your email" />

            <button style={{ marginTop: 10 }}>
              Notify Me
            </button>

            <button
              onClick={() => setSelectedHub(null)}
              style={{ marginTop: 15, background: "transparent" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ABOUT SECTION */}
      <section className="about-section">
        <h2>About TechLifePortal</h2>

        <p>
          TechLifePortal is a Bangalore-focused platform built exclusively for IT
          professionals.
        </p>

        <p className="about-footer">
          Built with ❤️ for the IT community in Bangalore.
        </p>
      </section>

      <footer>
        © 2026 TechLifePortal. All rights reserved.
      </footer>
    </main>
  );
}