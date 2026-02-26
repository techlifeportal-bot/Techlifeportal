"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "techlifeportal@gmail.com";

type Listing = {
  id: string;
  name: string;
  hub: string | null;
  location: string | null;
  maps_url: string | null;
  images: string[] | null;
  status: string;
  verified: boolean;
  owner_id: string | null;
};

type Enquiry = {
  id: string;
  pg_name: string;
  user_name: string;
  phone: string;
  status: string;
  created_at: string;
};

export default function AdminPanel() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [pendingListings, setPendingListings] = useState<Listing[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  /* ---------------- ADMIN CHECK ---------------- */

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/admin-login");
        return;
      }

      if (data.user.email !== ADMIN_EMAIL) {
        router.push("/");
        return;
      }

      fetchData();
    };

    checkAdmin();
  }, []);

  /* ---------------- FETCH DATA ---------------- */

  const fetchData = async () => {
    setLoading(true);

    // Fetch pending listings from pgs_rentals
    const { data: listingData } = await supabase
      .from("pgs_rentals")
      .select("*")
      .eq("status", "pending")
      .eq("source", "owner")
      .order("created_at", { ascending: false });

    // Fetch enquiries
    const { data: enqData } = await supabase
      .from("pg_enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    setPendingListings(listingData || []);
    setEnquiries(enqData || []);
    setLoading(false);
  };

  /* ---------------- APPROVE LISTING ---------------- */

  const approveListing = async (id: string) => {
    await supabase
      .from("pgs_rentals")
      .update({
        status: "active",
        verified: true,
      })
      .eq("id", id);

    fetchData();
  };

  /* ---------------- REJECT LISTING ---------------- */

  const rejectListing = async (id: string) => {
    await supabase
      .from("pgs_rentals")
      .update({
        status: "rejected",
      })
      .eq("id", id);

    fetchData();
  };

  /* ---------------- UI ---------------- */

  return (
    <main style={{ padding: 50, color: "white" }}>
      <h1 style={{ fontSize: 28 }}>Admin Panel</h1>

      {loading && <p>Loading...</p>}

      {/* ---------------- PENDING LISTINGS ---------------- */}

      <h2 style={{ marginTop: 40 }}>Pending PG Listings</h2>

      {pendingListings.length === 0 && (
        <p style={{ marginTop: 20 }}>No pending listings.</p>
      )}

      {pendingListings.map((listing) => (
        <div
          key={listing.id}
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 16,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            maxWidth: 700,
          }}
        >
          <h3>{listing.name}</h3>
          <p>Hub: {listing.hub}</p>
          <p>Location: {listing.location}</p>

          {/* ---- IMAGE PREVIEW ---- */}
          {listing.images && listing.images.length > 0 && (
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {listing.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="pg"
                  width={120}
                  height={90}
                  style={{
                    objectFit: "cover",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          )}

          <div style={{ marginTop: 15 }}>
            <button
              onClick={() => approveListing(listing.id)}
              style={{
                marginRight: 10,
                padding: "8px 16px",
                borderRadius: 8,
                background: "white",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Approve & Verify
            </button>

            <button
              onClick={() => rejectListing(listing.id)}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(239,68,68,0.9)",
                color: "white",
              }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      {/* ---------------- ENQUIRIES ---------------- */}

      <h2 style={{ marginTop: 60 }}>Tenant Enquiries</h2>

      {enquiries.map((enq) => (
        <div
          key={enq.id}
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 16,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            maxWidth: 600,
          }}
        >
          <h3>{enq.pg_name}</h3>
          <p>Name: {enq.user_name}</p>
          <p>Phone: {enq.phone}</p>
          <p>Status: {enq.status}</p>
        </div>
      ))}
    </main>
  );
}