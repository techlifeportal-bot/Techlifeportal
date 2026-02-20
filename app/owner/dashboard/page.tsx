"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function OwnerDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [pgName, setPgName] = useState("");
  const [hub, setHub] = useState("");
  const [location, setLocation] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initialize = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        router.push("/owner/login");
        return;
      }

      const userId = sessionData.session.user.id;

      const { data: ownerData } = await supabase
        .from("pg_owners")
        .select("name, phone")
        .eq("id", userId)
        .single();

      if (ownerData?.name && ownerData?.phone) {
        setName(ownerData.name);
        setPhone(ownerData.phone);
        setProfileComplete(true);
      }

      setLoading(false);
    };

    initialize();
  }, [router]);

  const handleProfileSave = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;

    if (!userId) return;

    await supabase.from("pg_owners").upsert(
      {
        id: userId,
        name,
        phone,
      },
      { onConflict: "id" }
    );

    setProfileComplete(true);
  };

  const handleListingSubmit = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;

    if (!userId) return;

    const { error } = await supabase.from("pgs_rentals").insert([
      {
        pg_name: pgName,
        hub,
        location,
        maps_url: mapsUrl,
        owner_name: name,
        owner_phone: phone,
        owner_id: userId,
        status: "pending",
      },
    ]);

    if (error) {
      setMessage("❌ Failed to submit listing.");
    } else {
      setMessage("✅ Listing submitted. Awaiting approval.");
      setPgName("");
      setHub("");
      setLocation("");
      setMapsUrl("");
    }
  };

  if (loading) {
    return (
      <main className="page-container">
        <p>Loading...</p>
      </main>
    );
  }

  if (!profileComplete) {
    return (
      <main className="page-container">
        <h1>Complete Your Profile</h1>

        <section className="card" style={{ maxWidth: 400 }}>
          <label>Your Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />

          <label>Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="WhatsApp number"
          />

          <button
            onClick={handleProfileSave}
            disabled={!name || !phone}
            className="approve-btn"
            style={{ marginTop: 16 }}
          >
            Save Profile
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-container">
      <h1>Owner Dashboard</h1>

      <section className="card" style={{ maxWidth: 500 }}>
        <h3>Add New PG Listing</h3>

        <label>PG Name</label>
        <input
          value={pgName}
          onChange={(e) => setPgName(e.target.value)}
        />

        <label>IT Hub</label>
        <input
          value={hub}
          onChange={(e) => setHub(e.target.value)}
        />

        <label>Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Google Maps URL</label>
        <input
          value={mapsUrl}
          onChange={(e) => setMapsUrl(e.target.value)}
        />

        <button
          onClick={handleListingSubmit}
          disabled={!pgName || !hub || !location}
          className="approve-btn"
          style={{ marginTop: 16 }}
        >
          Submit Listing
        </button>

        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </section>
    </main>
  );
}