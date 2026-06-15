const siteData = {
  // ========== HERO ==========
  hero: {
    title: 'Find Next Place To Visit',
    subtitle: 'Temukan Destinasi Wisata pilihan anda',
    bgImage: '/images/bus4.jpeg',
    destinations: [
      { value: 'bali', label: 'Bali' },
      { value: 'bandung', label: 'Bandung' },
      { value: 'banten', label: 'Banten' },
      { value: 'bogor', label: 'Bogor' },
      { value: 'jakarta', label: 'Jakarta' },
      { value: 'yogyakarta', label: 'Yogyakarta' },
    ],
    durations: [
      { value: '1', label: '1 Day Tour' },
      { value: '2-4', label: '2-4 Days Tour' },
      { value: '5-7', label: '5-7 Days Tour' },
      { value: '7+', label: '7+ Days Tour' },
    ],
  },

  // ========== FEATURES ==========
  features: [
    {
      icon: 'fa-globe',
      title: '100+ Tempat Wisata',
      desc: 'Team kami berpengalaman untuk tempat wisata',
    },
    {
      icon: 'fa-tag',
      title: 'Harga Terbaik',
      desc: 'Harga cocok dalam waktu 48 jam setelah konfirmasi pesanan',
    },
    {
      icon: 'fa-headset',
      title: 'Support Kami',
      desc: 'Kami membantu sebelum, selama dan sesudah perjalanan wisata anda',
    },
  ],

  // ========== DESTINATIONS ==========
  destinations: [
    { name: 'Dieng Yogya', image: '/images/destinasi/dieng-yogya.jpeg', tours: 12 },
    { name: 'Jawa Tengah', image: '/images/destinasi/jawatengah.jpeg', tours: 10 },
    { name: 'Maribaya Bandung', image: '/images/destinasi/maribaya_bandung.jpeg', tours: 15 },
    { name: 'Bromo Batu Malang', image: '/images/destinasi/bromo-batu_malang.jpeg', tours: 8 },
    { name: 'Bali Lombok', image: '/images/destinasi/bali-lombok.jpeg', tours: 20 },
  ],

  // ========== BUS FLEET (fallback static) ==========
  busFleet: [
    { name: 'Zahra Ayu', image: '/images/bus1.jpeg' },
    { name: 'Wong Kudus', image: '/images/bus2.jpeg' },
    { name: 'William', image: '/images/bus3.jpeg' },
    { name: 'White Horse', image: '/images/foto4.jpeg' },
    { name: 'Starbus', image: '/images/foto5.jpeg' },
    { name: 'Blue Star', image: '/images/bus1.jpeg' },
  ],

  // ========== PROMO ==========
  promo: {
    title: 'Diskon Paket Wisata',
    discount: 'Up to 40% Discount!',
    bgColor: '#1d6ec5',
    cta: 'Read More',
    image: '/images/logo.png',
  },

  // ========== TOUR PACKAGES ==========
  // Data paket wisata sudah dipindahkan ke database (tabel: paket_wisata)
  // Dikelola via Admin Panel → Paket Wisata
  // API: GET /api/paket_wisata.php
  tourPackages: [],

  // ========== TESTIMONIALS ==========
  testimonials: [
    {
      name: 'Ahmad Irfan',
      role: 'Traveler',
      rating: 5,
      text: 'Pelayanan sangat memuaskan! Bus bersih, sopir ramah, dan tepat waktu. Sangat recommended untuk perjalanan wisata keluarga.',
    },
    {
      name: 'Chory Aufa',
      role: 'Blogger',
      rating: 5,
      text: 'Pengalaman naik bus wisata yang luar biasa. Harga terjangkau dengan fasilitas yang mewah. Pasti akan pakai lagi!',
    },
    {
      name: "Dwi Nur'Aini",
      role: 'Traveler',
      rating: 4,
      text: 'Pelayanan memuaskan. Bus nyaman dan bersih. Hanya saran untuk penambahan snack di perjalanan.',
    },
    {
      name: 'Pipit Dipi',
      role: 'Traveler',
      rating: 5,
      text: 'Terima kasih Mafina Trans! Perjalanan wisata kami jadi menyenangkan. Busnya bagus dan AC dingin.',
    },
    {
      name: 'Alfarid Petrus',
      role: 'Blogger',
      rating: 5,
      text: 'Salah satu penyedia bus pariwisata terbaik di Tangerang. Pelayanan profesional dan armada terawat.',
    },
  ],

  // ========== NEWS ==========
  news: [],

  // ========== PARTNERS ==========
  partners: [
    'Adhi Prima',
    'Panorama',
    'White Horse',
    'Blue Star',
    'Starbus',
    'Subur Jaya',
    'RJB Trans',
    'Malika',
    'Kanaya',
    'Hiace',
    'Elf',
    'City Trans',
  ],

  // ========== FOOTER ==========
  footer: {
    contact: {
      phone: '087785598639',
      email: 'info@mafinatrans.co.id',
      address: 'Kota Tangerang',
    },
    aboutLinks: [
      { label: 'Tentang Kami', url: '#' },
      { label: 'Visi dan Misi', url: '#' },
      { label: 'Lokasi', url: '#' },
      { label: 'Partner Kami', url: '#' },
    ],
    supportLinks: [
      { label: 'Kerjasama', url: '#' },
      { label: 'Promo', url: '#' },
      { label: 'FAQ', url: '#' },
    ],
    social: {
      facebook: '#',
      pinterest: '#',
      twitter: '#',
      youtube: '#',
      instagram: '#',
    },
    copyright: '© 2024 Mafina Trans All Rights Reserved',
  },

  // ========== WHATSAPP ==========
  whatsapp: {
    number: '6289652594745',
    message: 'Halo Mafina Trans, saya ingin bertanya tentang paket wisata',
  },

  // ========== NAVIGATION ==========
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'Armada', path: '/bus-wisata' },
    { label: 'Paket Wisata', path: '/paket-wisata' },
    { label: 'News & Info', path: '/news' },
    { label: 'Kontak Kami', path: '/kontak' },
  ],
};

export default siteData;