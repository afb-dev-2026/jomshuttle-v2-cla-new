/**
 * data.js — Single source of truth for JomShuttle
 *
 * HOW TO UPDATE WHATSAPP NUMBER:
 *   Change `whatsapp` below to your new number (digits only, with country code).
 *
 * HOW TO ADD A NEW STATE:
 *   Add an object to the `states` array following the same pattern.
 *
 * HOW TO ADD A NEW TOUR PACKAGE:
 *   Add an object to the `tours` array following the same pattern.
 *
 * HOW TO CHANGE A PRICE:
 *   Find the relevant state or service in `states` / `services` and update `priceFrom`.
 */

const DATA = {
  // ─── CONTACT ──────────────────────────────────────────────────────────────
  whatsapp: "60136788869", // Change this to update the WhatsApp booking number

  social: {
    facebook:  "https://facebook.com/jomshuttle",
    instagram: "https://instagram.com/jomshuttle",
    tiktok:    "https://tiktok.com/@jomshuttle",
  },

  // ─── EMAILJS (replace placeholders before going live) ─────────────────────
  emailjs: {
    publicKey:  "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId:  "YOUR_EMAILJS_SERVICE_ID",
    templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  },

  // ─── STATES ───────────────────────────────────────────────────────────────
  // To add a new state: copy one block, change id/name/priceFrom/image/destinations
  states: [
    {
      id: "kuala-lumpur",
      name: { en: "Kuala Lumpur", ms: "Kuala Lumpur" },
      priceFrom: 80,
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
      alt: "Kuala Lumpur skyline with Petronas Twin Towers",
      destinations: ["KLIA/KLIA2", "Sentral", "Bukit Bintang", "Chow Kit", "Ampang"],
    },
    {
      id: "selangor",
      name: { en: "Selangor", ms: "Selangor" },
      priceFrom: 90,
      image: "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=600&q=80",
      alt: "Shah Alam Blue Mosque Selangor",
      destinations: ["Shah Alam", "Petaling Jaya", "Subang", "Klang", "Sepang"],
    },
    {
      id: "perak",
      name: { en: "Perak", ms: "Perak" },
      priceFrom: 120,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      alt: "Ipoh city Perak Malaysia",
      destinations: ["Ipoh", "Taiping", "Teluk Intan", "Lumut", "Cameron Highlands"],
    },
    {
      id: "penang",
      name: { en: "Penang", ms: "Pulau Pinang" },
      priceFrom: 200,
      image: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=600&q=80",
      alt: "George Town Penang heritage street art",
      destinations: ["Georgetown", "Bayan Lepas", "Butterworth", "Balik Pulau"],
    },
    {
      id: "johor",
      name: { en: "Johor", ms: "Johor" },
      priceFrom: 220,
      image: "https://images.unsplash.com/photo-1591164853686-26b0e1a40e52?w=600&q=80",
      alt: "Johor Bahru city waterfront",
      destinations: ["JB City", "Iskandar Puteri", "Kluang", "Muar", "Pontian"],
    },
    {
      id: "melaka",
      name: { en: "Melaka", ms: "Melaka" },
      priceFrom: 140,
      image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80",
      alt: "Melaka river heritage town",
      destinations: ["Melaka City", "Ayer Keroh", "Alor Gajah", "Merlimau"],
    },
    {
      id: "negeri-sembilan",
      name: { en: "Negeri Sembilan", ms: "Negeri Sembilan" },
      priceFrom: 110,
      image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80",
      alt: "Seremban Negeri Sembilan town",
      destinations: ["Seremban", "Port Dickson", "Nilai", "Rembau", "Tampin"],
    },
    {
      id: "pahang",
      name: { en: "Pahang", ms: "Pahang" },
      priceFrom: 160,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
      alt: "Genting Highlands resort Pahang",
      destinations: ["Kuantan", "Genting", "Cameron Highlands", "Bentong", "Raub"],
    },
    {
      id: "kedah",
      name: { en: "Kedah", ms: "Kedah" },
      priceFrom: 230,
      image: "https://images.unsplash.com/photo-1589394815349-06a79b63b7c5?w=600&q=80",
      alt: "Langkawi island Kedah Malaysia",
      destinations: ["Alor Setar", "Langkawi", "Kulim", "Sungai Petani"],
    },
    {
      id: "perlis",
      name: { en: "Perlis", ms: "Perlis" },
      priceFrom: 250,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      alt: "Perlis paddy fields northern Malaysia",
      destinations: ["Kangar", "Padang Besar", "Arau"],
    },
    {
      id: "kelantan",
      name: { en: "Kelantan", ms: "Kelantan" },
      priceFrom: 270,
      image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=600&q=80",
      alt: "Kota Bharu Kelantan cultural town",
      destinations: ["Kota Bharu", "Pasir Mas", "Tanah Merah", "Machang"],
    },
    {
      id: "terengganu",
      name: { en: "Terengganu", ms: "Terengganu" },
      priceFrom: 260,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
      alt: "Terengganu crystal mosque island",
      destinations: ["Kuala Terengganu", "Dungun", "Kemaman", "Besut"],
    },
  ],

  // ─── TOUR PACKAGES ────────────────────────────────────────────────────────
  // To add a new package: copy one block, give it a unique id, update fields.
  tours: [
    {
      id: "hatyai",
      name: { en: "Hatyai, Thailand", ms: "Hatyai, Thailand" },
      priceFrom: 180,
      duration: { en: "2D1N / 3D2N", ms: "2H1M / 3H2M" },
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
      alt: "Hatyai Thailand market street",
      highlights: {
        en: ["Shopping at Kim Yong Market", "Famous night bazaar", "Halal food tour", "Hotel included"],
        ms: ["Membeli belah di Kim Yong Market", "Bazar malam terkenal", "Lawatan makanan halal", "Hotel termasuk"],
      },
    },
    {
      id: "kuala-terengganu",
      name: { en: "Kuala Terengganu", ms: "Kuala Terengganu" },
      priceFrom: 220,
      duration: { en: "2D1N / 3D2N", ms: "2H1M / 3H2M" },
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
      alt: "Kuala Terengganu waterfront and mosque",
      highlights: {
        en: ["Crystal Mosque visit", "Pulau Duyung", "Pasar Payang", "Fresh seafood"],
        ms: ["Lawatan Masjid Kristal", "Pulau Duyung", "Pasar Payang", "Makanan laut segar"],
      },
    },
  ],

  // ─── SERVICES ─────────────────────────────────────────────────────────────
  services: [
    {
      id: "airport",
      icon: "✈️",
      title: { en: "Airport Transfer", ms: "Pemindahan Lapangan Terbang" },
      desc: {
        en: "Door-to-door service from KLIA/KLIA2 to anywhere in Malaysia. 24/7 availability.",
        ms: "Servis pintu ke pintu dari KLIA/KLIA2 ke seluruh Malaysia. Tersedia 24/7.",
      },
      priceFrom: 80,
    },
    {
      id: "interstate",
      icon: "🚐",
      title: { en: "Interstate Transfer", ms: "Pemindahan Antara Negeri" },
      desc: {
        en: "Comfortable shuttle rides between all major Malaysian states. Fixed pricing, no surprises.",
        ms: "Perjalanan selesa antara semua negeri utama Malaysia. Harga tetap, tanpa kejutan.",
      },
      priceFrom: 90,
    },
    {
      id: "tour",
      icon: "🗺️",
      title: { en: "Tour Packages", ms: "Pakej Pelancongan" },
      desc: {
        en: "Curated tours to popular destinations. Transport + accommodation packages available.",
        ms: "Lawatan ke destinasi popular. Pakej pengangkutan + penginapan tersedia.",
      },
      priceFrom: 180,
    },
  ],

  // ─── WHY US ───────────────────────────────────────────────────────────────
  whyUs: [
    { icon: "🛡️", en: "Licensed & Insured",    ms: "Berlesen & Diinsuranskan" },
    { icon: "🕐", en: "24/7 Service",           ms: "Servis 24/7" },
    { icon: "👨‍✈️", en: "Pro Drivers",          ms: "Pemandu Profesional" },
    { icon: "💺", en: "Comfortable Vehicles",   ms: "Kenderaan Selesa" },
    { icon: "💰", en: "Fixed Pricing",           ms: "Harga Tetap" },
    { icon: "📍", en: "Door-to-Door",            ms: "Pintu ke Pintu" },
  ],

  // ─── TRANSLATIONS ─────────────────────────────────────────────────────────
  i18n: {
    en: {
      nav_home:      "Home",
      nav_services:  "Services",
      nav_states:    "Destinations",
      nav_tours:     "Tour Packages",
      nav_book:      "Book Now",
      hero_tag:      "Malaysia's Trusted Shuttle",
      hero_h1:       "Book Your Ride,\nWe Drive You There",
      hero_sub:      "Affordable, safe & reliable shuttle service across Malaysia",
      hero_cta:      "Book on WhatsApp",
      hero_cta2:     "View Destinations",
      services_h:    "Our Services",
      from:          "From",
      rm:            "RM",
      per_trip:      "/ trip",
      states_h:      "Select Your Destination",
      states_sub:    "Click a state to book your transfer",
      tours_h:       "Tour Packages",
      tours_sub:     "Fully guided trips — just sit back and enjoy",
      book_h:        "Book Your Transfer",
      book_sub:      "Fill the form and we'll contact you instantly",
      form_name:     "Full Name",
      form_phone:    "Phone Number",
      form_pickup:   "Pickup Location",
      form_dest:     "Destination",
      form_date:     "Travel Date & Time",
      form_service:  "Service Type",
      form_pax:      "No. of Passengers",
      form_notes:    "Additional Notes",
      form_submit:   "Send via WhatsApp",
      form_email:    "Send via Email",
      why_h:         "Why Choose JomShuttle?",
      footer_tagline:"Book now and let us drive you there!",
      highlights:    "Highlights",
      book_this:     "Book This Tour",
      view_all:      "View All",
    },
    ms: {
      nav_home:      "Utama",
      nav_services:  "Perkhidmatan",
      nav_states:    "Destinasi",
      nav_tours:     "Pakej Pelancongan",
      nav_book:      "Tempah Sekarang",
      hero_tag:      "Shuttle Terpercaya Malaysia",
      hero_h1:       "Tempah Perjalanan,\nKami Yang Pandu",
      hero_sub:      "Perkhidmatan shuttle mampu milik, selamat & boleh dipercayai di seluruh Malaysia",
      hero_cta:      "Tempah di WhatsApp",
      hero_cta2:     "Lihat Destinasi",
      services_h:    "Perkhidmatan Kami",
      from:          "Dari",
      rm:            "RM",
      per_trip:      "/ perjalanan",
      states_h:      "Pilih Destinasi Anda",
      states_sub:    "Klik negeri untuk menempah pemindahan anda",
      tours_h:       "Pakej Pelancongan",
      tours_sub:     "Perjalanan berpandu — duduk dan nikmati sahaja",
      book_h:        "Tempah Pemindahan Anda",
      book_sub:      "Isi borang dan kami akan menghubungi anda segera",
      form_name:     "Nama Penuh",
      form_phone:    "Nombor Telefon",
      form_pickup:   "Lokasi Pickup",
      form_dest:     "Destinasi",
      form_date:     "Tarikh & Masa Perjalanan",
      form_service:  "Jenis Perkhidmatan",
      form_pax:      "Bilangan Penumpang",
      form_notes:    "Nota Tambahan",
      form_submit:   "Hantar via WhatsApp",
      form_email:    "Hantar via Email",
      why_h:         "Kenapa Pilih JomShuttle?",
      footer_tagline:"Tempah sekarang dan biar kami pandu anda!",
      highlights:    "Sorotan",
      book_this:     "Tempah Pakej Ini",
      view_all:      "Lihat Semua",
    },
  },
};
