"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Magic link sent. Check your email.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        <input
          type="email"
          placeholder="techlifeportal@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <button
          onClick={handleLogin}
          disabled={loading || !email}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Sending…" : "Send Magic Link"}
        </button>

        {message && (
          <p className="text-sm text-center text-blue-600">{message}</p>
        )}
      </div>
    </main>
  );
}
