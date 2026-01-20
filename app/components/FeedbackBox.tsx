"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function FeedbackBox() {
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!message.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("feedback").insert([
      { message, contact: contact || null },
    ]);

    if (!error) {
      setMessage("");
      setContact("");
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    }

    setLoading(false);
  };

  return (
    <section className="feedback-box">
      <h3>What do you wish this site had?</h3>
      <p>Your problem = our next feature.</p>

      <textarea
        placeholder="Tell us what you need near your work or for your weekends..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <input
        type="text"
        placeholder="Your email (optional)"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Sending..." : "Send feedback"}
      </button>

      {done && <p className="thanks">Thanks! We read every message.</p>}
    </section>
  );
}
