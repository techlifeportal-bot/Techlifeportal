"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function OwnerLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
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