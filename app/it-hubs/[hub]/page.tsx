import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function HubPage({
  params,
}: {
  params: { hub: string };
}) {
  const hub = params.hub;

  const { data: pgs, error } = await supabase
    .from("pgs_rentals")
    .select("*")
    .eq("hub", hub);

  const hubName = hub.replace(/-/g, " ");

  return (
    <main className="hub-page">
      {/* HEADER */}
      <section className="hub-header">
        <h1>{hubName}</h1>
        <p>PGs & rentals available near this IT hub.</p>
      </section>

      {/* ERROR STATE */}
      {error && (
        <p className="hub-error">
          Failed to load data for this IT hub.
        </p>
      )}

      {/* EMPTY STATE */}
      {!error && pgs && pgs.length === 0 && (
        <p className="hub-empty">
          No PGs listed yet for this IT hub.
        </p>
      )}

      {/* PG LIST */}
      <section className="hub-grid">
        {pgs?.map((pg) => (
          <div key={pg.id} className="hub-card">
            <h3>{pg.name}</h3>

            {pg.address && (
              <p className="hub-address">{pg.address}</p>
            )}

            {pg.rent && (
              <p className="hub-rent">Rent: ₹{pg.rent}</p>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
