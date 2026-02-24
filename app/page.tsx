"use client";

import Link from "next/link";
import { Inter } from "next/font/google";
import FeedbackBox from "@/app/components/FeedbackBox";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function HomePage() {
  return (
    <main className={inter.className}>
      {/* TOP BAR */}
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px 40px",
        }}
      >
        <Link
          href="/owner/login"
          style={{
            padding: "8px 18px",
            backgroundColor: "#111",
            color: "#fff",
            borderRadius: 8,
            fontWeight: 500,
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          List Your PG
        </Link>
      </header>

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

        <div className="feature-card">
          <h2>☕ Cafes</h2>
          <p>
            Cafes near IT hubs — perfect for quick breaks,
            casual meetings, or working remotely.
          </p>
          <span className="badge">
            Unlocks as the community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>🏋️ Gyms</h2>
          <p>
            Gyms and fitness centers around IT hubs to help
            maintain a healthy work-life balance.
          </p>
          <span className="badge">
            Unlocks as the community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>🏢 Companies</h2>
          <p>
            Explore IT companies across Bangalore with
            insights into work culture and locations.
          </p>
          <span className="badge">
            Unlocks as the community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>💼 IT Jobs</h2>
          <p>
            Discover IT job opportunities aligned with
            Bangalore’s tech ecosystem.
          </p>
          <span className="badge">
            Unlocks as the community grows
          </span>
        </div>

        <div className="feature-card">
          <h2>🤖 AI Resume Builder</h2>
          <p>
            Build resumes tailored for IT roles using
            smart AI assistance.
          </p>
          <span className="badge">
            Unlocks as the community grows
          </span>
        </div>
      </section>

      <FeedbackBox />

      {/* MINIMAL ABOUT */}
      <section className="about-section" style={{ textAlign: "center" }}>
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