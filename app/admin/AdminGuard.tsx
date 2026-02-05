"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // ❌ Not logged in
      if (!session) {
        router.push("/admin/login");
        return;
      }

      // ✅ Only allow your email
      const adminEmail = "techlifeportal@gmail.com";

      if (session.user.email !== adminEmail) {
        alert("Not authorized");
        router.push("/");
        return;
      }

      setChecking(false);
    };

    checkAdmin();
  }, [router]);

  if (checking) {
    return (
      <p style={{ padding: 40, textAlign: "center" }}>
        Checking admin access...
      </p>
    );
  }

  return <>{children}</>;
}
