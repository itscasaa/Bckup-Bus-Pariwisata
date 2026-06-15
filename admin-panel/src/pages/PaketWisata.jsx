import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const API      = 'http://localhost/bus_pariwisata';
const API_PUB  = `${API}/api/paket_wisata.php`;
const API_ADM  = `${API}/admin/api/paket_wisata.php`;

const KATEGORI_OPTIONS = ['1 Hari','2 Hari','3 Hari','4 Hari','5 Hari','7 Hari','10 Hari'];
const inputCls = "w-full px-4 py-2.5 bg-surface-container-low border-none rounded-xl text-body-md focus:outline-none focus:ring-2 focus:ring-primary";

const formatRp = n => n && n > 0 ? 'Rp. ' + new Intl.NumberFormat('id-ID').format(n) : '-';

// ─── List Page ────────────────────────────────────────────────────────────────
export default function PaketWisata() {
  const navigate = useNavigate();
  const [list,     setList]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [filter,   setFilter]   = useState('');

  useEffect(() => {
    fetch(API_ADM)
      .then(r => r.json())
      .then(d => setList(d.data || []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  const handleHapus = async (id, judul) => {
    if (!window.confirm(`Hapus paket "${judul}"?`)) return;
    setDeleting(id);
    try {
      const res  = await fetch(API_ADM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'hapus', id }),
      });
      const data = await res.json();
      if (data.status === 'success') setList(prev => prev.filter(p => p.id !== id));
      else alert(data.message || 'Gagal menghapus.');
    } catch { alert('Tidak dapat terhubung.'); }
    finally { setDeleting(null); }
  };

  const filtered = filter
    ? list.filter(p => p.kategori === filter)
    : list;

  return (
    <main className="flex-1">
      <PageHeader title="Kelola Paket Wisata" subtitle="Manajemen paket wisata & destinasi" />
      <div className="px-4 lg:px-unit-xl pb-24 lg:pb-unit-xl">
        <div className="bg-surface-container-lowest rounded-[24px] overflow-hidden"
          style={{ boxShadow: '0px 10px 30px rgba(0,0,0,0.03)' }}>

          {/* Toolbar */}
          <div className="px-unit-lg py-6 flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/30">
            <div>
              <h3 className="text-headline-sm text-on-surface">Daftar Paket Wisata</h3>
              <p className="text-body-md text-outline mt-0.5">{filtered.length} paket</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Filter kategori */}
              <div className="relative">
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="appearance-none bg-surface-container-low border-none pr-8 pl-4 py-2.5 rounded-xl text-body-md text-on-surface-variant focus:outline-none"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                >
                  <option value="">Semua Kategori</option>
                  {KATEGORI_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-outline"
                  style={{ fontSize: '18px' }}>expand_more</span>
              </div>
              {/* Tambah */}
              <button
                onClick={() => navigate('/paket-wisata/tambah')}
                className="flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#3525cd)', fontSize: '14px' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_circle</span>
                Tambah Paket
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low">
                  {['Paket','Kategori','Durasi','Harga','Status','Aksi'].map(h => (
                    <th key={h} className="px-unit-lg py-4 text-label-sm text-outline uppercase tracking-wider font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {loading && (
                  <tr><td colSpan={6} className="px-unit-lg py-10 text-center">
                    <div className="flex justify-center">
                      <span className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  </td></tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-unit-lg py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: '40px' }}>map</span>
                      </div>
                      <p className="font-semibold text-on-surface">Belum ada paket wisata</p>
                      <button onClick={() => navigate('/paket-wisata/tambah')}
                        className="px-5 py-2 rounded-full border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all">
                        Tambah Paket Pertama
                      </button>
                    </div>
                  </td></tr>
                )}
                {!loading && filtered.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-surface-container-low transition-colors">
                    {/* Paket */}
                    <td className="px-unit-lg py-4">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 rounded-xl overflow-hidden bg-surface-dim"
                          style={{ width: '80px', height: '56px' }}>
                          <img
                            src={pkg.gambar}
                            alt={pkg.judul}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={e => { e.target.src = 'https://placehold.co/80x56/e4e1ee/777587?text=Paket'; }}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface" style={{ fontSize: '14px' }}>{pkg.judul}</p>
                          <p className="text-outline mt-0.5" style={{ fontSize: '12px' }}>{pkg.badge}</p>
                        </div>
                      </div>
                    </td>
                    {/* Kategori */}
                    <td className="px-unit-lg py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: '#e2dfff', color: '#3323cc' }}>
                        {pkg.kategori}
                      </span>
                    </td>
                    {/* Durasi */}
                    <td className="px-unit-lg py-4 text-on-surface-variant text-body-md">{pkg.durasi}</td>
                    {/* Harga */}
                    <td className="px-unit-lg py-4 font-bold text-on-surface text-body-md">{formatRp(pkg.harga)}</td>
                    {/* Status */}
                    <td className="px-unit-lg py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold"
                        style={pkg.status === 'aktif'
                          ? { background: '#dcfce7', color: '#15803d' }
                          : { background: '#f3f4f6', color: '#6b7280' }}>
                        {pkg.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    {/* Aksi */}
                    <td className="px-unit-lg py-4">
                      <div className="flex gap-2">
                        <button onClick={() => navigate(`/paket-wisata/edit/${pkg.id}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                          style={{ background: 'rgba(53,37,205,0.08)', color: '#3525cd' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span> Edit
                        </button>
                        <button
                          onClick={() => handleHapus(pkg.id, pkg.judul)}
                          disabled={deleting === pkg.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity disabled:opacity-50"
                          style={{ background: '#ffdad6', color: '#ba1a1a' }}>
                          {deleting === pkg.id
                            ? <span className="w-4 h-4 border-2 border-error border-t-transparent rounded-full animate-spin" />
                            : <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                          }
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

// ─── Shared Form ──────────────────────────────────────────────────────────────
function PaketForm({ title, onSubmit, loading, error, onBack, initial }) {
  const [form, setForm] = useState(initial || {
    judul: '', badge: '', kategori: '1 Hari', durasi: '1 Hari',
    harga: '', deskripsi: '', gambar: '', status: 'aktif', urutan: 0,
  });

  useEffect(() => { if (initial) setForm(initial); }, [initial]);

  const s = k => e => setForm({ ...form, [k]: e.target.value });

  // Auto-generate badge dari kategori
  const handleKategori = e => {
    const val = e.target.value;
    setForm(prev => ({
      ...prev,
      kategori: val,
      badge: `PAKET ${val.toUpperCase()}`,
      durasi: val,
    }));
  };

  return (
    <div>
      <button onClick={onBack}
        className="flex items-center gap-2 text-outline hover:text-primary mb-5 transition-colors"
        style={{ fontSize: '14px' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
        Kembali
      </button>

      <div className="bg-surface-container-lowest rounded-[24px] p-unit-lg max-w-2xl"
        style={{ boxShadow: '0px 10px 30px rgba(0,0,0,0.03)' }}>
        <h3 className="text-headline-sm text-on-surface mb-6">{title}</h3>

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5"
            style={{ background: '#ffdad6', color: '#ba1a1a', fontSize: '14px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
            {error}
          </div>
        )}

        <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
          {/* Judul */}
          <div>
            <label className="block font-semibold text-on-surface mb-1.5" style={{ fontSize: '14px' }}>
              Judul Paket <span className="text-error">*</span>
            </label>
            <input value={form.judul} onChange={s('judul')} className={inputCls}
              placeholder="contoh: Bandung City Tour" required />
          </div>

          {/* Kategori + Durasi */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-on-surface mb-1.5" style={{ fontSize: '14px' }}>
                Kategori <span className="text-error">*</span>
              </label>
              <select value={form.kategori} onChange={handleKategori} className={inputCls}>
                {KATEGORI_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1.5" style={{ fontSize: '14px' }}>
                Durasi <span className="text-error">*</span>
              </label>
              <input value={form.durasi} onChange={s('durasi')} className={inputCls}
                placeholder="contoh: 2 Hari 1 Malam" required />
            </div>
          </div>

          {/* Badge + Harga */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-on-surface mb-1.5" style={{ fontSize: '14px' }}>Badge</label>
              <input value={form.badge} onChange={s('badge')} className={inputCls}
                placeholder="contoh: PAKET 1 HARI" />
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1.5" style={{ fontSize: '14px' }}>
                Harga (Rp) <span className="text-error">*</span>
              </label>
              <input type="number" value={form.harga} onChange={s('harga')} className={inputCls}
                placeholder="2500000" required />
            </div>
          </div>

          {/* Gambar */}
          <div>
            <label className="block font-semibold text-on-surface mb-1.5" style={{ fontSize: '14px' }}>
              URL / Path Gambar
            </label>
            <input value={form.gambar} onChange={s('gambar')} className={inputCls}
              placeholder="/images/destinasi/bandung.jpeg atau https://..." />
            {form.gambar && (
              <div className="mt-2 rounded-xl overflow-hidden" style={{ height: '120px', width: '200px' }}>
                <img src={form.gambar} alt="preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block font-semibold text-on-surface mb-1.5" style={{ fontSize: '14px' }}>Deskripsi</label>
            <textarea value={form.deskripsi} onChange={s('deskripsi')}
              className={inputCls + ' resize-none'} rows={4}
              placeholder="Deskripsi singkat paket wisata..." />
          </div>

          {/* Status + Urutan */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-on-surface mb-1.5" style={{ fontSize: '14px' }}>Status</label>
              <select value={form.status} onChange={s('status')} className={inputCls}>
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1.5" style={{ fontSize: '14px' }}>
                Urutan Tampil
              </label>
              <input type="number" value={form.urutan} onChange={s('urutan')} className={inputCls}
                placeholder="0 = otomatis" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-xl transition-all disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#3525cd)', fontSize: '14px' }}>
              {loading
                ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
              }
              Simpan Paket
            </button>
            <button type="button" onClick={onBack}
              className="px-6 py-2.5 rounded-xl font-semibold transition-colors"
              style={{ background: '#f0ecf9', color: '#1b1b24', fontSize: '14px' }}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Tambah Paket ─────────────────────────────────────────────────────────────
export function TambahPaketWisata() {
  const navigate = useNavigate();
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (form) => {
    setError(''); setLoading(true);
    try {
      const res  = await fetch(API_ADM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'tambah', ...form }),
      });
      const data = await res.json();
      if (data.status === 'success') navigate('/paket-wisata');
      else setError(data.message || 'Gagal menyimpan.');
    } catch { setError('Tidak dapat terhubung ke server.'); }
    finally { setLoading(false); }
  };

  return (
    <main className="flex-1">
      <PageHeader title="Tambah Paket Wisata" subtitle="Buat paket wisata baru" />
      <div className="px-4 lg:px-unit-xl pb-24 lg:pb-unit-xl">
        <PaketForm title="Form Tambah Paket" onSubmit={handleSubmit}
          loading={loading} error={error} onBack={() => navigate('/paket-wisata')} />
      </div>
    </main>
  );
}

// ─── Edit Paket ───────────────────────────────────────────────────────────────
export function EditPaketWisata() {
  const { id }                = useParams();
  const navigate              = useNavigate();
  const [initial, setInitial] = useState(null);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(API_ADM)
      .then(r => r.json())
      .then(d => {
        const item = (d.data || []).find(p => String(p.id) === String(id));
        if (item) setInitial(item);
      })
      .catch(() => {});
  }, [id]);

  const handleSubmit = async (form) => {
    setError(''); setLoading(true);
    try {
      const res  = await fetch(API_ADM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'edit', id: parseInt(id), ...form }),
      });
      const data = await res.json();
      if (data.status === 'success') navigate('/paket-wisata');
      else setError(data.message || 'Gagal menyimpan.');
    } catch { setError('Tidak dapat terhubung ke server.'); }
    finally { setLoading(false); }
  };

  return (
    <main className="flex-1">
      <PageHeader title="Edit Paket Wisata" subtitle="Perbarui data paket wisata" />
      <div className="px-4 lg:px-unit-xl pb-24 lg:pb-unit-xl">
        {initial
          ? <PaketForm title="Form Edit Paket" onSubmit={handleSubmit}
              loading={loading} error={error} onBack={() => navigate('/paket-wisata')} initial={initial} />
          : <div className="flex justify-center py-20">
              <span className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        }
      </div>
    </main>
  );
}
