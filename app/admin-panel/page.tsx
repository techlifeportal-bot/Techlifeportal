"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "techlifeportal@gmail.com";

type Enquiry = {
  id: string;
  pg_name: string;
  user_name: string;
  phone: string;
  move_in: string;
  message: string | null;
  status: string;
  created_at: string;
};

type OwnerRequest = {
  id: string;
  pg_name: string;
  hub: string;
  location: string;
  maps_url: string | null;
  owner_name: string | null;
  owner_phone: string | null;
  status: string;
  created_at: string;
};

export default function AdminPanel() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [requests, setRequests] = useState<OwnerRequest[]>([]);

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

  /* ---------------- FETCH BOTH ---------------- */

  const fetchData = async () => {
    setLoading(true);

    const { data: enqData } = await supabase
      .from("pg_enquiries_demo")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: reqData } = await supabase
      .from("pg_owner_requests")
      .select("*")
      .order("created_at", { ascending: false });

    setEnquiries(enqData || []);
    setRequests(reqData || []);
    setLoading(false);
  };

  /* ---------------- MARK CONTACTED ---------------- */

  const markContacted = async (id: string) => {
    await supabase
      .from("pg_enquiries_demo")
      .update({ status: "contacted" })
      .eq("id", id);

    fetchData();
  };

  /* ---------------- APPROVE OWNER REQUEST ---------------- */

  const approveRequest = async (request: OwnerRequest) => {
    // Insert into pgs_rentals
    await supabase.from("pgs_rentals").insert([
      {
        name: request.pg_name,
        hub: request.hub,
        location: request.location,
        maps_url: request.maps_url,
        description: "Verified listing via TechLifePortal",
        type: "pg",
        status: "active",
        priority: 0,
      },
    ]);

    // Mark request as approved
    await supabase
      .from("pg_owner_requests")
      .update({ status: "approved" })
      .eq("id", request.id);

    fetchData();
  };

  /* ---------------- UI ---------------- */

  return (
    <main style={{ padding: 50, color: "white" }}>
      <h1 style={{ fontSize: 30 }}>Admin Panel</h1>

      {loading && <p>Loading...</p>}

      {/* ================= OWNER REQUESTS ================= */}
      <h2 style={{ marginTop: 40 }}>PG Owner Requests</h2>

      {requests
        .filter((r) => r.status !== "approved")
        .map((r) => (
          <div
            key={r.id}
            style={{
              marginTop: 20,
              padding: 20,
              borderRadius: 16,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <h3>{r.pg_name}</h3>
            <p>Hub: {r.hub}</p>
            <p>Location: {r.location}</p>
            <p>Owner: {r.owner_name}</p>
            <p>Phone: {r.owner_phone}</p>

            <button
              onClick={() => approveRequest(r)}
              style={{
                marginTop: 10,
                padding: "8px 16px",
                borderRadius: 8,
                background: "white",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Approve & Publish
            </button>
          </div>
        ))}

      {/* ================= ENQUIRIES ================= */}
      <h2 style={{ marginTop: 60 }}>Tenant Enquiries</h2>

      {enquiries.map((enq) => (
        <div
          key={enq.id}
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 16,
            background:
              enq.status === "contacted"
                ? "rgba(34,197,94,0.15)"
                : "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <h3>{enq.pg_name}</h3>
          <p>Name: {enq.user_name}</p>
          <p>Phone: {enq.phone}</p>
          <p>Status: {enq.status}</p>

          {enq.status !== "contacted" && (
            <button
              onClick={() => markContacted(enq.id)}
              style={{
                marginTop: 10,
                padding: "8px 16px",
                borderRadius: 8,
                background: "white",
                color: "black",
              }}
            >
              Mark Contacted
            </button>
          )}
        </div>
      ))}
    </main>
  );
}