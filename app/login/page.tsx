"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMagicLink = async () => {
    setMessage("Sending...");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Error sending link");
    } else {
      setMessage("Magic link sent. Check your email.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-xl border w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Admin Login
        </h1>

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendMagicLink}
          className="w-full bg-black text-white py-2 rounded"
        >
          Send Magic Link
        </button>

        <p className="text-sm text-center">{message}</p>
      </div>
    </main>
  );
}
