export type SupportedLanguage = 'en' | 'hi' | 'hinglish';

export interface Translations {
  // Navigation & Header
  brandTagline: string;
  goodMorning: string;
  welcomeBack: string;
  selectCity: string;
  careGold: string;
  walletPill: string;
  myProfile: string;
  bookingHistory: string;
  careGoldPass: string;
  helpSupport: string;
  signOut: string;
  demoOtpNotice: string;
  roleCustomer: string;
  rolePro: string;
  roleAdmin: string;
  roleLabel: string;
  undo: string;
  undoSuccess: string;

  // Bottom Nav
  navHome: string;
  navExplore: string;
  navBookings: string;
  navWallet: string;
  navProfile: string;
  vihaanConcierge: string;

  // Search
  searchPlaceholder: string;
  searchServicesCount: string;
  searchClear: string;
  searchVoiceTitle: string;
  searchNoResults: string;

  // Hero Banners
  bannerFirstBookingTitle: string;
  bannerFirstBookingSubtitle: string;
  bannerCleaningTitle: string;
  bannerCleaningSubtitle: string;
  bannerCareTitle: string;
  bannerCareSubtitle: string;
  specialOfferBadge: string;
  weekendSpecialBadge: string;
  membershipBadge: string;
  bookNowCta: string;
  viewOfferCta: string;
  joinNowCta: string;

  // Sections
  browseServices: string;
  viewAll: string;
  mostPopular: string;
  topRatedBadge: string;
  seeAll: string;
  fromPrice: string;
  bookAgain: string;
  lastBooked: string;
  bookAgainCta: string;
  packagesCombos: string;
  saveUpTo: string;
  saveAmount: string;
  qualityStandardTitle: string;
  qualityStandardSubtitle: string;

  // Care+ Section
  carePlusTitle: string;
  carePlusSubtitle: string;
  carePlusPerMonth: string;
  priorityBooking: string;
  extraDiscount: string;
  freeInspection: string;
  zeroConvenienceFee: string;
  saveYearly: string;

  // Emergency SOS
  emergencyTitle: string;
  emergencyBadge: string;
  emergencyDesc: string;

  // Quality Badges
  verifiedPros: string;
  easyBooking: string;
  warranty7Days: string;
  realtimeTrack: string;
  loyaltyCash: string;
  support24x7: string;

  // Category View
  servicesAvailable: string;
  searchInCategory: string;
  fastTrackFilter: string;
  under500Filter: string;
  sortRecommended: string;
  sortRating: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  bookService: string;

  // Booking Flow Modal
  bookYourService: string;
  selectDate: string;
  selectTimeSlot: string;
  serviceAddress: string;
  addNewAddress: string;
  paymentMethod: string;
  itemTotal: string;
  couponDiscount: string;
  rewardDiscount: string;
  taxesGst: string;
  convenienceFeeLabel: string;
  payableTotal: string;
  continueCta: string;

  // Profile Screen
  profileInfo: string;
  editProfile: string;
  appLanguage: string;
  referEarnTitle: string;
  referEarnDesc: string;

  // Live Tracking
  liveStatus: string;
  arrivingIn: string;
  onTheWay: string;
  trackCta: string;

  // Categories
  catSalon: string;
  catBeauty: string;
  catSpa: string;
  catCleaning: string;
  catRepair: string;
  catPestControl: string;
  catHomeImprovement: string;
  catMoving: string;
  catTechServices: string;
  catEmergency: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    brandTagline: 'Your Home, Our Care',
    goodMorning: 'Good Morning 👋',
    welcomeBack: 'Welcome back 👋',
    selectCity: 'Select City',
    careGold: 'Care+ Gold',
    walletPill: 'Wallet',
    myProfile: 'My Profile',
    bookingHistory: 'Booking History',
    careGoldPass: 'Care+ Gold Pass',
    helpSupport: 'Help & Support',
    signOut: 'Sign Out',
    demoOtpNotice: 'Demo OTP: 123456',
    roleCustomer: 'Customer (Rahul)',
    rolePro: 'Partner (Rohit)',
    roleAdmin: 'Super Admin',
    roleLabel: 'Role:',
    undo: 'Undo',
    undoSuccess: 'Action undone successfully',

    navHome: 'Home',
    navExplore: 'Explore',
    navBookings: 'Bookings',
    navWallet: 'Wallet',
    navProfile: 'Profile',
    vihaanConcierge: 'Vihaan Concierge',

    searchPlaceholder: 'Search home repair, salon, deep cleaning...',
    searchServicesCount: 'Services',
    searchClear: 'Clear',
    searchVoiceTitle: 'Search with Vihaan AI Voice',
    searchNoResults: 'No matching service found. Ask Vihaan Concierge AI!',

    bannerFirstBookingTitle: '20% OFF on First Booking',
    bannerFirstBookingSubtitle: 'Experience 5-star verified home services at your doorstep',
    bannerCleaningTitle: 'Flat ₹200 OFF on Home Cleaning',
    bannerCleaningSubtitle: 'Deep scrub, machine floor buffing & kitchen sanitization',
    bannerCareTitle: 'Vihaan Care+ Gold Pass',
    bannerCareSubtitle: 'Save up to ₹4,000 annually with zero convenience fees',
    specialOfferBadge: 'SPECIAL OFFER',
    weekendSpecialBadge: 'WEEKEND SPECIAL',
    membershipBadge: 'MEMBERSHIP',
    bookNowCta: 'BOOK NOW →',
    viewOfferCta: 'VIEW OFFER →',
    joinNowCta: 'JOIN NOW →',

    browseServices: 'Browse Services',
    viewAll: 'View All',
    mostPopular: 'Most Popular Services',
    topRatedBadge: 'TOP RATED',
    seeAll: 'See All',
    fromPrice: 'from',
    bookAgain: 'Book Again',
    lastBooked: 'Last booked: 24 May',
    bookAgainCta: 'BOOK AGAIN',
    packagesCombos: 'Packages & Combos',
    saveUpTo: 'SAVE UP TO ₹700',
    saveAmount: 'Save',
    qualityStandardTitle: 'The Vihaan Quality Standard',
    qualityStandardSubtitle: 'One App • Many Services • Endless Comfort',

    carePlusTitle: 'Vihaan Care+ Membership',
    carePlusSubtitle: 'Care+ Premium',
    carePlusPerMonth: '₹499 / mo',
    priorityBooking: 'Priority Booking',
    extraDiscount: 'Up to 30% Extra Off',
    freeInspection: 'Free Inspection Visit',
    zeroConvenienceFee: 'Zero Convenience Fee',
    saveYearly: 'Save up to ₹4,000/year',

    emergencyTitle: '90-Min Emergency SOS',
    emergencyBadge: 'FAST SLA',
    emergencyDesc: 'Urgent Plumber, Electrician & Locksmith dispatched in 90 minutes.',

    verifiedPros: 'Verified Pros',
    easyBooking: 'Easy Booking',
    warranty7Days: '7-Day Warranty',
    realtimeTrack: 'Real-Time Track',
    loyaltyCash: 'Loyalty Cash',
    support24x7: '24x7 Support',

    servicesAvailable: 'options available',
    searchInCategory: 'Search in',
    fastTrackFilter: '90-Min Fast Track',
    under500Filter: 'Under ₹500',
    sortRecommended: '⭐ Recommended',
    sortRating: 'Top Rated (4.8+)',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    bookService: 'Book Service',

    bookYourService: 'Book Your Service',
    selectDate: 'Select Date',
    selectTimeSlot: 'Select Time Slot',
    serviceAddress: 'Service Address',
    addNewAddress: 'Add New Address',
    paymentMethod: 'Payment Method',
    itemTotal: 'Item Total',
    couponDiscount: 'Coupon Discount',
    rewardDiscount: 'Reward Points Discount',
    taxesGst: 'Taxes & GST (5%)',
    convenienceFeeLabel: 'Convenience Fee',
    payableTotal: 'Payable Total',
    continueCta: 'Continue',

    profileInfo: 'Profile Information',
    editProfile: 'Edit Profile',
    appLanguage: 'App Language / भाषा',
    referEarnTitle: 'Refer & Earn ₹200',
    referEarnDesc: 'Share your invite code with friends',

    liveStatus: 'LIVE STATUS',
    arrivingIn: 'Arriving in 18 mins',
    onTheWay: 'is On The Way',
    trackCta: 'Track',

    catSalon: 'Salon',
    catBeauty: 'Beauty',
    catSpa: 'Spa',
    catCleaning: 'Cleaning',
    catRepair: 'Repair',
    catPestControl: 'Pest Control',
    catHomeImprovement: 'Home Painting',
    catMoving: 'Packers & Movers',
    catTechServices: 'Tech Support',
    catEmergency: 'Emergency'
  },

  hi: {
    brandTagline: 'आपका घर, हमारी देखभाल',
    goodMorning: 'सुप्रभात 👋',
    welcomeBack: 'वापसी पर स्वागत है 👋',
    selectCity: 'शहर चुनें',
    careGold: 'केयर+ गोल्ड',
    walletPill: 'वॉलेट',
    myProfile: 'मेरी प्रोफाइल',
    bookingHistory: 'बुकिंग इतिहास',
    careGoldPass: 'केयर+ गोल्ड पास',
    helpSupport: 'मदद और सहायता',
    signOut: 'साइन आउट',
    demoOtpNotice: 'डेमो OTP: 123456',
    roleCustomer: 'ग्राहक (राहुल)',
    rolePro: 'पार्टनर (रोहित)',
    roleAdmin: 'सुपर एडमिन',
    roleLabel: 'रोल:',
    undo: 'वापस लें (Undo)',
    undoSuccess: 'क्रिया वापस ले ली गई',

    navHome: 'होम',
    navExplore: 'एक्सप्लोर',
    navBookings: 'बुकिंग्स',
    navWallet: 'वॉलेट',
    navProfile: 'प्रोफाइल',
    vihaanConcierge: 'विहान कंसीयज AI',

    searchPlaceholder: 'घर की मरम्मत, सैलून, डीप क्लीनिंग खोजें...',
    searchServicesCount: 'सेवाएं',
    searchClear: 'साफ़ करें',
    searchVoiceTitle: 'विहान वॉयस AI से खोजें',
    searchNoResults: 'कोई सेवा नहीं मिली। विहान कंसीयज AI से पूछें!',

    bannerFirstBookingTitle: 'पहली बुकिंग पर 20% की छूट',
    bannerFirstBookingSubtitle: 'अपने घर पर 5-स्टार सत्यापित घरेलू सेवाओं का अनुभव लें',
    bannerCleaningTitle: 'होम क्लीनिंग पर फ्लैट ₹200 की छूट',
    bannerCleaningSubtitle: 'डीप स्क्रबिंग, मशीन फ्लोर पॉलिश और किचन सैनिटाइजेशन',
    bannerCareTitle: 'विहान केयर+ गोल्ड पास',
    bannerCareSubtitle: 'शून्य सुविधा शुल्क के साथ सालाना ₹4,000 तक बचाएं',
    specialOfferBadge: 'विशेष ऑफर',
    weekendSpecialBadge: 'सप्ताहांत ऑफर',
    membershipBadge: 'सदस्यता',
    bookNowCta: 'अभी बुक करें →',
    viewOfferCta: 'ऑफर देखें →',
    joinNowCta: 'अभी जुड़ें →',

    browseServices: 'सेवाएं देखें',
    viewAll: 'सभी देखें',
    mostPopular: 'सबसे लोकप्रिय सेवाएं',
    topRatedBadge: 'टॉप रेटेड',
    seeAll: 'सभी देखें',
    fromPrice: 'शुरुआती',
    bookAgain: 'दोबारा बुक करें',
    lastBooked: 'पिछली बुकिंग: 24 मई',
    bookAgainCta: 'दोबारा बुक करें',
    packagesCombos: 'पैकेज और कॉम्बो',
    saveUpTo: '₹700 तक की बचत',
    saveAmount: 'बचत',
    qualityStandardTitle: 'विहान गुणवत्ता मानक',
    qualityStandardSubtitle: 'एक ऐप • अनेक सेवाएं • असीम सुविधा',

    carePlusTitle: 'विहान केयर+ सदस्यता',
    carePlusSubtitle: 'केयर+ प्रीमियम',
    carePlusPerMonth: '₹499 / माह',
    priorityBooking: 'प्राथमिकता बुकिंग',
    extraDiscount: '30% तक अतिरिक्त छूट',
    freeInspection: 'मुफ्त निरीक्षण विज़िट',
    zeroConvenienceFee: 'शून्य सुविधा शुल्क',
    saveYearly: 'सालाना ₹4,000 तक की बचत',

    emergencyTitle: '90-मिनट इमरजेंसी SOS',
    emergencyBadge: 'तेज़ सेवा',
    emergencyDesc: 'आपातकालीन प्लंबर, इलेक्ट्रीशियन और ताला बनाने वाले 90 मिनट में उपलब्ध।',

    verifiedPros: 'सत्यापित प्रोफेशनल्स',
    easyBooking: 'आसान बुकिंग',
    warranty7Days: '7-दिन की वारंटी',
    realtimeTrack: 'लाइव ट्रैकिंग',
    loyaltyCash: 'लॉयल्टी रिवॉर्ड',
    support24x7: '24x7 सहायता',

    servicesAvailable: 'विकल्प उपलब्ध हैं',
    searchInCategory: 'खोजें',
    fastTrackFilter: '90-मिनट फास्ट ट्रैक',
    under500Filter: '₹500 के अंदर',
    sortRecommended: '⭐ अनुशंसित',
    sortRating: 'सर्वोच्च रेटेड (4.8+)',
    sortPriceAsc: 'कीमत: कम से ज्यादा',
    sortPriceDesc: 'कीमत: ज्यादा से कम',
    bookService: 'सेवा बुक करें',

    bookYourService: 'अपनी सेवा बुक करें',
    selectDate: 'तारीख चुनें',
    selectTimeSlot: 'समय स्लॉट चुनें',
    serviceAddress: 'सेवा का पता',
    addNewAddress: 'नया पता जोड़ें',
    paymentMethod: 'भुगतान का तरीका',
    itemTotal: 'कुल राशि',
    couponDiscount: 'कूपन छूट',
    rewardDiscount: 'रिवॉर्ड पॉइंट्स छूट',
    taxesGst: 'टैक्स और जीएसटी (5%)',
    convenienceFeeLabel: 'सुविधा शुल्क',
    payableTotal: 'कुल देय राशि',
    continueCta: 'आगे बढ़ें',

    profileInfo: 'प्रोफाइल जानकारी',
    editProfile: 'प्रोफाइल संपादित करें',
    appLanguage: 'ऐप की भाषा (Language)',
    referEarnTitle: 'रेफर करें और ₹200 पाएं',
    referEarnDesc: 'अपने दोस्तों के साथ इनवाइट कोड शेयर करें',

    liveStatus: 'लाइव स्थिति',
    arrivingIn: '18 मिनट में आगमन',
    onTheWay: 'रास्ते में हैं',
    trackCta: 'ट्रैक करें',

    catSalon: 'सैलून',
    catBeauty: 'ब्यूटी',
    catSpa: 'स्पा',
    catCleaning: 'सफ़ाई',
    catRepair: 'मरम्मत',
    catPestControl: 'कीट नियंत्रण',
    catHomeImprovement: 'पेंटिंग',
    catMoving: 'पैकर्स एंड मूवर्स',
    catTechServices: 'टेक सपोर्ट',
    catEmergency: 'आपातकालीन'
  },

  hinglish: {
    brandTagline: 'Aapka Ghar, Hamari Care',
    goodMorning: 'Good Morning 👋',
    welcomeBack: 'Welcome Back 👋',
    selectCity: 'City Chunein',
    careGold: 'Care+ Gold',
    walletPill: 'Wallet',
    myProfile: 'Meri Profile',
    bookingHistory: 'Booking History',
    careGoldPass: 'Care+ Gold Pass',
    helpSupport: 'Help & Support',
    signOut: 'Sign Out',
    demoOtpNotice: 'Demo OTP: 123456',
    roleCustomer: 'Customer (Rahul)',
    rolePro: 'Partner (Rohit)',
    roleAdmin: 'Super Admin',
    roleLabel: 'Role:',
    undo: 'Undo Karein',
    undoSuccess: 'Action undo ho gaya',

    navHome: 'Home',
    navExplore: 'Explore',
    navBookings: 'Bookings',
    navWallet: 'Wallet',
    navProfile: 'Profile',
    vihaanConcierge: 'Vihaan Concierge AI',

    searchPlaceholder: 'Ghar ki repair, salon, deep cleaning search karein...',
    searchServicesCount: 'Services',
    searchClear: 'Clear',
    searchVoiceTitle: 'Vihaan AI Voice se search karein',
    searchNoResults: 'Koi service nahi mili. Vihaan Concierge AI se puchein!',

    bannerFirstBookingTitle: 'First Booking par 20% OFF',
    bannerFirstBookingSubtitle: 'Ghar par paayein 5-star verified home services',
    bannerCleaningTitle: 'Home Cleaning par Flat ₹200 OFF',
    bannerCleaningSubtitle: 'Deep scrubbing, machine floor buffing aur kitchen clean',
    bannerCareTitle: 'Vihaan Care+ Gold Pass',
    bannerCareSubtitle: 'Zero convenience fees ke saath saalana ₹4,000 tak bachayein',
    specialOfferBadge: 'SPECIAL OFFER',
    weekendSpecialBadge: 'WEEKEND SPECIAL',
    membershipBadge: 'MEMBERSHIP',
    bookNowCta: 'ABHI BOOK KAREIN →',
    viewOfferCta: 'OFFER DEKHEIN →',
    joinNowCta: 'JOIN KAREIN →',

    browseServices: 'Services Browse Karein',
    viewAll: 'Sabhi Dekhein',
    mostPopular: 'Sabse Popular Services',
    topRatedBadge: 'TOP RATED',
    seeAll: 'Sabhi Dekhein',
    fromPrice: 'se shuru',
    bookAgain: 'Dobara Book Karein',
    lastBooked: 'Aakhri booking: 24 May',
    bookAgainCta: 'BOOK AGAIN',
    packagesCombos: 'Packages aur Combos',
    saveUpTo: '₹700 TAK BACHAYEIN',
    saveAmount: 'Bachayein',
    qualityStandardTitle: 'Vihaan Quality Standard',
    qualityStandardSubtitle: 'Ek App • Multiple Services • Pura Aaram',

    carePlusTitle: 'Vihaan Care+ Membership',
    carePlusSubtitle: 'Care+ Premium',
    carePlusPerMonth: '₹499 / month',
    priorityBooking: 'Priority Booking',
    extraDiscount: '30% tak Extra Discount',
    freeInspection: 'Free Inspection Visit',
    zeroConvenienceFee: 'Zero Convenience Fee',
    saveYearly: 'Saalana ₹4,000 tak bachayein',

    emergencyTitle: '90-Min Emergency SOS',
    emergencyBadge: 'FAST SLA',
    emergencyDesc: 'Urgent Plumber, Electrician aur Locksmith 90 minutes mein.',

    verifiedPros: 'Verified Pros',
    easyBooking: 'Easy Booking',
    warranty7Days: '7-Day Warranty',
    realtimeTrack: 'Real-Time Track',
    loyaltyCash: 'Loyalty Cash',
    support24x7: '24x7 Support',

    servicesAvailable: 'options uplabdh hain',
    searchInCategory: 'Search karein',
    fastTrackFilter: '90-Min Fast Track',
    under500Filter: '₹500 ke andar',
    sortRecommended: '⭐ Recommended',
    sortRating: 'Top Rated (4.8+)',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    bookService: 'Service Book Karein',

    bookYourService: 'Apni Service Book Karein',
    selectDate: 'Date Chunein',
    selectTimeSlot: 'Time Slot Chunein',
    serviceAddress: 'Service Address',
    addNewAddress: 'Naya Address Add Karein',
    paymentMethod: 'Payment Method',
    itemTotal: 'Item Total',
    couponDiscount: 'Coupon Discount',
    rewardDiscount: 'Reward Points Discount',
    taxesGst: 'Taxes aur GST (5%)',
    convenienceFeeLabel: 'Convenience Fee',
    payableTotal: 'Payable Amount',
    continueCta: 'Aage Badhein',

    profileInfo: 'Profile Information',
    editProfile: 'Profile Edit Karein',
    appLanguage: 'App Language / Bhasha',
    referEarnTitle: 'Refer Karein aur ₹200 Paayein',
    referEarnDesc: 'Apne doston ke saath invite code share karein',

    liveStatus: 'LIVE STATUS',
    arrivingIn: '18 mins mein pahuchenge',
    onTheWay: 'Raste mein hain',
    trackCta: 'Track',

    catSalon: 'Salon',
    catBeauty: 'Beauty',
    catSpa: 'Spa',
    catCleaning: 'Cleaning',
    catRepair: 'Repair',
    catPestControl: 'Pest Control',
    catHomeImprovement: 'Home Painting',
    catMoving: 'Packers & Movers',
    catTechServices: 'Tech Support',
    catEmergency: 'Emergency SOS'
  }
};
