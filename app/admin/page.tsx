"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Enquiry = {
  id: string;
  pg_name: string;
  user_name: string;
  phone: string;
  move_in: string;
  message: string | null;
  created_at: string;
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  /* FETCH ENQUIRIES */
  const fetchEnquiries = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("pg_enquiries_demo")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error fetching enquiries:", error);
    }

    setEnquiries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <main className="admin-page">
      <header className="admin-header">
        <h1>Admin — PG Enquiries Inbox</h1>
        <p>All tenant enquiries submitted via TechLifePortal</p>
      </header>

      {loading && <p>Loading enquiries...</p>}

      {!loading && enquiries.length === 0 && (
        <p>No enquiries yet.</p>
      )}

      <section className="admin-grid">
        {enquiries.map((enq) => (
          <div key={enq.id} className="admin-card">
            <h3>{enq.pg_name}</h3>

            <p>
              <strong>Name:</strong> {enq.user_name}
            </p>

            <p>
              <strong>Phone:</strong> {enq.phone}
            </p>

            <p>
              <strong>Move-in Date:</strong>{" "}
              {enq.move_in || "Not provided"}
            </p>

            {enq.message && (
              <p>
                <strong>Message:</strong> {enq.message}
              </p>
            )}

            <p className="admin-time">
              Submitted:{" "}
              {new Date(enq.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
