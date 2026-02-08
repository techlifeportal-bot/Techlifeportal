"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    setMsg("Sending magic link...");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin-panel`,
      },
    });

    if (error) setMsg(error.message);
    else setMsg("Magic link sent. Check your email.");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Admin Login</h1>

      <input
        placeholder="Enter admin email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, width: 300 }}
      />

      <br /><br />

      <button onClick={login} style={{ padding: 10 }}>
        Send Magic Link
      </button>

      <p>{msg}</p>
    </main>
  );
}
