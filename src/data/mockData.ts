import {
  Customer,
  Professional,
  User,
  ServiceCategory,
  ServiceItem,
  Coupon,
  OfferBanner,
  Booking,
  ServicePackageCombo,
  SupportTicket,
  NotificationItem
} from '../types';

export const CITIES_LIST = [
  'Bhopal, MP',
  'Lucknow, UP',
  'Delhi NCR',
  'Noida, UP',
  'Gurgaon, HR',
  'Bengaluru, KA',
  'Mumbai, MH',
  'Pune, MH',
  'Hyderabad, TS'
];

export const DEMO_USERS: {
  customer: Customer;
  professional: Professional;
  admin: User;
} = {
  customer: {
    id: 'usr_cust_01',
    name: 'Rahul Sharma',
    email: 'customer@vihaan.demo',
    phone: '+91 98765 43210',
    role: 'CUSTOMER',
    city: 'Bhopal, MP',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    gender: 'male',
    preferredLanguage: 'en',
    createdAt: '2024-01-15T10:00:00Z',
    walletBalance: 1250,
    rewardPoints: 650,
    referralCode: 'RAHUL200',
    referralEarnings: 600,
    membership: {
      tier: 'GOLD',
      tierName: 'Vihaan Care+ Gold',
      isActive: true,
      expiresAt: '2025-05-24T00:00:00Z',
      monthlyPrice: 499,
      annualPrice: 4999,
      benefits: [
        'Priority Booking & 90-min express slot',
        'Exclusive VIP Offers up to 30% extra discount',
        'Free 1-time inspection visit every quarter',
        'No convenience fee on all bookings',
        'Birthday special gift hamper & ₹500 cashback',
        'Dedicated VIP Priority Support Line'
      ]
    },
    addresses: [
      {
        id: 'addr_01',
        label: 'Home',
        name: 'Rahul Sharma',
        phone: '+91 98765 43210',
        flat: 'Flat 402, Royal Residency',
        street: '125, Shakti Nagar, Near Chetak Bridge',
        area: 'Shakti Nagar',
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        pin: '462024',
        landmark: 'Near Chetak Bridge Square',
        isDefault: true,
        coordinates: { lat: 23.2599, lng: 77.4126 }
      },
      {
        id: 'addr_02',
        label: 'Work',
        name: 'Rahul Sharma',
        phone: '+91 98765 43210',
        flat: 'Suite 3B, Tech Park',
        street: 'Arera Colony Phase 2',
        area: 'Arera Colony',
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        pin: '462016',
        landmark: 'Opposite Aura Mall',
        isDefault: false,
        coordinates: { lat: 23.2156, lng: 77.4304 }
      }
    ],
    favorites: {
      serviceIds: ['srv_haircut_01', 'srv_cleaning_01'],
      professionalIds: ['pro_rohit_01']
    }
  },
  professional: {
    id: 'pro_rohit_01',
    name: 'Rohit Kumar',
    email: 'professional@vihaan.demo',
    phone: '+91 98123 45678',
    role: 'PROFESSIONAL',
    city: 'Bhopal, MP',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    gender: 'male',
    preferredLanguage: 'en',
    createdAt: '2023-08-10T10:00:00Z',
    category: 'Beauty & Salon',
    specializations: ['Expert Barber', 'Hair Styling', 'Beard Sculpting', 'Head Massage'],
    rating: 4.9,
    reviewCount: 384,
    experienceYears: 5,
    completedJobsCount: 1240,
    languages: ['Hindi', 'English'],
    isVerified: true,
    kycStatus: 'verified',
    kycDocuments: {
      govtId: 'AADHAAR-XXXX-4921.pdf',
      addressProof: 'ELECTRICITY-BILL.pdf',
      certificate: 'HABIB_SALON_ACADEMY_DIPLOMA.pdf',
      bankAccount: {
        accountNumber: '91823901239102',
        ifsc: 'HDFC0001920',
        bankName: 'HDFC Bank Ltd, MP Nagar Branch'
      }
    },
    isAvailable: true,
    workingHours: {
      start: '09:00 AM',
      end: '08:00 PM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    todayEarnings: 2450,
    todayJobsCount: 6,
    completedTodayCount: 4,
    pendingTodayCount: 2,
    totalEarnings: 84600,
    portfolioImages: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&auto=format&fit=crop&q=80'
    ],
    currentLocation: {
      lat: 23.255,
      lng: 77.418,
      address: 'Near MP Nagar Zone II, Bhopal'
    }
  },
  admin: {
    id: 'usr_admin_01',
    name: 'Sanjay Verma',
    email: 'admin@vihaan.demo',
    phone: '+91 99999 88888',
    role: 'ADMIN',
    city: 'Bhopal, MP',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    preferredLanguage: 'en',
    createdAt: '2023-01-01T00:00:00Z'
  }
};

export const PROS_LIST: Professional[] = [
  DEMO_USERS.professional,
  {
    id: 'pro_neha_02',
    name: 'Neha Sharma',
    email: 'neha.sharma@vihaan.demo',
    phone: '+91 98234 56789',
    role: 'PROFESSIONAL',
    city: 'Bhopal, MP',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    gender: 'female',
    createdAt: '2023-09-01T00:00:00Z',
    category: 'Beauty & Salon',
    specializations: ['Bridal Makeup', 'O3+ Facial', 'Waxing & Pedicure'],
    rating: 4.95,
    reviewCount: 412,
    experienceYears: 6,
    completedJobsCount: 1530,
    languages: ['Hindi', 'English'],
    isVerified: true,
    kycStatus: 'verified',
    isAvailable: true,
    workingHours: { start: '08:00 AM', end: '07:00 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    todayEarnings: 3100,
    todayJobsCount: 5,
    completedTodayCount: 3,
    pendingTodayCount: 2,
    totalEarnings: 98400,
    portfolioImages: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'pro_arjun_03',
    name: 'Arjun Singh',
    email: 'arjun.singh@vihaan.demo',
    phone: '+91 98345 67890',
    role: 'PROFESSIONAL',
    city: 'Bhopal, MP',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    gender: 'male',
    createdAt: '2023-09-01T00:00:00Z',
    category: 'Repair & Maintenance',
    specializations: ['AC Deep Jet Service', 'Refrigerator Repair', 'Inverter PCB Fix'],
    rating: 4.88,
    reviewCount: 289,
    experienceYears: 7,
    completedJobsCount: 980,
    languages: ['Hindi', 'English'],
    isVerified: true,
    kycStatus: 'verified',
    isAvailable: true,
    workingHours: { start: '08:30 AM', end: '08:30 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    todayEarnings: 2800,
    todayJobsCount: 4,
    completedTodayCount: 3,
    pendingTodayCount: 1,
    totalEarnings: 112000,
    portfolioImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'pro_pooja_04',
    name: 'Pooja Verma',
    email: 'pooja.verma@vihaan.demo',
    phone: '+91 98456 78901',
    role: 'PROFESSIONAL',
    city: 'Bhopal, MP',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    gender: 'female',
    createdAt: '2023-09-01T00:00:00Z',
    category: 'Home Cleaning',
    specializations: ['Full Villa Cleaning', 'Intense Kitchen Degreasing', 'Sofa Deep Shampoo'],
    rating: 4.92,
    reviewCount: 340,
    experienceYears: 4,
    completedJobsCount: 840,
    languages: ['Hindi', 'English'],
    isVerified: true,
    kycStatus: 'verified',
    isAvailable: true,
    workingHours: { start: '09:00 AM', end: '06:00 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    todayEarnings: 2100,
    todayJobsCount: 3,
    completedTodayCount: 2,
    pendingTodayCount: 1,
    totalEarnings: 67500,
    portfolioImages: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'pro_vikram_05',
    name: 'Vikram Rathore',
    email: 'vikram.rathore@vihaan.demo',
    phone: '+91 98567 89012',
    role: 'PROFESSIONAL',
    city: 'Bhopal, MP',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    gender: 'male',
    createdAt: '2023-09-01T00:00:00Z',
    category: 'Emergency Services',
    specializations: ['90-min Fast Plumber', 'Short Circuit SOS', 'Emergency Locksmith'],
    rating: 4.98,
    reviewCount: 520,
    experienceYears: 9,
    completedJobsCount: 2150,
    languages: ['Hindi', 'English'],
    isVerified: true,
    kycStatus: 'verified',
    isAvailable: true,
    workingHours: { start: '00:00', end: '23:59', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    todayEarnings: 4200,
    todayJobsCount: 7,
    completedTodayCount: 5,
    pendingTodayCount: 2,
    totalEarnings: 154000,
    portfolioImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80'
    ]
  }
];

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat_salon',
    name: 'Salon',
    slug: 'salon',
    iconName: 'Scissors',
    description: 'Men & Women Haircuts, Styling & Beard Grooming at home',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=80',
    serviceCount: 14,
    popular: true
  },
  {
    id: 'cat_beauty',
    name: 'Beauty',
    slug: 'beauty',
    iconName: 'Sparkles',
    description: 'Facials, Manicure, Pedicure, Waxing & Bridal Makeup',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80',
    serviceCount: 18,
    popular: true
  },
  {
    id: 'cat_spa',
    name: 'Spa',
    slug: 'spa',
    iconName: 'Flower2',
    description: 'Full Body Massage, Ayurvedic Therapy & Stress Relief',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&auto=format&fit=crop&q=80',
    serviceCount: 9,
    popular: true
  },
  {
    id: 'cat_cleaning',
    name: 'Cleaning',
    slug: 'cleaning',
    iconName: 'SprayCan',
    description: 'Deep Home, Bathroom, Kitchen, Sofa & Move-in Cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
    serviceCount: 16,
    popular: true
  },
  {
    id: 'cat_repair',
    name: 'Repair',
    slug: 'repair',
    iconName: 'Wrench',
    description: 'AC, Refrigerator, Washing Machine, Geyser, RO & TV Repair',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
    serviceCount: 22,
    popular: true
  },
  {
    id: 'cat_pest',
    name: 'Pest Control',
    slug: 'pest-control',
    iconName: 'ShieldAlert',
    description: 'Cockroach, Termite, Bed Bug & Mosquito safe treatments',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80',
    serviceCount: 8
  },
  {
    id: 'cat_improvement',
    name: 'Home Decor',
    slug: 'home-improvement',
    iconName: 'Paintbrush',
    description: 'Painting, False Ceiling, Waterproofing & Furniture Assembly',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80',
    serviceCount: 12
  },
  {
    id: 'cat_moving',
    name: 'Packers & Movers',
    slug: 'moving',
    iconName: 'Truck',
    description: 'Local House Shifting, Office Moving & Safe Transportation',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80',
    serviceCount: 7
  },
  {
    id: 'cat_tech',
    name: 'Tech Services',
    slug: 'tech-services',
    iconName: 'Laptop',
    description: 'Laptop repair, Wi-Fi Setup, CCTV Installation & Smart Home',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=80',
    serviceCount: 11
  },
  {
    id: 'cat_emergency',
    name: 'Emergency SOS',
    slug: 'emergency',
    iconName: 'Zap',
    description: '90-min fast plumber, electrician, lock repair & water leak fix',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
    serviceCount: 6,
    popular: true
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv_haircut_01',
    categoryId: 'cat_salon',
    name: 'Premium Haircut',
    description: 'Complete bespoke styling session with hair wash, blow dry, beard touch-up and luxury hair serum finish.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80'
    ],
    price: 299,
    originalPrice: 399,
    discountPercentage: 30,
    durationMinutes: 60,
    rating: 4.8,
    reviewCount: 1256,
    isPopular: true,
    serviceType: 'at_home',
    includedItems: [
      'Single-use sterile sheet & salon cape',
      'Hair Wash with organic tea tree shampoo',
      'Customized Haircut & Scissor fade styling',
      'Beard line shaping & after-shave soothing balm',
      'Relaxing 5-minute scalp vibration massage',
      'Post-service area cleanup guarantee'
    ],
    excludedItems: [
      'Hair Coloring or Root Touch-up (available as add-on)',
      'Hair Keratin / Botox treatment'
    ],
    benefits: [
      'Top-rated certified barbers with 5+ years experience',
      'Sanitized 100% disposable kit opened in front of you',
      'Mess-free floor sheet for 100% clean floors after service'
    ],
    safetyInfo: [
      'Temperature checks & sanitized scissors/clippers',
      'Single-use disposable towels and blade covers'
    ],
    faqs: [
      {
        question: 'Do I need to arrange anything beforehand?',
        answer: 'Just a comfortable chair and a nearby power outlet. Our professional brings all sterile kits, sheets, and mirror lights.'
      },
      {
        question: 'Is cleanup included in this service?',
        answer: 'Yes! Our barbers use large floor catch sheets and will vacuum/sweep the entire area before leaving.'
      }
    ],
    warrantyDays: 7,
    status: 'active'
  },
  {
    id: 'srv_cleaning_01',
    categoryId: 'cat_cleaning',
    name: 'Deep Home Cleaning',
    description: 'Intense machine-assisted deep scrubbing of all rooms, kitchen degreasing, bathroom descaling & floor buffing.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&auto=format&fit=crop&q=80'
    ],
    price: 899,
    originalPrice: 1299,
    discountPercentage: 30,
    durationMinutes: 180,
    rating: 4.9,
    reviewCount: 2410,
    isPopular: true,
    serviceType: 'at_home',
    includedItems: [
      'All rooms dry/wet vacuuming with HEPA filter',
      'Kitchen chimney, stove & tile degreasing',
      'Bathroom hard water stain removal & sanitization',
      'Window glass streak-free wiping',
      'Balcony washing & floor machine buffing'
    ],
    excludedItems: [
      'Terrace power wash (available as add-on)',
      'Wall repainting'
    ],
    benefits: [
      'Diversey/Taski hospital-grade non-toxic chemicals',
      'Trained 2-person specialist cleaning squad',
      '100% spotless check inspection before completion'
    ],
    safetyInfo: ['Eco-friendly pet-safe chemicals', 'Shoe covers and safety gear'],
    faqs: [
      {
        question: 'How long does a 2BHK/3BHK deep clean take?',
        answer: 'Typically between 3 to 4 hours depending on the house size and current condition.'
      }
    ],
    warrantyDays: 7,
    status: 'active'
  },
  {
    id: 'srv_spa_01',
    categoryId: 'cat_spa',
    name: 'Full Body Ayurvedic Spa',
    description: 'Swedish + Ayurvedic warm herbal oil therapy to relieve muscular tension, lower cortisol and revitalize energy.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop&q=80'
    ],
    price: 799,
    originalPrice: 1199,
    discountPercentage: 33,
    durationMinutes: 90,
    rating: 4.92,
    reviewCount: 940,
    isPopular: true,
    serviceType: 'at_home',
    includedItems: [
      'Portable massage bed setup with disposable linen',
      'Aromatherapy calming ambient music & diffusers',
      'Warm sesame + lavender essential oil therapy',
      'Deep acupressure for back, neck and shoulders',
      'Hot herbal towel wipe down'
    ],
    excludedItems: ['Medicinal physiotherapy treatment'],
    benefits: ['Relieves stiffness and improves sleep', 'Certified wellness therapists'],
    safetyInfo: ['Strictly gender-aligned verified certified therapists only'],
    faqs: [
      {
        question: 'Do therapists bring their own massage table?',
        answer: 'Yes! We bring a padded portable therapy bed with fresh disposable sheets.'
      }
    ],
    warrantyDays: 3,
    status: 'active'
  },
  {
    id: 'srv_ac_01',
    categoryId: 'cat_repair',
    name: 'AC Power Jet Service & Gas Check',
    description: 'High-pressure water jacket coil cleaning with deep antimicrobial foam for 2X faster cooling and power bill reduction.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80'
    ],
    price: 499,
    originalPrice: 799,
    discountPercentage: 37,
    durationMinutes: 45,
    rating: 4.85,
    reviewCount: 3100,
    isPopular: true,
    serviceType: 'at_home',
    includedItems: [
      'Waterproof spill-jacket mounted around AC indoor unit',
      'High-pressure power jet cleaning of indoor cooling fins',
      'Outdoor condenser unit deep cleaning',
      'Drain tray sanitization & gas pressure leak test',
      'Amperage and cooling temperature delta readout'
    ],
    excludedItems: ['Gas refill refrigerant top-up (billed if required)'],
    benefits: ['30-day comprehensive cooling guarantee', 'Prevents compressor burnout'],
    safetyInfo: ['Insulated tools and safety electrical circuit testing'],
    faqs: [
      {
        question: 'Will the power jet dirty my walls?',
        answer: 'Not at all! We clip a specialized waterproof funnel bag that channels all wastewater directly into a bucket.'
      }
    ],
    warrantyDays: 30,
    status: 'active'
  },
  {
    id: 'srv_beauty_01',
    categoryId: 'cat_beauty',
    name: 'O3+ Glow Facial & Clean-up',
    description: 'Salon-grade botanical brightening facial with deep blackhead extraction, steam, and vitamin C antioxidant mask.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80'
    ],
    price: 649,
    originalPrice: 999,
    discountPercentage: 35,
    durationMinutes: 75,
    rating: 4.9,
    reviewCount: 1650,
    isPopular: true,
    serviceType: 'at_home',
    includedItems: [
      'Gentle cleanser and ultrasonic peeling scrub',
      'Herbal steam therapy and blackhead extraction',
      '15-minute lymphatic drainage facial massage',
      'O3+ Vitamin C brightening rubber peel mask',
      'SPF 50 soothing moisturizer application'
    ],
    excludedItems: ['Chemical acid peel treatments'],
    benefits: ['Instant radiant glow for weddings & parties', 'Authentic sealed single-use packs'],
    safetyInfo: ['Dermatologist tested hypoallergenic serums'],
    faqs: [
      {
        question: 'Are unsealed or leftover products used?',
        answer: 'Never! All product kits are 100% single-dose monodose sachets unsealed right in front of you.'
      }
    ],
    warrantyDays: 7,
    status: 'active'
  },
  {
    id: 'srv_emergency_plumber',
    categoryId: 'cat_emergency',
    name: 'Emergency SOS Plumber (90 Mins)',
    description: 'Priority rapid-dispatch master plumber for urgent pipe bursts, tap leakages, toilet blockages & motor faults.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80'
    ],
    price: 349,
    originalPrice: 499,
    discountPercentage: 30,
    durationMinutes: 60,
    rating: 4.96,
    reviewCount: 880,
    isPopular: true,
    isEmergency: true,
    serviceType: 'at_home',
    includedItems: [
      'Guaranteed doorstep arrival within 90 minutes',
      'Comprehensive fault diagnosis & pressure test',
      'Minor leakage fix, washer replacement, or seal fitting',
      'Emergency valve shut-off and spill control'
    ],
    excludedItems: ['Heavy hardware parts cost (billed transparently at MRP)'],
    benefits: ['90-min fast response SLA', 'Verified background-checked plumbers'],
    safetyInfo: ['Standard transparent rate card with no hidden extra charges'],
    faqs: [
      {
        question: 'What if the technician takes longer than 90 mins?',
        answer: 'In the rare case of delay, the emergency convenience fee is fully waived automatically!'
      }
    ],
    warrantyDays: 14,
    status: 'active'
  },
  {
    id: 'srv_emergency_electrician',
    categoryId: 'cat_emergency',
    name: 'Emergency SOS Electrician (90 Mins)',
    description: 'Instant master electrician for short circuits, tripped MCBs, burnt sockets, inverter breakdown, or power failure.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'
    ],
    price: 349,
    originalPrice: 499,
    discountPercentage: 30,
    durationMinutes: 60,
    rating: 4.94,
    reviewCount: 920,
    isPopular: true,
    isEmergency: true,
    serviceType: 'at_home',
    includedItems: [
      'Emergency short circuit pinpointing & repair',
      'MCB / Fuse replacement inspection',
      'Inverter & battery terminal health check',
      'Wire insulation safety testing'
    ],
    excludedItems: ['Major wiring overhaul across whole building'],
    benefits: ['Equipped with digital multimeters and insulated safety gear'],
    safetyInfo: ['Certified Govt Wireman license holders'],
    faqs: [
      {
        question: 'Can they fix midnight power cuts?',
        answer: 'Yes, our 24x7 SOS emergency fleet is on standby in major city hubs.'
      }
    ],
    warrantyDays: 14,
    status: 'active'
  },
  {
    id: 'srv_pest_01',
    categoryId: 'cat_pest',
    name: 'Herbal Cockroach & Pest Control',
    description: '100% odorless Bayer gel paste treatment targeting hidden roach nests behind kitchen cabinets with 90-day protection.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80'
    ],
    price: 599,
    originalPrice: 899,
    discountPercentage: 33,
    durationMinutes: 50,
    rating: 4.87,
    reviewCount: 1420,
    isPopular: false,
    serviceType: 'at_home',
    includedItems: [
      'Bayer Maxforce roach gel baiting in all cabinets',
      'Ant and spider spray along skirting borders',
      'Drain pipe granule treatment for hidden pipes'
    ],
    excludedItems: ['Termite drill-and-inject treatment (separate package)'],
    benefits: ['No need to empty kitchen boxes or vacate house', 'Pet & baby safe'],
    safetyInfo: ['Odorless, non-staining certified compounds'],
    faqs: [
      {
        question: 'Do I have to empty my kitchen utensils?',
        answer: 'No! The gel spots are tiny and applied only in corners away from utensils.'
      }
    ],
    warrantyDays: 90,
    status: 'active'
  }
];

export const PACKAGE_COMBOS: ServicePackageCombo[] = [
  {
    id: 'combo_home_01',
    title: 'Home Cleaning Super Combo',
    subtitle: 'Full Home + Kitchen Degrease + Bathroom Descaling',
    originalPrice: 2199,
    comboPrice: 1499,
    savings: 700,
    servicesIncluded: [
      'Full Home Machine Deep Scrubbing',
      'Kitchen Chimney & Stove Degreasing',
      '2x Bathroom Stain Removal & Descaling'
    ],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
    popularBadge: 'BEST VALUE'
  },
  {
    id: 'combo_beauty_02',
    title: 'Luxury Beauty & Grooming Combo',
    subtitle: 'Premium Haircut + O3+ Facial + Manicure & Pedicure',
    originalPrice: 1699,
    comboPrice: 999,
    savings: 700,
    servicesIncluded: [
      'Designer Haircut & Styling',
      'O3+ Radiant Glow Facial',
      'Relaxing Herbal Manicure'
    ],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80',
    popularBadge: 'TOP COMBO'
  },
  {
    id: 'combo_ac_03',
    title: 'Complete AC Care Combo',
    subtitle: '2x AC Power Jet Cleaning + Antibacterial Sanitization',
    originalPrice: 1299,
    comboPrice: 799,
    savings: 500,
    servicesIncluded: [
      'Deep Jet Wash for 2 Split ACs',
      'Gas Pressure Readout Check',
      '30-Day Cooling Warranty'
    ],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
    popularBadge: 'SEASON SPECIAL'
  }
];

export const COUPONS: Coupon[] = [
  {
    id: 'cpn_first20',
    code: 'FIRST20',
    title: '20% OFF on First Booking',
    description: 'Get 20% discount up to ₹200 on any home service booking.',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    minOrderValue: 249,
    maxDiscount: 200,
    validUntil: '2026-12-31',
    usageCount: 140,
    maxUsageLimit: 1000
  },
  {
    id: 'cpn_home150',
    code: 'HOME150',
    title: 'Flat ₹150 OFF on Cleaning',
    description: 'Save flat ₹150 on Home Cleaning and Pest Control services.',
    discountType: 'FLAT',
    discountValue: 150,
    minOrderValue: 599,
    validUntil: '2026-12-31',
    applicableCategorySlugs: ['cleaning', 'pest-control'],
    usageCount: 88,
    maxUsageLimit: 500
  },
  {
    id: 'cpn_clean100',
    code: 'CLEAN100',
    title: 'Flat ₹100 OFF on All Orders',
    description: 'Save flat ₹100 instantly on orders above ₹400.',
    discountType: 'FLAT',
    discountValue: 100,
    minOrderValue: 400,
    validUntil: '2026-12-31',
    usageCount: 210,
    maxUsageLimit: 1000
  }
];

export const OFFER_BANNERS: OfferBanner[] = [
  {
    id: 'ban_01',
    title: '20% OFF on First Booking',
    subtitle: 'Experience 5-star verified home services at your doorstep',
    badge: 'SPECIAL OFFER',
    ctaText: 'BOOK NOW →',
    couponCode: 'FIRST20',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    bgColor: 'bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#144E9E]'
  },
  {
    id: 'ban_02',
    title: 'Flat ₹200 OFF on Home Cleaning',
    subtitle: 'Deep scrub, machine floor buffing & kitchen sanitization',
    badge: 'WEEKEND SPECIAL',
    ctaText: 'VIEW OFFER →',
    couponCode: 'HOME150',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
    bgColor: 'bg-gradient-to-r from-[#0B3A78] via-[#1E62C4] to-[#061A33]'
  },
  {
    id: 'ban_03',
    title: 'Vihaan Care+ Gold Pass',
    subtitle: 'Save up to ₹4,000 annually with zero convenience fees',
    badge: 'MEMBERSHIP',
    ctaText: 'JOIN NOW →',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    bgColor: 'bg-gradient-to-r from-[#1A1A1A] via-[#2D2415] to-[#B88A1A]'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk_active_01',
    bookingCode: 'VH24561',
    customerId: 'usr_cust_01',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    customerAddress: DEMO_USERS.customer.addresses[0],
    service: SERVICES[0], // Premium Haircut
    quantity: 1,
    scheduledDate: 'Today',
    scheduledTimeSlot: '11:00 AM',
    assignedProfessional: {
      id: 'pro_rohit_01',
      name: 'Rohit Kumar',
      phone: '+91 98123 45678',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      rating: 4.9,
      category: 'Expert Barber',
      vehicleNumber: 'MP 04 AB 8842',
      currentEtaMins: 18,
      currentLocation: { lat: 23.255, lng: 77.418 }
    },
    status: 'ON_THE_WAY',
    statusTimeline: [
      { status: 'CONFIRMED', label: 'Booking Confirmed', timestamp: '10:30 AM', completed: true },
      { status: 'PROFESSIONAL_ASSIGNED', label: 'Professional Assigned', timestamp: '10:32 AM', completed: true },
      { status: 'ON_THE_WAY', label: 'On The Way (Arriving in 18 mins)', timestamp: '10:45 AM', completed: true },
      { status: 'SERVICE_STARTED', label: 'Service Started', timestamp: '--:--', completed: false },
      { status: 'COMPLETED', label: 'Completed', timestamp: '--:--', completed: false }
    ],
    priceBreakdown: {
      servicePrice: 399,
      discount: 100,
      couponDiscount: 0,
      rewardPointsDiscount: 0,
      taxes: 18,
      convenienceFee: 0,
      totalAmount: 317
    },
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    startOtp: '4821',
    warrantyDetails: {
      warrantyId: 'WAR-VH24561',
      bookingId: 'bk_active_01',
      serviceName: 'Premium Haircut',
      durationDays: 7,
      startDate: '2026-10-08',
      endDate: '2026-10-15',
      coveredIssues: ['Styling touch-up', 'Beard symmetry fix', 'Product allergic reaction check'],
      claimStatus: 'NONE'
    },
    createdAt: '2026-10-08T05:00:00Z',
    updatedAt: '2026-10-08T05:15:00Z'
  },
  {
    id: 'bk_prev_02',
    bookingCode: 'VH18920',
    customerId: 'usr_cust_01',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    customerAddress: DEMO_USERS.customer.addresses[0],
    service: SERVICES[1], // Deep Home Cleaning
    quantity: 1,
    scheduledDate: '24 May 2024',
    scheduledTimeSlot: '02:00 PM',
    assignedProfessional: {
      id: 'pro_pooja_04',
      name: 'Pooja Verma',
      phone: '+91 98456 78901',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      rating: 4.92,
      category: 'Home Cleaning Specialist'
    },
    status: 'COMPLETED',
    statusTimeline: [
      { status: 'CONFIRMED', label: 'Booking Confirmed', timestamp: '24 May, 01:00 PM', completed: true },
      { status: 'PROFESSIONAL_ASSIGNED', label: 'Professional Assigned', timestamp: '24 May, 01:15 PM', completed: true },
      { status: 'ON_THE_WAY', label: 'On The Way', timestamp: '24 May, 01:40 PM', completed: true },
      { status: 'SERVICE_STARTED', label: 'Service Started', timestamp: '24 May, 02:05 PM', completed: true },
      { status: 'COMPLETED', label: 'Completed', timestamp: '24 May, 05:10 PM', completed: true }
    ],
    priceBreakdown: {
      servicePrice: 1299,
      discount: 400,
      couponDiscount: 150,
      rewardPointsDiscount: 0,
      taxes: 45,
      convenienceFee: 0,
      totalAmount: 794
    },
    couponApplied: COUPONS[1],
    paymentMethod: 'WALLET',
    paymentStatus: 'PAID',
    serviceNotes: 'Deep cleaning done with hospital-grade disinfectant. Kitchen tiles and bathroom descaled perfectly.',
    customerReview: {
      id: 'rev_101',
      bookingId: 'bk_prev_02',
      serviceId: 'srv_cleaning_01',
      customerId: 'usr_cust_01',
      customerName: 'Rahul Sharma',
      customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      professionalId: 'pro_pooja_04',
      rating: 5,
      reviewText: 'Exceptional work by Pooja and her team! The kitchen looks brand new and bathroom tiles are sparkling clean.',
      aspects: { serviceQuality: 5, behavior: 5, timeliness: 5, valueForMoney: 5 },
      createdAt: '2024-05-24T18:00:00Z'
    },
    warrantyDetails: {
      warrantyId: 'WAR-VH18920',
      bookingId: 'bk_prev_02',
      serviceName: 'Deep Home Cleaning',
      durationDays: 7,
      startDate: '2024-05-24',
      endDate: '2024-05-31',
      coveredIssues: ['Missed corner spots', 'Streak stains on glass', 'Chemical residue cleanup'],
      claimStatus: 'NONE'
    },
    createdAt: '2024-05-24T07:30:00Z',
    updatedAt: '2024-05-24T12:10:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    userId: 'usr_cust_01',
    title: 'Professional is On The Way! 🛵',
    message: 'Rohit Kumar (Expert Barber) is 18 mins away from your location.',
    type: 'BOOKING',
    isRead: false,
    createdAt: '10 mins ago'
  },
  {
    id: 'notif_02',
    userId: 'usr_cust_01',
    title: '₹120 Booking Cashback Added 💰',
    message: 'Cashback for your completed booking has been credited to your Vihaan Wallet.',
    type: 'WALLET',
    isRead: false,
    createdAt: 'Yesterday'
  },
  {
    id: 'notif_03',
    userId: 'usr_cust_01',
    title: 'Summer AC Cleaning Reminder ❄️',
    message: 'Your AC service was last completed 4 months ago. Book now to save power!',
    type: 'OFFER',
    isRead: true,
    createdAt: '3 days ago'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_01',
    ticketNumber: 'TKT-8942',
    customerId: 'usr_cust_01',
    customerName: 'Rahul Sharma',
    customerEmail: 'customer@vihaan.demo',
    customerPhone: '+91 98765 43210',
    bookingId: 'VH24561',
    category: 'Booking Issues',
    subject: 'Need to add beard trim to my ongoing haircut appointment',
    description: 'Hi, I would like to check if Rohit can also do beard trim in the same visit.',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    messages: [
      {
        senderRole: 'CUSTOMER',
        senderName: 'Rahul Sharma',
        message: 'Hi, I would like to check if Rohit can also do beard trim in the same visit.',
        timestamp: '10:35 AM'
      },
      {
        senderRole: 'SUPPORT',
        senderName: 'Vihaan Support Team',
        message: 'Hello Rahul! Yes, beard trim is already included in your Premium Haircut package at no extra charge. Rohit has been notified!',
        timestamp: '10:38 AM'
      }
    ],
    createdAt: '2026-10-08T05:05:00Z',
    updatedAt: '2026-10-08T05:08:00Z'
  }
];
