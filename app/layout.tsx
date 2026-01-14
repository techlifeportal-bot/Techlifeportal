import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/app/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "TechLifePortal – Built for Bangalore IT Professionals",
  description:
    "TechLifePortal helps Bangalore IT professionals discover weekend spots, PGs, rentals, and lifestyle essentials around their workplace.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <img
            src="/logo.svg"
            alt="TechLifePortal logo"
            width={36}
            height={36}
          />

          <span
            style={{
              fontSize: "1.4rem",
              fontWeight: 600,
              letterSpacing: "0.3px",
            }}
          >
            TechLifePortal
          </span>
        </header>

        {/* Page content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
