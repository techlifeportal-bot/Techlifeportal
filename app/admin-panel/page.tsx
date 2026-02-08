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

    if (error) {
      console.log("Fetch error:", error);
    }

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
    <main style={{ padding: 40 }}>
      <h1>✅ Admin Panel — Enquiries</h1>
      <p>Manage tenant enquiries</p>

      <hr style={{ margin: "20px 0" }} />

      {loading && <p>Loading enquiries...</p>}

      {!loading && enquiries.length === 0 && (
        <p>No enquiries yet.</p>
      )}

      {!loading &&
        enquiries.map((enq) => (
          <div
            key={enq.id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
              background:
                enq.status === "contacted"
                  ? "#f0fdf4"
                  : "white",
            }}
          >
            <h3>{enq.pg_name}</h3>

            <p>
              <strong>Name:</strong> {enq.user_name}
            </p>

            <p>
              <strong>Phone:</strong> {enq.phone}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span style={{ fontWeight: "bold" }}>
                {enq.status}
              </span>
            </p>

            {enq.status !== "contacted" && (
              <button
                onClick={() => markContacted(enq.id)}
                style={{
                  marginTop: 10,
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: "black",
                  color: "white",
                }}
              >
                Mark as Contacted
              </button>
            )}

            <p style={{ fontSize: 12, opacity: 0.6 }}>
              Submitted:{" "}
              {new Date(enq.created_at).toLocaleString()}
            </p>
          </div>
        ))}
    </main>
  );
}
