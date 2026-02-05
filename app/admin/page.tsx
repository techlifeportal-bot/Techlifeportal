"use client";

import AdminGuard from "./AdminGuard";

export default function AdminPage() {
  return (
    <AdminGuard>
      <main className="admin-page">
        <header className="admin-header">
          <h1>TechLifePortal Admin Panel</h1>
          <p>Manual control center (PG enquiries + listings)</p>
        </header>

        <section style={{ marginTop: "30px" }}>
          <a
            href="/admin/enquiries"
            style={{
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            📩 View PG Enquiries Inbox
          </a>
        </section>
      </main>
    </AdminGuard>
  );
}
