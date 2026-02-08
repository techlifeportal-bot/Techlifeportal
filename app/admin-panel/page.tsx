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

export default function AdminPanel() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  // ✅ Protect Admin
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

      fetchEnquiries();
    };

    checkAdmin();
  }, []);

  // ✅ Fetch Enquiries
  const fetchEnquiries = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("pg_enquiries_demo")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.log("Fetch error:", error);

    setEnquiries(data || []);
    setLoading(false);
  };

  // ✅ Mark Contacted
  const markContacted = async (id: string) => {
    await supabase
      .from("pg_enquiries_demo")
      .update({ status: "contacted" })
      .eq("id", id);

    fetchEnquiries();
  };

  return (
    <main
      style={{
        padding: "50px",
        minHeight: "100vh",
        background: "transparent",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Admin Panel — Enquiries
      </h1>

      <p style={{ opacity: 0.7 }}>
        Track tenant enquiries and mark them as contacted.
      </p>

      <hr style={{ margin: "25px 0", opacity: 0.2 }} />

      {loading && <p>Loading enquiries...</p>}

      {!loading && enquiries.length === 0 && (
        <p>No enquiries yet.</p>
      )}

      {!loading &&
        enquiries.map((enq) => (
          <div
            key={enq.id}
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "16px",
              background:
                enq.status === "contacted"
                  ? "rgba(34,197,94,0.15)"
                  : "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* PG NAME */}
            <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
              {enq.pg_name}
            </h2>

            {/* DETAILS */}
            <p style={{ marginTop: "8px", opacity: 0.9 }}>
              <strong>Name:</strong> {enq.user_name}
            </p>

            <p style={{ opacity: 0.9 }}>
              <strong>Phone:</strong> {enq.phone}
            </p>

            <p style={{ opacity: 0.9 }}>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color:
                    enq.status === "contacted"
                      ? "#22c55e"
                      : "#facc15",
                }}
              >
                {enq.status}
              </span>
            </p>

            {/* BUTTON */}
            {enq.status !== "contacted" && (
              <button
                onClick={() => markContacted(enq.id)}
                style={{
                  marginTop: "12px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "white",
                  color: "black",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Mark as Contacted
              </button>
            )}

            {/* DATE */}
            <p style={{ marginTop: "10px", fontSize: "12px", opacity: 0.5 }}>
              Submitted: {new Date(enq.created_at).toLocaleString()}
            </p>
          </div>
        ))}
    </main>
  );
}
