export const metadata = {
  title: "Weekend Spots for IT Professionals in Bangalore | TechLifePortal",
  description:
    "Discover weekend hangouts, short trips, walks and chill spots near Bangalore tech hubs. Curated for IT professionals.",
};

export default function WeekendSpotsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Weekend Spots for IT Professionals
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Short rides, walks, malls and hangout places Bangalore IT folks usually
          visit to unwind after a busy work week.
        </p>
      </section>

      {/* Cards */}
      <section className="space-y-6">
        {/* Spot 1 */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-gray-900">
            Whitefield Tech Park Food Street
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            📍 Whitefield · 🍔 Food / Hangout
          </p>
          <p className="mt-3 text-gray-700">
            A popular evening food street near major tech parks. Perfect for
            casual team outings, post-work snacks and relaxed weekend nights.
          </p>
        </div>

        {/* Spot 2 */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-gray-900">
            JP Nagar Mini Forest Walk
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            📍 JP Nagar · 🌿 Nature / Walk
          </p>
          <p className="mt-3 text-gray-700">
            A peaceful walking trail surrounded by greenery. Ideal for calm
            weekend mornings and mental reset after a long work week.
          </p>
        </div>

        {/* Spot 3 */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-gray-900">
            Agara Lake Evening Walk
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            📍 HSR / Bellandur · 🚶 Leisure Walk
          </p>
          <p className="mt-3 text-gray-700">
            Well-maintained lake with walking paths and sunset views. A favorite
            evening unwind spot for Bellandur and HSR tech employees.
          </p>
        </div>

        {/* Spot 4 */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-gray-900">
            Nexus Mall – Bellandur
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            📍 Bellandur · 🛍 Mall / Hangout
          </p>
          <p className="mt-3 text-gray-700">
            A popular weekend hangout with food courts, movies and brand stores.
            Commonly visited by IT professionals working around ORR.
          </p>
        </div>
      </section>

      {/* Footer note */}
      <section className="mt-16 text-center text-sm text-gray-500">
        Built for Bangalore IT professionals · Curated by TechLifePortal
      </section>
    </main>
  );
}
