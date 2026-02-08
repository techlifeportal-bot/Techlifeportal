"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PGOwnerRegisterPage() {
  const [pgName, setPgName] = useState("");
  const [hub, setHub] = useState("");
  const [location, setLocation] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("pg_owner_requests").insert([
      {
        pg_name: pgName,
        hub,
        location,
        maps_url: mapsUrl,
        owner_name: ownerName,
        owner_phone: ownerPhone,
      },
    ]);

    if (error) {
      setMessage("❌ Something went wrong. Try again.");
    } else {
      setMessage("✅ Request submitted! We will verify and publish soon.");

      setPgName("");
      setHub("");
      setLocation("");
      setMapsUrl("");
      setOwnerName("");
      setOwnerPhone("");
    }

    setLoading(false);
  };

  return (
    <main className="page-container">
      <header className="page-header">
        <h1>Register Your PG (Free)</h1>
        <p>
          Submit your PG details. TechLifePortal will verify and publish it.
        </p>
      </header>

      <section className="card pg-card" style={{ maxWidth: 500 }}>
        <label>PG Name *</label>
        <input
          value={pgName}
          onChange={(e) => setPgName(e.target.value)}
          placeholder="Example: Ojas PG"
        />

        <label>IT Hub *</label>
        <input
          value={hub}
          onChange={(e) => setHub(e.target.value)}
          placeholder="Example: Whitefield"
        />

        <label>Location *</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Area / Street"
        />

        <label>Google Maps Link</label>
        <input
          value={mapsUrl}
          onChange={(e) => setMapsUrl(e.target.value)}
          placeholder="https://maps.google.com/..."
        />

        <label>Owner Name</label>
        <input
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Your name"
        />

        <label>Owner Phone</label>
        <input
          value={ownerPhone}
          onChange={(e) => setOwnerPhone(e.target.value)}
          placeholder="WhatsApp number"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !pgName || !hub || !location}
          className="approve-btn"
          style={{ marginTop: 16 }}
        >
          {loading ? "Submitting..." : "Submit Free Listing"}
        </button>

        {message && (
          <p style={{ marginTop: 12, fontSize: 14 }}>{message}</p>
        )}
      </section>
    </main>
  );
}
