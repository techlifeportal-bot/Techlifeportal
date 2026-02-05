"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ---------------- TYPES ---------------- */

type Stay = {
  id: string;
  name: string;
  description: string | null;
  tag: string | null;
  maps_url: string | null;
  hub: string | null;
};

const normalizeHub = (hub: string) => hub.trim().toLowerCase();

/* ---------------- PAGE ---------------- */

export default function PGsPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedHub, setSelectedHub] = useState("all");

  const [activeTab, setActiveTab] = useState<"pg" | "rental">("pg");

  const [openDropdown, setOpenDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ---------------- ENQUIRY POPUP STATE ---------------- */

  const [showEnquiry, setShowEnquiry] = useState(false);
  const [selectedPG, setSelectedPG] = useState<Stay | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    moveIn: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    const fetchStays = async () => {
      setLoading(true);

      const { data } = await supabase
        .from("pgs_rentals")
        .select("id, name, description, tag, maps_url, hub")
        .order("priority", { ascending: false });

      setStays(data || []);
      setLoading(false);
    };

    fetchStays();
  }, []);

  /* ---------------- HUB LIST ---------------- */

  const hubs = Array.from(
    new Set(
      stays
        .map((s) => s.hub)
        .filter(Boolean)
        .map((h) => h!.trim())
    )
  );

  /* ---------------- FILTER PGs ONLY ---------------- */

  const filteredStays = stays.filter((stay) => {
    if (activeTab === "rental") return false;
    if (!stay.hub) return false;

    if (selectedHub === "all") return true;

    return normalizeHub(stay.hub) === normalizeHub(selectedHub);
  });

  /* ---------------- OPEN ENQUIRY POPUP ---------------- */

  const openEnquiryPopup = (pg: Stay) => {
    setSelectedPG(pg);
    setShowEnquiry(true);
    setSubmitted(false);

    setFormData({
      name: "",
      phone: "",
      moveIn: "",
      message: "",
    });
  };

  /* ---------------- SUBMIT DEMO ENQUIRY ---------------- */

 const handleSubmit = async () => {
  if (!selectedPG) return;

  // Insert enquiry into demo table
  const { error } = await supabase.from("pg_enquiries_demo").insert([
    {
      pg_id: selectedPG.id,
      pg_name: selectedPG.name,

      user_name: formData.name,
      phone: formData.phone,
      move_in: formData.moveIn,
      message: formData.message,
    },
  ]);

  if (error) {
    alert("Something went wrong. Try again.");
    console.error(error);
    return;
  }

  setSubmitted(true);

  setTimeout(() => {
    setShowEnquiry(false);
  }, 1800);
};


  /* ---------------- UI ---------------- */

  return (
    <main className="page-container">
      {/* HEADER */}
      <header className="page-header">
        <h1>PGs & Rentals</h1>
        <p>Find stays near your IT hub.</p>

        {/* TABS */}
        <div className="type-tabs">
          <button
            className={`type-tab ${activeTab === "pg" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("pg");
              setSelectedHub("all");
            }}
          >
            PGs
          </button>

          <button
            className="type-tab disabled"
            title="Coming soon"
            onClick={() => setActiveTab("rental")}
          >
            Rentals (Coming soon)
          </button>
        </div>

        {/* DROPDOWN */}
        <div className="dropdown">
          <label>Select IT hub</label>

          <button
            className="dropdown-trigger"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            {selectedHub === "all" ? "All hubs" : selectedHub}
            <span className="arrow">▾</span>
          </button>

          {openDropdown && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => {
                  setSelectedHub("all");
                  setOpenDropdown(false);
                }}
              >
                All hubs
              </div>

              {hubs.map((hub) => (
                <div
                  key={hub}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedHub(hub);
                    setOpenDropdown(false);
                  }}
                >
                  {hub}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* RENTALS COMING SOON */}
      {activeTab === "rental" && (
        <p className="empty-state">Rentals are coming soon 🚧</p>
      )}

      {/* EMPTY */}
      {activeTab === "pg" && !loading && filteredStays.length === 0 && (
        <p className="empty-state">No PGs found.</p>
      )}

      {/* PG CARDS */}
      {activeTab === "pg" && !loading && filteredStays.length > 0 && (
        <section className="card-grid">
          {filteredStays.map((stay) => (
            <div key={stay.id} className="card pg-card">
              {stay.tag && <span className="pg-tag">{stay.tag}</span>}

              <h3 className="pg-title">{stay.name}</h3>

              {stay.hub && <p className="pg-hub">📍 {stay.hub}</p>}

              {stay.description && (
                <p className="pg-desc">{stay.description}</p>
              )}

              {/* CONTACT BUTTON */}
              <button
                className="enquiry-btn"
                onClick={() => openEnquiryPopup(stay)}
              >
                Contact via TechLifePortal
              </button>

              {stay.maps_url && (
                <a
                  href={stay.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  View on Google Maps →
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ENQUIRY POPUP MODAL */}
      {showEnquiry && selectedPG && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Enquiry for {selectedPG.name}</h2>

            {submitted ? (
              <p className="success-msg">✅ Enquiry submitted!</p>
            ) : (
              <>
                <input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <input
                  type="date"
                  value={formData.moveIn}
                  onChange={(e) =>
                    setFormData({ ...formData, moveIn: e.target.value })
                  }
                />

                <textarea
                  placeholder="Message (optional)"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />

                <div className="modal-actions">
                  <button className="btn-secondary" onClick={() => setShowEnquiry(false)}>
                    Cancel
                  </button>

                  <button className="btn-primary" onClick={handleSubmit}>
                    Submit Enquiry
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
