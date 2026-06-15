import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE from '../config/api';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/paket_wisata.php`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setDestinations(data.data.slice(0, 5));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 lg:py-20 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Destinasi Populer
            </h2>
            <div className="w-16 h-1 bg-[var(--color-primary)] mt-2 rounded-full"></div>
          </div>
          <Link
            to="/paket-wisata"
            className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-semibold text-sm flex items-center gap-1 transition-colors duration-200"
          >
            View All <i className="fas fa-arrow-right text-xs"></i>
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="aspect-[4/5] bg-gray-200"></div>
              </div>
            ))}
          </div>
        )}

        {/* Grid dari DB */}
        {!loading && destinations.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.id}
                to={`/paket-wisata`}
                className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer block"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={dest.gambar}
                    alt={dest.judul}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.src = 'https://placehold.co/300x375?text=Destinasi'; }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                {dest.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-[var(--color-primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {dest.badge}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-base lg:text-lg leading-tight">
                    {dest.judul}
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5">{dest.durasi}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Fallback kalau DB kosong */}
        {!loading && destinations.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <i className="fas fa-map-marked-alt text-4xl mb-3"></i>
            <p>Belum ada destinasi tersedia.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Destinations;
