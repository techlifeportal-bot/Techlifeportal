"use client";
import AdminGuard from "./AdminGuard";
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
  <AdminGuard>
    <main className="admin-page">
      ...
    </main>
  </AdminGuard>
);

}
