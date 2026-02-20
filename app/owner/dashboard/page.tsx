"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function OwnerDashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/owner/login");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <main className="page-container">
      <h1>Owner Dashboard</h1>
      <p>You are logged in successfully.</p>
    </main>
  );
}