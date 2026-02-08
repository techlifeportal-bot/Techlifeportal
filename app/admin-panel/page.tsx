"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "techlifeportal@gmail.com";

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/admin-login");
        return;
      }

      if (data.user.email !== ADMIN_EMAIL) {
        router.push("/");
        return;
      }

      setLoading(false);
    };

    check();
  }, []);

  if (loading) return <p>Checking admin access...</p>;

  return (
    <main style={{ padding: 40 }}>
      <h1>✅ Admin Panel Working</h1>
      <p>Welcome Krishna.</p>
    </main>
  );
}
