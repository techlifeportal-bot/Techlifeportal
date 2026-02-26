"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Enquiry = {
  id: string;
  pg_name: string;
  user_name: string;
  phone: string;
  move_in: string;
  message: string | null;
  created_at: string;
};

export default function OwnerDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [sessionUser, setSessionUser] = useState<any>(null);
  const [planType, setPlanType] = useState("free");

  const [pgName, setPgName] = useState("");
  const [hub, setHub] = useState("");
  const [location, setLocation] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [message, setMessage] = useState("");
  const [approvedEnquiries, setApprovedEnquiries] = useState<Enquiry[]>([]);

  /* ---------------- SESSION CHECK ---------------- */

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.push("/owner/login");
        return;
      }

      setSessionUser(data.session.user);

      const { data: ownerData } = await supabase
        .from("pg_owners")
        .select("plan_type")
        .eq("id", data.session.user.id)
        .single();

      if (ownerData?.plan_type) {
        setPlanType(ownerData.plan_type);
      }

      await fetchApprovedEnquiries(data.session.user.id);

      setLoading(false);
    };

    init();
  }, [router]);

  /* ---------------- FETCH APPROVED ENQUIRIES ---------------- */

  const fetchApprovedEnquiries = async (ownerId: string) => {
    const { data } = await supabase
      .from("pg_enquiries")
      .select("*")
      .eq("owner_id", ownerId)
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    setApprovedEnquiries(data || []);
  };

  /* ---------------- HANDLE IMAGE SELECT ---------------- */

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);

    if (planType === "free" && files.length > 2) {
      setMessage("Free plan allows maximum 2 images.");
      return;
    }

    setImages(files as File[]);

    const previews = files.map((file: any) =>
      URL.createObjectURL(file)
    );

    setImagePreviews(previews);
  };

  /* ---------------- UPLOAD IMAGES ---------------- */

  const uploadImages = async (): Promise<string[]> => {
    if (!sessionUser) return [];

    const uploadedUrls: string[] = [];

    for (const file of images) {
      const filePath = `${sessionUser.id}/${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("pg-images")
        .upload(filePath, file);

      if (error) {
        console.error(error);
        continue;
      }

      const { data } = supabase.storage
        .from("pg-images")
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  /* ---------------- SUBMIT LISTING ---------------- */

  const handleListingSubmit = async () => {
    if (!sessionUser) {
      setMessage("Not authenticated.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    // 🔍 Check how many listings this owner already has
    const { data: existingListings } = await supabase
      .from("pgs_rentals")
      .select("id")
      .eq("owner_id", sessionUser.id);

    if (planType === "free" && existingListings && existingListings.length >= 1) {
      setSubmitting(false);
      setMessage("Free plan limit exceeded.");
      return;
    }

    const imageUrls = await uploadImages();

    const { error } = await supabase.from("pgs_rentals").insert([
      {
        name: pgName,
        hub,
        location,
        maps_url: mapsUrl || null,
        status: "pending",
        source: "owner",
        type: "pg",
        owner_id: sessionUser.id,
        images: imageUrls,
      },
    ]);

    setSubmitting(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Submit successful.");

    setPgName("");
    setHub("");
    setLocation("");
    setMapsUrl("");
    setImages([]);
    setImagePreviews([]);
  };

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/owner/login");
  };

  if (loading) {
    return (
      <main className="page-container">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="page-container">
      <h1>Owner Dashboard</h1>

      <p>
        Plan: <strong>{planType.toUpperCase()}</strong>
      </p>

      <button onClick={handleLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      {/* ---------------- ADD LISTING ---------------- */}

      <section className="card" style={{ maxWidth: 500 }}>
        <h3>Add PG Listing</h3>

        <label>Name</label>
        <input value={pgName} onChange={(e) => setPgName(e.target.value)} />

        <label>Hub</label>
        <input value={hub} onChange={(e) => setHub(e.target.value)} />

        <label>Location</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />

        <label>Maps URL</label>
        <input value={mapsUrl} onChange={(e) => setMapsUrl(e.target.value)} />

        <label>Upload Images</label>
        <input type="file" multiple onChange={handleImageChange} />

        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="preview"
              width={80}
              height={80}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          ))}
        </div>

        <button
          onClick={handleListingSubmit}
          disabled={!pgName || !hub || !location || submitting}
          style={{
            marginTop: 20,
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            background: submitting
              ? "rgba(255,255,255,0.2)"
              : "linear-gradient(90deg,#ffffff,#d4d4d4)",
            color: "#000",
            border: "none",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Submitting..." : "Submit Listing"}
        </button>

        {message && (
          <p style={{ marginTop: 14, fontWeight: 500 }}>
            {message}
          </p>
        )}
      </section>

      {/* ---------------- APPROVED ENQUIRIES ---------------- */}

      <section style={{ marginTop: 50 }}>
        <h2>Approved Enquiries</h2>

        {approvedEnquiries.length === 0 && (
          <p style={{ marginTop: 20, opacity: 0.7 }}>
            No approved enquiries yet.
          </p>
        )}

        {approvedEnquiries.map((enq) => (
          <div
            key={enq.id}
            style={{
              marginTop: 20,
              padding: 20,
              borderRadius: 16,
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              maxWidth: 500,
            }}
          >
            <h3>{enq.pg_name}</h3>
            <p>Name: {enq.user_name}</p>
            <p>Phone: {enq.phone}</p>
            <p>Move-in: {enq.move_in}</p>
            {enq.message && <p>Message: {enq.message}</p>}
          </div>
        ))}
      </section>
    </main>
  );
}