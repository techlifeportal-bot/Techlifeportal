export const metadata = {
  title: "Weekend Spots for Bangalore IT Folks | TechLifePortal",
  description:
    "Discover weekend hangout spots, walks, food streets and short trips popular among Bangalore IT professionals.",
};

export default function WeekendSpotsPage() {
  const spots = [
    {
      name: "Nexus Mall – Bellandur",
      area: "Bellandur",
      type: "Mall / Hangout",
      description:
        "Large mall with food court, movies and brand stores. A common weekend hangout for IT employees around ORR.",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=Nexus+Mall+Bellandur",
    },
    {
      name: "Agara Lake Walk",
      area: "HSR / Bellandur",
      type: "Leisure / Walk",
      description:
        "Well-maintained lake with walking paths. Ideal for evening walks and relaxed weekends.",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=Agara+Lake+Bangalore",
    },
    {
      name: "JP Nagar Mini Forest",
      area: "JP Nagar",
      type: "Nature / Walk",
      description:
        "Peaceful walking trail surrounded by greenery. Great for calm weekend mornings.",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=JP+Nagar+Mini+Forest",
    },
    {
      name: "Whitefield Food Street",
      area: "Whitefield",
      type: "Food / Hangout",
      description:
        "Popular evening food street near tech parks. Ideal for casual weekend outings with colleagues.",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=Whitefield+Food+Street",
    },
    {
      name: "Nandi Hills Sunrise Point",
      area: "Outskirts of Bangalore",
      type: "Nature / Short Trip",
      description:
        "Famous sunrise viewpoint and short getaway. Best visited early morning on weekends.",
      mapLink:
        "https://www.google.com/maps/search/?api=1&query=Nandi+Hills+Sunrise+Point",
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-3">
        🌴 Weekend Spots for Bangalore IT Folks
      </h1>

      <p className="text-gray-600 mb-10 max-w-3xl">
        Short trips, walks, food streets and hangout places Bangalore IT employees
        usually visit to unwind after a busy work week.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spots.map((spot) => (
          <div
            key={spot.name}
            className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{spot.name}</h2>

            <p className="text-sm text-gray-500 mt-1">
              📍 {spot.area} • {spot.type}
            </p>

            <p className="text-gray-700 text-sm mt-3">
              {spot.description}
            </p>

            <a
              href={spot.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-blue-600 hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 mt-14">
        Curated for Bangalore IT professionals. Always verify timings and access
        details before visiting.
      </p>
    </main>
  );
}
