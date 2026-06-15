import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/',             icon: 'dashboard',      label: 'Dashboard',          end: true },
  { to: '/armada',       icon: 'directions_bus', label: 'Kelola Armada' },
  { to: '/price-list',   icon: 'payments',       label: 'Kelola Price List' },
  { to: '/paket-wisata', icon: 'map',            label: 'Paket Wisata' },
  { to: '/news',         icon: 'newspaper',      label: 'Kelola Berita' },
];

export default function Layout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const nama      = localStorage.getItem('admin_nama') || 'Admin';
  const [open, setOpen] = useState(false);

  // Tutup drawer saat navigasi
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Prevent body scroll saat drawer terbuka
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_nama');
    navigate('/login');
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="mb-unit-xl px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-lg shrink-0">
            <span className="material-symbols-outlined text-white" style={{ fontSize: '22px' }}>
              directions_bus
            </span>
          </div>
          <div>
            <h1 className="font-bold text-primary leading-tight" style={{ fontSize: '18px' }}>
              Surya Tour
            </h1>
            <p className="text-outline" style={{ fontSize: '12px' }}>Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-unit-md px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-container text-on-primary-container shadow-md scale-[0.97]'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
              }`
            }
            style={{ fontSize: '14px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="pt-unit-lg border-t border-outline-variant space-y-1">
        <a
          href="http://localhost/bus_pariwisata"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-unit-md text-on-surface-variant hover:text-primary
                     hover:bg-surface-container-high px-4 py-3 rounded-xl transition-all duration-200"
          style={{ fontSize: '14px' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>language</span>
          <span>Lihat Website</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-unit-md text-error hover:bg-error-container
                     px-4 py-3 rounded-xl transition-all duration-200"
          style={{ fontSize: '14px' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>logout</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* User card */}
      <div className="mt-3 px-4 py-3 bg-surface-container-low rounded-xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center
                        text-white font-bold shrink-0" style={{ fontSize: '14px' }}>
          {nama.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-on-surface truncate" style={{ fontSize: '13px' }}>{nama}</p>
          <p className="text-outline" style={{ fontSize: '11px' }}>Administrator</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-surface">

      {/* ── Desktop Sidebar (hidden on mobile) ── */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-screen flex-col py-unit-lg px-unit-md z-50
                   bg-surface-container-lowest border-r border-outline-variant"
        style={{ width: '280px', boxShadow: '0px 10px 30px rgba(0,0,0,0.03)' }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile Overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <aside
        className="fixed left-0 top-0 h-screen flex flex-col py-unit-lg px-unit-md z-50 lg:hidden
                   bg-surface-container-lowest border-r border-outline-variant transition-transform duration-300"
        style={{
          width: '280px',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: open ? '0px 10px 40px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                     rounded-full hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-outline" style={{ fontSize: '20px' }}>close</span>
        </button>
        <SidebarContent />
      </aside>

      {/* ── Main Content ── */}
      <div className="lg:ml-[280px] flex-1 flex flex-col min-h-screen w-full">

        {/* ── Mobile Top Bar ── */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-surface-container-lowest
                        border-b border-outline-variant sticky top-0 z-30"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <button
            onClick={() => setOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl
                       hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '24px' }}>
              menu
            </span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '16px' }}>
                directions_bus
              </span>
            </div>
            <span className="font-bold text-primary" style={{ fontSize: '16px' }}>Surya Tour</span>
          </div>

          <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center
                          text-white font-bold" style={{ fontSize: '13px' }}>
            {nama.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* ── Page Content ── */}
        <Outlet />
      </div>

      {/* ── Mobile Bottom Navigation ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface-container-lowest
                   border-t border-outline-variant flex items-center justify-around px-2 py-2"
        style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}
      >
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-0 ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className="w-10 h-8 flex items-center justify-center rounded-full transition-all"
                  style={{ background: isActive ? 'rgba(53,37,205,0.12)' : 'transparent' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                    {item.icon}
                  </span>
                </div>
                <span className="truncate" style={{ fontSize: '10px', fontWeight: isActive ? '700' : '500' }}>
                  {item.label.replace('Kelola ', '')}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
