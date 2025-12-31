'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type WeekendSpot = {
  id: number;
  name: string;
  description: string | null;
  maps_url: string | null;
  category: string | null;
};

export default function WeekendSpotsPage() {
  const supabase = createClient();

  const [spots, setSpots] = useState<WeekendSpot[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpots = async () => {
      const { data, error } = await supabase
        .from('weekend_spots')
        .select('id, name, description, maps_url, category')
        .order('priority', { ascending: false });

      if (!error && data) {
        setSpots(data);
      }

      setLoading(false);
    };

    fetchSpots();
  }, []);

  const categories = [
    'all',
    'trekking',
    'nature',
    'waterfalls',
    'heritage',
    'temples',
  ];

  const filteredSpots =
    selectedCategory === 'all'
      ? spots
      : spots.filter((spot) =>
          spot.category
            ?.toLowerCase()
            .split(',')
            .map((c) => c.trim())
            .includes(selectedCategory)
        );

  return (
    <main className="page-container">
      <header className="page-header">
        <h1>Explore Weekend Spots</h1>
        <p>
          Discover weekend destinations around Bangalore — explore by interest,
          not location.
        </p>

        <div className="filter-box">
          <label>Choose category</label>
          <select
            className="premium-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </header>

      {loading && <p>Loading weekend spots...</p>}

      {!loading && filteredSpots.length === 0 && (
        <p>No weekend spots found.</p>
      )}

      <section className="card-grid">
        {filteredSpots.map((spot) => (
          <div key={spot.id} className="spot-card">
            <h3 className="spot-title">{spot.name}</h3>

            <p className="spot-desc">
              {spot.description || 'No description available.'}
            </p>

            {spot.maps_url && (
              <a
                href={spot.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="maps-link"
              >
                View on Google Maps →
              </a>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
