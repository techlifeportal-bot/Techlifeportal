export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>

        <p className="text-gray-700 mb-4">
          TechLifePortal is currently in early development and is being shaped
          thoughtfully for Bangalore IT professionals.
        </p>

        <p className="text-gray-700 mb-2">
          For partnerships, listings, or corrections, reach out at:
        </p>

        <p className="font-medium">
          <a
            href="mailto:contacttechlifeportal@gmail.com"
            className="text-black hover:underline"
          >
            contacttechlifeportal@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
