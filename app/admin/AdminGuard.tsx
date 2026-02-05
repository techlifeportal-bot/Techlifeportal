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
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/admin/login");
        return;
      }

      const adminEmail = "techlifeportal@gmail.com";

      if (data.session.user.email !== adminEmail) {
        router.push("/");
        return;
      }

      setOk(true);
    };

    run();
  }, [router]);

  if (!ok) return <p style={{ padding: 40 }}>Checking admin...</p>;

  return <>{children}</>;
}
