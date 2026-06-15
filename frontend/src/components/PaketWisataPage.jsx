import React, { useState, useEffect } from 'react';
import siteData from '../data/siteData';
import API_BASE from '../config/api';

// ─── Format harga ─────────────────────────────────────────────────────────────
const formatRp = (n) =>
  n ? 'Rp. ' + new Intl.NumberFormat('id-ID').format(n) : '-';

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
    <div className="aspect-[4/3] bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="h-10 bg-gray-200 rounded mt-4" />
    </div>
  </div>
);

// ─── Empty / Error State ──────────────────────────────────────────────────────
const EmptyState = ({ error }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <i className={`fas ${error ? 'fa-exclamation-circle text-red-400' : 'fa-map-marked-alt text-gray-300'} text-4xl`}></i>
    </div>
    <h3 className="font-bold text-gray-700 text-lg mb-2">
      {error ? 'Gagal Memuat Data' : 'Belum Ada Paket'}
    </h3>
    <p className="text-gray-500 text-sm max-w-sm">
      {error
        ? 'Tidak dapat terhubung ke server. Pastikan XAMPP sudah berjalan.'
        : 'Belum ada paket wisata yang tersedia untuk kategori ini.'}
    </p>
    {error && (
      <button
        onClick={() => window.location.reload()}
        className="mt-5 px-6 py-2.5 bg-[#1d6ec5] text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        <i className="fas fa-redo mr-2"></i>Coba Lagi
      </button>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PaketWisataPage = () => {
  const [packages,     setPackages]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [activeFilter, setActiveFilter] = useState('Semua');

  // Fetch HANYA dari database — tidak ada fallback
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/paket_wisata.php`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(d => {
        if (d.status === 'success' && Array.isArray(d.data)) {
          setPackages(d.data);
        } else {
          throw new Error(d.message || 'Data tidak tersedia');
        }
      })
      .catch(err => {
        setError(err.message);
        setPackages([]); // kosong — tidak ada fallback
      })
      .finally(() => setLoading(false));
  }, []);

  // Kategori unik dari data DB
  const categories = ['Semua', ...new Set(packages.map(p => p.kategori))];

  const filtered = activeFilter === 'Semua'
    ? packages
    : packages.filter(p => p.kategori === activeFilter);

  return (
    <>
      {/* ===== HERO ===== */}
      <div className="bg-gradient-to-br from-[#0d4a8a] to-[#1d6ec5] pt-16 lg:pt-20 pb-14 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-white/5 rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-blue-100 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <i className="fas fa-map-marked-alt text-yellow-300"></i>
            Wisata Bersama Surya Tour Trans
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-3 tracking-tight">Paket Wisata</h1>
          <p className="text-blue-100 text-base lg:text-lg max-w-2xl mx-auto mb-8">
            Nikmati perjalanan wisata yang nyaman dengan berbagai pilihan paket menarik.
            Harga terbaik, armada premium, dan driver berpengalaman.
          </p>

          {/* Stats */}
          <div className="inline-flex flex-wrap justify-center gap-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-8 h-8 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center font-bold text-xs">
                {loading ? '...' : packages.length}
              </span>
              <span className="text-blue-100">Paket Tersedia</span>
            </div>
            <div className="w-px bg-white/20 hidden sm:block self-stretch" />
            <div className="flex items-center gap-2 text-sm">
              <i className="fas fa-clock text-yellow-300"></i>
              <span className="text-blue-100">1 Hari s/d 10 Hari</span>
            </div>
            <div className="w-px bg-white/20 hidden sm:block self-stretch" />
            <div className="flex items-center gap-2 text-sm">
              <i className="fas fa-map-marker-alt text-yellow-300"></i>
              <span className="text-blue-100">100+ Destinasi Wisata</span>
            </div>
            <div className="w-px bg-white/20 hidden sm:block self-stretch" />
            <div className="flex items-center gap-2 text-sm">
              <i className="fas fa-headset text-yellow-300"></i>
              <span className="text-blue-100">Support 24 Jam</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="container mx-auto px-4 py-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-blue-800">
          <span><i className="fas fa-check-circle text-green-500 mr-1"></i>Tersedia paket custom sesuai kebutuhan rombongan Anda</span>
          <span><i className="fas fa-tag text-yellow-500 mr-1"></i>Diskon spesial untuk pemesanan grup &amp; repeat order</span>
        </div>
      </div>

      {/* ===== FILTER ===== */}
      {!loading && !error && packages.length > 0 && (
        <section className="py-6 bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-[#1d6ec5] text-white shadow-md shadow-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== GRID ===== */}
      <section className="py-12 md:py-16 bg-gray-50 min-h-[60vh]">
        <div className="container mx-auto px-4">

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1,2,3,4,5,6,7,8].map(i => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error / Empty */}
          {!loading && (error || filtered.length === 0) && (
            <div className="grid grid-cols-1">
              <EmptyState error={error} />
            </div>
          )}

          {/* Cards dari DB */}
          {!loading && !error && filtered.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  Menampilkan <span className="font-semibold text-gray-700">{filtered.length}</span> paket wisata
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                  >
                    {/* Gambar */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={pkg.gambar}
                        alt={pkg.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = '/images/bus4.jpeg';
                        }}
                      />
                      {/* Badge */}
                      <div className="absolute top-3 left-3 bg-[#1d6ec5] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                        {pkg.badge}
                      </div>
                      {/* Durasi */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <i className="far fa-clock"></i>
                        <span>{pkg.durasi}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-[#1d6ec5] transition-colors duration-300 line-clamp-2">
                        {pkg.judul}
                      </h3>
                      {/* Harga */}
                      <p className="text-[#1d6ec5] font-bold text-sm mb-2">
                        {pkg.harga_fmt || formatRp(pkg.harga)}
                      </p>
                      <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-3">
                        {pkg.deskripsi}
                      </p>
                      <div className="pt-4 mt-auto">
                        <a
                          href={`https://wa.me/${siteData.whatsapp.number}?text=Halo%20Surya%20Tour%20Trans%2C%20saya%20ingin%20pesan%20paket%20${encodeURIComponent(pkg.judul)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 font-semibold"
                        >
                          <i className="fab fa-whatsapp text-base"></i>
                          <span>Pesan via WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-[#1d6ec5]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ingin Paket Wisata Custom?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Kami siap membantu Anda merancang paket perjalanan sesuai keinginan. Hubungi tim kami sekarang!
          </p>
          <a
            href={`https://wa.me/${siteData.whatsapp.number}?text=Halo%20Surya%20Tour%20Trans%2C%20saya%20ingin%20konsultasi%20paket%20wisata%20custom`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#1d6ec5] font-bold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-colors duration-200 shadow-lg"
          >
            <i className="fab fa-whatsapp text-green-500 text-xl"></i>
            Konsultasi Gratis
          </a>
        </div>
      </section>
    </>
  );
};

export default PaketWisataPage;
