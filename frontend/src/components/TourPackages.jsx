import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../data/siteData';
import API_BASE from '../config/api';

const TourPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading,  setLoading]  = useState(true);

  // Fetch 6 paket terbaru dari database — tidak ada fallback
  useEffect(() => {
    fetch(`${API_BASE}/paket_wisata.php`)
      .then(r => r.json())
      .then(d => {
        if (d.status === 'success' && Array.isArray(d.data)) {
          setPackages(d.data.slice(0, 6)); // tampilkan 6 di homepage
        }
      })
      .catch(() => setPackages([]))
      .finally(() => setLoading(false));
  }, []);

  // Jika loading atau tidak ada data, tidak tampilkan section
  if (loading) return null;
  if (packages.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Paket Wisata</h2>
            <div className="w-16 h-1 bg-[#1d6ec5] mt-2 rounded-full"></div>
          </div>
          <Link
            to="/paket-wisata"
            className="text-[#1d6ec5] hover:text-blue-600 font-semibold text-sm flex items-center gap-1 transition-colors duration-200"
          >
            View All <i className="fas fa-arrow-right text-xs"></i>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group rounded-xl overflow-hidden shadow-md cursor-pointer bg-white/60 backdrop-blur-md border border-[var(--color-primary)]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={pkg.gambar}
                  alt={pkg.judul}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={e => { e.target.onerror = null; e.target.src = '/images/bus4.jpeg'; }}
                />
                <div className="absolute top-3 left-3 bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {pkg.badge}
                </div>
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <i className="fas fa-tag"></i>
                  <span>Diskon 10%</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {pkg.judul}
                </h3>
                <p className="text-[#1d6ec5] font-bold text-sm mb-2">
                  {pkg.harga_fmt}
                </p>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <i className="far fa-clock mr-2"></i>
                  <span>{pkg.durasi}</span>
                </div>
                <a
                  href={`https://wa.me/${siteData.whatsapp.number}?text=Halo%20Surya%20Tour%20Trans%2C%20saya%20ingin%20pesan%20paket%20${encodeURIComponent(pkg.judul)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-bold py-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <i className="fab fa-whatsapp text-base"></i>
                  <span>Pesan via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
