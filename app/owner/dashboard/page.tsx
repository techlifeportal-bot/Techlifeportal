"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function OwnerDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [planType, setPlanType] = useState("free");

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
        .select("plan_type")
        .eq("id", data.session.user.id)
        .single();

      if (ownerData?.plan_type) {
        setPlanType(ownerData.plan_type);
      }

      setLoading(false);
    };

    init();
  }, [router]);

  const handleListingSubmit = async () => {
    console.log("SESSION USER ID:", sessionUser?.id);

    if (!sessionUser) {
      setMessage("Not authenticated.");
      return;
    }

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
      setMessage(error.message);
      return;
    }

    setMessage("✅ Listing submitted.");
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

  return (
    <main className="page-container">
      <h1>Owner Dashboard</h1>
      <p>Plan: {planType.toUpperCase()}</p>

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