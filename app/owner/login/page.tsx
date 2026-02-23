"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function OwnerLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // If already logged in, go to dashboard
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/owner/dashboard");
      }
    };

    checkSession();

    // Listen for login event
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          router.push("/owner/dashboard");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://techlifeportal.com/owner/dashboard",
      },
    });

    if (error) {
      setMessage("❌ Failed to send login link.");
    } else {
      setMessage("✅ Magic link sent. Check your email.");
    }

    setLoading(false);
  };

  return (
    <main className="page-container">
      <header className="page-header">
        <h1>PG Owner Login</h1>
        <p>Login to manage your listings.</p>
      </header>

      <section className="card" style={{ maxWidth: 400 }}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />

        <button
          onClick={handleLogin}
          disabled={loading || !email}
          className="approve-btn"
          style={{ marginTop: 16 }}
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>

        {message && (
          <p style={{ marginTop: 12, fontSize: 14 }}>{message}</p>
        )}
      </section>
    </main>
  );
}