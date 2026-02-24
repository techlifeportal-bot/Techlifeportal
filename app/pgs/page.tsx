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
  location: string | null;
  owner_id: string | null;
  status: string;
  type: string;
};

export default function PGsPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedHub, setSelectedHub] = useState("Electronic City");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedPG, setSelectedPG] = useState<Stay | null>(null);

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [moveIn, setMoveIn] = useState("");
  const [message, setMessage] = useState("");

  const [statusMessage, setStatusMessage] = useState("");

  /* ---------------- FETCH PG LISTINGS ---------------- */

  useEffect(() => {
    const fetchStays = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("pgs_rentals")
        .select(
          `
          id,
          name,
          description,
          tag,
          maps_url,
          hub,
          location,
          owner_id,
          status,
          type
        `
        )
        .eq("type", "pg")
        .eq("status", "active");

      if (error) {
        console.error(error);
      } else {
        setStays(data || []);
      }

      setLoading(false);
    };

    fetchStays();
  }, []);

  /* ---------------- HUB FILTER ---------------- */

  const hubs = [
    "Electronic City",
    "HSR Layout",
    "Manyata Tech Park",
    "Whitefield",
  ];

  const filteredStays = stays.filter(
    (stay) =>
      stay.hub &&
      stay.hub.toLowerCase() === selectedHub.toLowerCase()
  );

  /* ---------------- SUBMIT ENQUIRY ---------------- */

  const handleEnquirySubmit = async () => {
    if (!selectedPG) return;

    const { error } = await supabase.from("pg_enquiries").insert([
      {
        pg_id: selectedPG.id,
        owner_id: selectedPG.owner_id,
        pg_name: selectedPG.name,
        user_name: userName,
        phone: phone,
        move_in: moveIn || null,
        message: message,
      },
    ]);

    if (error) {
      setStatusMessage("❌ Failed to submit enquiry.");
    } else {
      setStatusMessage("✅ Enquiry sent. Admin will review it.");
      setUserName("");
      setPhone("");
      setMoveIn("");
      setMessage("");
      setTimeout(() => {
        setShowForm(false);
        setStatusMessage("");
      }, 2000);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <main className="page-container">
      <header className="page-header">
        <h1>Verified PGs Near IT Hubs</h1>

        <div className="filter-box">
          <label>Select IT Hub</label>
          <select
            value={selectedHub}
            onChange={(e) => {
              const hub = e.target.value;
              if (hub !== "Electronic City") {
                alert("Launching Soon in this hub 🚀");
              }
              setSelectedHub(hub);
            }}
          >
            {hubs.map((hub) => (
              <option key={hub} value={hub}>
                {hub}
              </option>
            ))}
          </select>
        </div>
      </header>

      {loading && <p>Loading...</p>}

      {!loading && filteredStays.length === 0 && (
        <p>No PGs available in this hub.</p>
      )}

      {!loading && filteredStays.length > 0 && (
        <section className="card-grid">
          {filteredStays.map((stay) => (
            <div key={stay.id} className="card">
              <h3>{stay.name}</h3>
              {stay.location && <p>📍 {stay.location}</p>}
              {stay.description && <p>{stay.description}</p>}

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

              <button
                className="approve-btn"
                style={{ marginTop: 10 }}
                onClick={() => {
                  setSelectedPG(stay);
                  setShowForm(true);
                }}
              >
                Contact via TechLifePortal
              </button>
            </div>
          ))}
        </section>
      )}

      {/* ENQUIRY MODAL */}
      {showForm && selectedPG && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enquiry for {selectedPG.name}</h3>

            <input
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="date"
              value={moveIn}
              onChange={(e) => setMoveIn(e.target.value)}
            />

            <textarea
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={handleEnquirySubmit}
              disabled={!userName || !phone}
            >
              Submit Enquiry
            </button>

            <button
              style={{ marginTop: 10 }}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            {statusMessage && <p>{statusMessage}</p>}
          </div>
        </div>
      )}
    </main>
  );
}