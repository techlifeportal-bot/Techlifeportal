"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function OwnerDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState<any>(null);

  const [profileComplete, setProfileComplete] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [pgName, setPgName] = useState("");
  const [hub, setHub] = useState("");
  const [location, setLocation] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/owner/login");
        return;
      }

      setSessionUser(data.session.user);

      const { data: ownerData } = await supabase
        .from("pg_owners")
        .select("name, phone")
        .eq("id", data.session.user.id)
        .single();

      if (ownerData?.name && ownerData?.phone) {
        setName(ownerData.name);
        setPhone(ownerData.phone);
        setProfileComplete(true);
      }

      setLoading(false);
    };

    init();
  }, [router]);

  const handleProfileSave = async () => {
    if (!sessionUser) {
      setMessage("No active session.");
      return;
    }

    const { error } = await supabase.from("pg_owners").upsert(
      {
        id: sessionUser.id,
        name,
        phone,
      },
      { onConflict: "id" }
    );

    if (error) {
      setMessage(error.message);
      return;
    }

    setProfileComplete(true);
    setMessage("Profile saved.");
  };

  const handleListingSubmit = async () => {
    if (!sessionUser) {
      setMessage("No authenticated user.");
      return;
    }

    console.log("AUTH USER:", sessionUser.id);

    const { error } = await supabase.from("pgs_rentals").insert([
      {
        name: pgName,
        hub,
        location,
        maps_url: mapsUrl || null,
        status: "pending",
        source: "owner",
        type: "pg",
        owner_id: sessionUser.id,
      },
    ]);

    if (error) {
      console.log("INSERT ERROR:", error);
      setMessage(error.message);
      return;
    }

    setMessage("Listing submitted.");
    setPgName("");
    setHub("");
    setLocation("");
    setMapsUrl("");
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
        <h1>Complete Profile</h1>

        <section className="card" style={{ maxWidth: 400 }}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />

          <button
            onClick={handleProfileSave}
            disabled={!name || !phone}
            className="approve-btn"
            style={{ marginTop: 16 }}
          >
            Save Profile
          </button>

          {message && <p style={{ marginTop: 12 }}>{message}</p>}
        </section>
      </main>
    );
  }

  return (
    <main className="page-container">
      <h1>Owner Dashboard</h1>

      <section className="card" style={{ maxWidth: 500 }}>
        <h3>Add PG Listing</h3>

        <label>Name</label>
        <input value={pgName} onChange={(e) => setPgName(e.target.value)} />

        <label>Hub</label>
        <input value={hub} onChange={(e) => setHub(e.target.value)} />

        <label>Location</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />

        <label>Maps URL</label>
        <input value={mapsUrl} onChange={(e) => setMapsUrl(e.target.value)} />

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