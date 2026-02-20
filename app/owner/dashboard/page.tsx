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

  useEffect(() => {
    const initialize = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        router.push("/owner/login");
        return;
      }

      const userId = sessionData.session.user.id;

      const { data: ownerData, error } = await supabase
        .from("pg_owners")
        .select("name, phone")
        .eq("id", userId)
        .single();

      if (error) {
        console.log("Fetch error:", error);
      }

      if (ownerData?.name && ownerData?.phone) {
        setName(ownerData.name);
        setPhone(ownerData.phone);
        setProfileComplete(true);
      }

      setLoading(false);
    };

    initialize();
  }, [router]);

  const handleSave = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;

    if (!userId) {
      console.log("No user ID found");
      return;
    }

    const { data, error } = await supabase
      .from("pg_owners")
      .upsert(
        {
          id: userId,
          name,
          phone,
        },
        { onConflict: "id" }
      )
      .select();

    console.log("Upsert result:", data);
    console.log("Upsert error:", error);

    if (!error) {
      setProfileComplete(true);
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
        <p>We need your basic details before continuing.</p>

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
            onClick={handleSave}
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
      <p>Profile saved successfully.</p>
      <p>Listing management coming next.</p>
    </main>
  );
}