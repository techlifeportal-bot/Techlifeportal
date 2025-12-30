import Link from "next/link";

export default function WeekendSpotsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">
        Weekend Spots
      </h1>

      <p className="text-slate-600 mb-10 max-w-3xl">
        Curated weekend hangout places, short trips and walking spots that
        Bangalore IT professionals usually visit to relax after a busy week.
      </p>

      {/* LIST */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Example Card */}
        <div className="border rounded-xl p-5 hover:shadow-md transition">
          <h2 className="text-lg font-medium mb-2">
            Cubbon Park
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            A green escape in the heart of Bangalore, ideal for walks and
            relaxing weekends.
          </p>
          <a
            href="https://maps.google.com/?q=Cubbon+Park+Bangalore"
            target="_blank"
            className="text-blue-600 text-sm font-medium"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>

      {/* BACK LINK */}
      <div className="mt-12">
        <Link href="/" className="text-blue-600 text-sm">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
