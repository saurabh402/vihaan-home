// Vihaan Home Services - Comprehensive Type Definitions

export type UserRole = 'CUSTOMER' | 'PROFESSIONAL' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  city?: string;
  gender?: 'male' | 'female' | 'other';
  preferredLanguage?: 'en' | 'hi' | 'hinglish';
  createdAt: string;
}

export interface Customer extends User {
  role: 'CUSTOMER';
  addresses: Address[];
  walletBalance: number;
  rewardPoints: number;
  membership: CareMembership;
  referralCode: string;
  referralEarnings: number;
  favorites: {
    serviceIds: string[];
    professionalIds: string[];
  };
}

export interface Professional extends User {
  role: 'PROFESSIONAL';
  category: string;
  specializations: string[];
  rating: number;
  reviewCount: number;
  experienceYears: number;
  completedJobsCount: number;
  languages: string[];
  isVerified: boolean;
  kycStatus: 'pending' | 'verified' | 'rejected';
  kycDocuments?: {
    govtId?: string;
    addressProof?: string;
    certificate?: string;
    bankAccount?: {
      accountNumber: string;
      ifsc: string;
      bankName: string;
    };
  };
  isAvailable: boolean;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
  todayEarnings: number;
  todayJobsCount: number;
  completedTodayCount: number;
  pendingTodayCount: number;
  totalEarnings: number;
  portfolioImages: string[];
  currentLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  image: string;
  serviceCount: number;
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  galleryImages: string[];
  price: number;
  originalPrice: number;
  discountPercentage: number;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isEmergency?: boolean;
  serviceType: 'at_home' | 'pickup_drop';
  includedItems: string[];
  excludedItems: string[];
  benefits: string[];
  safetyInfo: string[];
  faqs: { question: string; answer: string }[];
  warrantyDays: number;
  status: 'active' | 'inactive';
}

export interface Address {
  id: string;
  label: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  flat: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pin: string;
  landmark?: string;
  isDefault?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROFESSIONAL_ASSIGNED'
  | 'ON_THE_WAY'
  | 'SERVICE_STARTED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'UPI' | 'CARD' | 'NET_BANKING' | 'WALLET' | 'CASH';

export interface Booking {
  id: string;
  bookingCode: string; // e.g. "VH24561"
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: Address;
  service: ServiceItem;
  quantity: number;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTimeSlot: string; // e.g. "11:00 AM - 12:00 PM"
  assignedProfessional?: {
    id: string;
    name: string;
    phone: string;
    avatar: string;
    rating: number;
    category: string;
    vehicleNumber?: string;
    currentEtaMins?: number;
    currentLocation?: { lat: number; lng: number };
  };
  status: BookingStatus;
  statusTimeline: {
    status: BookingStatus;
    label: string;
    timestamp: string;
    completed: boolean;
  }[];
  priceBreakdown: {
    servicePrice: number;
    discount: number;
    couponDiscount: number;
    rewardPointsDiscount: number;
    emergencyFee?: number;
    taxes: number;
    convenienceFee: number;
    totalAmount: number;
  };
  couponApplied?: Coupon;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  isEmergencyBooking?: boolean;
  startOtp?: string; // 4-digit start code
  serviceNotes?: string;
  serviceProofImages?: string[];
  warrantyDetails?: ServiceWarranty;
  customerReview?: ServiceReview;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceReview {
  id: string;
  bookingId: string;
  serviceId: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  professionalId: string;
  rating: number;
  reviewText: string;
  aspects: {
    serviceQuality: number;
    behavior: number;
    timeliness: number;
    valueForMoney: number;
  };
  photos?: string[];
  createdAt: string;
}

export interface ServiceWarranty {
  warrantyId: string;
  bookingId: string;
  serviceName: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  coveredIssues: string[];
  claimStatus?: 'NONE' | 'CLAIM_RAISED' | 'INSPECTION_SCHEDULED' | 'RESOLVED';
  claimDetails?: {
    reason: string;
    raisedAt: string;
    resolutionNotes?: string;
  };
}

export interface WalletTransaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  title: string;
  amount: number;
  source: 'CASHBACK' | 'REFERRAL_BONUS' | 'BOOKING_PAYMENT' | 'WALLET_RELOAD' | 'REFUND';
  referenceId?: string;
  timestamp: string;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  validUntil: string;
  applicableCategorySlugs?: string[];
  usageCount: number;
  maxUsageLimit: number;
}

export interface OfferBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  targetCategorySlug?: string;
  couponCode?: string;
  imageUrl: string;
  bgColor?: string;
}

export interface CareMembership {
  tier: 'FREE' | 'GOLD' | 'PLATINUM';
  tierName: string;
  isActive: boolean;
  expiresAt?: string;
  benefits: string[];
  monthlyPrice: number;
  annualPrice: number;
}

export interface ChatMessage {
  id: string;
  bookingId?: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  imageUrl?: string;
  location?: { lat: number; lng: number; label: string };
  audioUrl?: string;
  isQuickReply?: boolean;
  isRead: boolean;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. "TKT-8902"
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingId?: string;
  category: 'Booking Issues' | 'Payment Issues' | 'Refund Issues' | 'Professional Issues' | 'Warranty' | 'Membership' | 'Account Issues';
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  messages: {
    senderRole: 'CUSTOMER' | 'SUPPORT' | 'ADMIN';
    senderName: string;
    message: string;
    timestamp: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'BOOKING' | 'OFFER' | 'WALLET' | 'SUPPORT' | 'MEMBERSHIP' | 'SECURITY';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface ServicePackageCombo {
  id: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  comboPrice: number;
  savings: number;
  servicesIncluded: string[];
  image: string;
  popularBadge?: string;
}

export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  serviceSuggestions?: ServiceItem[];
  bookingActionPayload?: {
    serviceId: string;
    suggestedDate?: string;
  };
  timestamp: string;
}
