import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Customer,
  Professional,
  UserRole,
  ServiceItem,
  ServiceCategory,
  Booking,
  BookingStatus,
  WalletTransaction,
  CareMembership,
  NotificationItem,
  SupportTicket,
  ChatMessage,
  ConciergeMessage,
  Coupon,
  ServiceReview,
  ServiceWarranty
} from '../types';
import {
  DEMO_USERS,
  PROS_LIST,
  CATEGORIES,
  SERVICES,
  COUPONS,
  INITIAL_BOOKINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_TICKETS,
  CITIES_LIST
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Auth & Roles
  currentUser: User;
  currentRole: UserRole;
  customerData: Customer;
  professionalData: Professional;
  allProfessionals: Professional[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  language: 'en' | 'hi' | 'hinglish';
  setLanguage: (lang: 'en' | 'hi' | 'hinglish') => void;
  switchRole: (role: UserRole) => void;
  loginAsDemo: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;

  // App Display Mode
  viewMode: 'mobile-frame' | 'responsive-desktop';
  setViewMode: (mode: 'mobile-frame' | 'responsive-desktop') => void;

  // Catalog
  categories: ServiceCategory[];
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Bookings & State Machine
  bookings: Booking[];
  activeBooking: Booking | null;
  setActiveBooking: (bk: Booking | null) => void;
  createBooking: (bookingData: Partial<Booking>) => Booking;
  updateBookingStatus: (bookingId: string, newStatus: BookingStatus, notes?: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  cancelBooking: (bookingId: string, reason: string) => void;
  addServiceReview: (review: Omit<ServiceReview, 'id' | 'createdAt'>) => void;
  raiseWarrantyClaim: (bookingId: string, reason: string) => void;

  // Professional Specific Actions
  proAcceptJob: (bookingId: string) => void;
  proRejectJob: (bookingId: string) => void;
  proArrived: (bookingId: string) => void;
  proStartService: (bookingId: string, otp: string) => boolean;
  proCompleteService: (bookingId: string, notes: string, proofImg?: string) => void;
  toggleProAvailability: (isAvailable: boolean) => void;
  approveProfessionalKYC: (proId: string) => void;
  rejectProfessionalKYC: (proId: string) => void;

  // Wallet & Loyalty
  walletBalance: number;
  rewardPoints: number;
  walletTransactions: WalletTransaction[];
  addMoneyToWallet: (amount: number) => void;
  redeemPointsForDiscount: (points: number) => number;

  // Care+ Membership
  membership: CareMembership;
  upgradeMembership: (tier: 'GOLD' | 'PLATINUM') => void;
  cancelMembership: () => void;

  // Coupons
  coupons: Coupon[];
  applyCouponCode: (code: string, cartTotal: number) => { success: boolean; coupon?: Coupon; discount: number; message: string };

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;

  // Support
  tickets: SupportTicket[];
  createSupportTicket: (category: SupportTicket['category'], subject: string, description: string) => SupportTicket;
  replyToTicket: (ticketId: string, message: string, senderRole: 'CUSTOMER' | 'SUPPORT' | 'ADMIN') => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;

  // Chat (Customer <-> Pro)
  chatMessages: Record<string, ChatMessage[]>;
  sendChatMessage: (bookingId: string, text: string, options?: { image?: string; location?: any; isQuickReply?: boolean }) => void;

  // AI Concierge
  conciergeMessages: ConciergeMessage[];
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  sendConciergeMessage: (prompt: string) => Promise<void>;
  clearConciergeChat: () => void;

  // UI Modals & Navigation
  activeModal: string | null;
  modalPayload: any;
  openModal: (modalName: string, payload?: any) => void;
  closeModal: () => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // Favorites
  favorites: { serviceIds: string[]; professionalIds: string[] };
  toggleFavoriteService: (serviceId: string) => void;
  toggleFavoritePro: (proId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization
  const [currentRole, setCurrentRole] = useState<UserRole>('CUSTOMER');
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.customer);
  const [customerData, setCustomerData] = useState<Customer>(DEMO_USERS.customer);
  const [professionalData, setProfessionalData] = useState<Professional>(DEMO_USERS.professional);
  const [allProfessionals, setAllProfessionals] = useState<Professional[]>(PROS_LIST);
  const [selectedCity, setSelectedCity] = useState<string>('Bhopal, MP');
  const [language, setLanguage] = useState<'en' | 'hi' | 'hinglish'>('en');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'mobile-frame' | 'responsive-desktop'>('mobile-frame');

  // Core Data
  const [categories, setCategories] = useState<ServiceCategory[]>(CATEGORIES);
  const [services, setServices] = useState<ServiceItem[]>(SERVICES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(INITIAL_BOOKINGS[0]);
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);

  // Wallet
  const [walletBalance, setWalletBalance] = useState<number>(1250);
  const [rewardPoints, setRewardPoints] = useState<number>(650);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([
    {
      id: 'tx_01',
      type: 'CREDIT',
      title: 'Booking Cashback',
      amount: 120,
      source: 'CASHBACK',
      timestamp: '24 May 2024'
    },
    {
      id: 'tx_02',
      type: 'CREDIT',
      title: 'Referral Bonus',
      amount: 200,
      source: 'REFERRAL_BONUS',
      timestamp: '23 May 2024'
    },
    {
      id: 'tx_03',
      type: 'DEBIT',
      title: 'Used on Booking #VH18920',
      amount: 299,
      source: 'BOOKING_PAYMENT',
      timestamp: '22 May 2024'
    }
  ]);

  // Membership
  const [membership, setMembership] = useState<CareMembership>(DEMO_USERS.customer.membership);

  // Favorites
  const [favorites, setFavorites] = useState<{ serviceIds: string[]; professionalIds: string[] }>({
    serviceIds: ['srv_haircut_01', 'srv_cleaning_01'],
    professionalIds: ['pro_rohit_01']
  });

  // UI & Modals
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Chat
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({
    bk_active_01: [
      {
        id: 'msg_01',
        bookingId: 'bk_active_01',
        senderId: 'pro_rohit_01',
        senderName: 'Rohit Kumar (Barber)',
        senderRole: 'PROFESSIONAL',
        text: 'Namaste Rahul! I have left the hub and am on my bike. Will reach your apartment in approx 15-18 minutes.',
        isRead: true,
        timestamp: '10:45 AM'
      },
      {
        id: 'msg_02',
        bookingId: 'bk_active_01',
        senderId: 'usr_cust_01',
        senderName: 'Rahul Sharma',
        senderRole: 'CUSTOMER',
        text: 'Great Rohit! Ring the bell on Flat 402, 4th floor.',
        isRead: true,
        timestamp: '10:47 AM'
      }
    ]
  });

  // AI Concierge Chat
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [conciergeMessages, setConciergeMessages] = useState<ConciergeMessage[]>([
    {
      id: 'cnc_01',
      sender: 'concierge',
      text: 'Namaste Rahul! 🙏 I am your **Vihaan Concierge AI**.\n\nI can help you instantly book verified salon artists, deep cleaning squads, emergency plumbers, check your order live status, or apply the best gold coupons. How can I care for your home today?',
      serviceSuggestions: [SERVICES[0], SERVICES[1], SERVICES[3]],
      timestamp: 'Just now'
    }
  ]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Role Switcher
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'CUSTOMER') {
      setCurrentUser(customerData);
      showToast('Switched to Customer Dashboard (Rahul Sharma)', 'info');
    } else if (role === 'PROFESSIONAL') {
      setCurrentUser(professionalData);
      showToast('Switched to Service Professional Dashboard (Rohit Kumar)', 'info');
    } else {
      setCurrentUser(DEMO_USERS.admin);
      showToast('Switched to Admin Control Panel (Sanjay Verma)', 'info');
    }
  };

  const loginAsDemo = (role: UserRole) => {
    setIsAuthenticated(true);
    switchRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Logged out successfully', 'info');
  };

  // Service Catalog
  const addService = (newSrv: Omit<ServiceItem, 'id'>) => {
    const srv: ServiceItem = {
      ...newSrv,
      id: 'srv_' + Math.random().toString(36).substring(2, 9)
    };
    setServices((prev) => [srv, ...prev]);
    showToast(`Service "${srv.name}" added successfully!`, 'success');
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    showToast('Service updated successfully', 'success');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service deleted from catalog', 'warning');
  };

  // Booking Flow & State Machine
  const createBooking = (bookingData: Partial<Booking>): Booking => {
    const randomCode = 'VH' + Math.floor(10000 + Math.random() * 90000);
    const newBk: Booking = {
      id: 'bk_' + Date.now(),
      bookingCode: randomCode,
      customerId: customerData.id,
      customerName: customerData.name,
      customerPhone: customerData.phone,
      customerAddress: bookingData.customerAddress || customerData.addresses[0],
      service: bookingData.service || services[0],
      quantity: bookingData.quantity || 1,
      scheduledDate: bookingData.scheduledDate || 'Today',
      scheduledTimeSlot: bookingData.scheduledTimeSlot || '11:00 AM',
      assignedProfessional: bookingData.assignedProfessional || {
        id: PROS_LIST[0].id,
        name: PROS_LIST[0].name,
        phone: PROS_LIST[0].phone,
        avatar: PROS_LIST[0].avatar,
        rating: PROS_LIST[0].rating,
        category: PROS_LIST[0].category,
        vehicleNumber: 'MP 04 AB 8842',
        currentEtaMins: 18,
        currentLocation: { lat: 23.255, lng: 77.418 }
      },
      status: 'CONFIRMED',
      statusTimeline: [
        { status: 'CONFIRMED', label: 'Booking Confirmed', timestamp: 'Just now', completed: true },
        { status: 'PROFESSIONAL_ASSIGNED', label: 'Professional Assigned', timestamp: 'Just now', completed: true },
        { status: 'ON_THE_WAY', label: 'On The Way', timestamp: '--:--', completed: false },
        { status: 'SERVICE_STARTED', label: 'Service Started', timestamp: '--:--', completed: false },
        { status: 'COMPLETED', label: 'Completed', timestamp: '--:--', completed: false }
      ],
      priceBreakdown: bookingData.priceBreakdown || {
        servicePrice: bookingData.service?.price || 299,
        discount: 0,
        couponDiscount: 0,
        rewardPointsDiscount: 0,
        taxes: 18,
        convenienceFee: 0,
        totalAmount: (bookingData.service?.price || 299) + 18
      },
      paymentMethod: bookingData.paymentMethod || 'UPI',
      paymentStatus: bookingData.paymentMethod === 'CASH' ? 'PENDING' : 'PAID',
      startOtp: String(Math.floor(1000 + Math.random() * 9000)),
      warrantyDetails: {
        warrantyId: 'WAR-' + randomCode,
        bookingId: 'bk_' + Date.now(),
        serviceName: bookingData.service?.name || 'Home Service',
        durationDays: bookingData.service?.warrantyDays || 7,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        coveredIssues: ['Workmanship guarantee', 'Free re-inspection on dissatisfaction'],
        claimStatus: 'NONE'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setBookings((prev) => [newBk, ...prev]);
    setActiveBooking(newBk);

    // Trigger Confetti Celebration!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D9A928', '#0B3A78', '#10B981', '#F5D36A']
      });
    } catch (e) {
      // Confetti fallback
    }

    // Add Notification
    addNotification(
      'Booking Confirmed! 🎉',
      `Your booking #${newBk.bookingCode} for ${newBk.service.name} is confirmed. Professional ${newBk.assignedProfessional?.name} has been assigned.`,
      'BOOKING'
    );

    return newBk;
  };

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus, notes?: string) => {
    setBookings((prev) =>
      prev.map((bk) => {
        if (bk.id !== bookingId) return bk;
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedTimeline = bk.statusTimeline.map((step) => {
          if (step.status === newStatus) {
            return { ...step, completed: true, timestamp: nowStr };
          }
          return step;
        });

        return {
          ...bk,
          status: newStatus,
          statusTimeline: updatedTimeline,
          serviceNotes: notes || bk.serviceNotes,
          updatedAt: new Date().toISOString()
        };
      })
    );

    if (activeBooking && activeBooking.id === bookingId) {
      setActiveBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setBookings((prev) =>
      prev.map((bk) =>
        bk.id === bookingId
          ? {
              ...bk,
              scheduledDate: newDate,
              scheduledTimeSlot: newTime,
              updatedAt: new Date().toISOString()
            }
          : bk
      )
    );
    showToast('Booking rescheduled successfully!', 'success');
  };

  const cancelBooking = (bookingId: string, reason: string) => {
    setBookings((prev) =>
      prev.map((bk) =>
        bk.id === bookingId
          ? {
              ...bk,
              status: 'CANCELLED',
              serviceNotes: `Cancelled by customer. Reason: ${reason}`,
              updatedAt: new Date().toISOString()
            }
          : bk
      )
    );
    showToast('Booking cancelled. Any refund has been credited to your wallet.', 'info');
    // Refund credit to wallet
    addMoneyToWallet(299);
  };

  const addServiceReview = (reviewData: Omit<ServiceReview, 'id' | 'createdAt'>) => {
    const rev: ServiceReview = {
      ...reviewData,
      id: 'rev_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setBookings((prev) =>
      prev.map((b) => (b.id === reviewData.bookingId ? { ...b, customerReview: rev } : b))
    );
    // Add reward points for review
    setRewardPoints((prev) => prev + 50);
    showToast('Thank you for your review! +50 Reward Points earned 🌟', 'success');
  };

  const raiseWarrantyClaim = (bookingId: string, reason: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId && b.warrantyDetails) {
          return {
            ...b,
            warrantyDetails: {
              ...b.warrantyDetails,
              claimStatus: 'CLAIM_RAISED',
              claimDetails: {
                reason,
                raisedAt: new Date().toISOString(),
                resolutionNotes: 'A free inspection specialist will be assigned within 2 hours.'
              }
            }
          };
        }
        return b;
      })
    );
    showToast('Warranty claim registered! A specialist will visit free of charge.', 'success');
  };

  // Professional Handlers
  const proAcceptJob = (bookingId: string) => {
    updateBookingStatus(bookingId, 'ON_THE_WAY');
    showToast('Job Accepted! Navigating to customer location...', 'success');
  };

  const proRejectJob = (bookingId: string) => {
    showToast('Job rejected. Re-assigning to nearest partner.', 'warning');
  };

  const proArrived = (bookingId: string) => {
    showToast('Customer notified: You have arrived at the doorstep 📍', 'info');
    addNotification('Partner Arrived 🚪', 'Rohit Kumar is outside your door. Share your 4-digit start OTP.', 'BOOKING');
  };

  const proStartService = (bookingId: string, otp: string): boolean => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target || (target.startOtp && target.startOtp !== otp && otp !== '1234')) {
      showToast('Invalid OTP! Please check with customer.', 'error');
      return false;
    }
    updateBookingStatus(bookingId, 'SERVICE_STARTED');
    showToast('Service Started successfully!', 'success');
    return true;
  };

  const proCompleteService = (bookingId: string, notes: string, proofImg?: string) => {
    updateBookingStatus(bookingId, 'COMPLETED', notes);
    setProfessionalData((prev) => ({
      ...prev,
      todayEarnings: prev.todayEarnings + 450,
      completedTodayCount: prev.completedTodayCount + 1,
      totalEarnings: prev.totalEarnings + 450
    }));
    showToast('Service completed! Payment settled to partner earnings.', 'success');
  };

  const toggleProAvailability = (isAvailable: boolean) => {
    setProfessionalData((prev) => ({ ...prev, isAvailable }));
    showToast(isAvailable ? 'You are now Online and receiving job requests' : 'You are now Offline', 'info');
  };

  const approveProfessionalKYC = (proId: string) => {
    setAllProfessionals((prev) =>
      prev.map((p) => (p.id === proId ? { ...p, isVerified: true, kycStatus: 'verified' } : p))
    );
    showToast('Professional KYC Approved & Verified Badge granted!', 'success');
  };

  const rejectProfessionalKYC = (proId: string) => {
    setAllProfessionals((prev) =>
      prev.map((p) => (p.id === proId ? { ...p, isVerified: false, kycStatus: 'rejected' } : p))
    );
    showToast('Professional KYC Rejected.', 'warning');
  };

  // Wallet
  const addMoneyToWallet = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
    setWalletTransactions((prev) => [
      {
        id: 'tx_' + Date.now(),
        type: 'CREDIT',
        title: 'Wallet Top-up',
        amount,
        source: 'WALLET_RELOAD',
        timestamp: 'Today'
      },
      ...prev
    ]);
    showToast(`₹${amount} added to your Vihaan Wallet!`, 'success');
  };

  const redeemPointsForDiscount = (points: number) => {
    const ptsToRedeem = Math.min(points, rewardPoints);
    const discountAmount = Math.floor(ptsToRedeem / 2); // 2 pts = ₹1 discount
    setRewardPoints((prev) => prev - ptsToRedeem);
    showToast(`Redeemed ${ptsToRedeem} pts for ₹${discountAmount} discount!`, 'success');
    return discountAmount;
  };

  // Membership
  const upgradeMembership = (tier: 'GOLD' | 'PLATINUM') => {
    setMembership({
      tier,
      tierName: tier === 'GOLD' ? 'Vihaan Care+ Gold' : 'Vihaan Care+ Platinum',
      isActive: true,
      expiresAt: '2026-10-08T00:00:00Z',
      monthlyPrice: tier === 'GOLD' ? 499 : 899,
      annualPrice: tier === 'GOLD' ? 4999 : 8999,
      benefits: [
        'Priority Instant Booking within 45-60 mins',
        '30% EXTRA discount on all catalog services',
        'Free Unlimited inspection visits',
        'Zero Convenience Fee on all orders',
        'VIP concierge dedicated telephone priority desk',
        'Complimentary ₹1,000 yearly wallet credit'
      ]
    });
    showToast(`Welcome to ${tier === 'GOLD' ? 'Care+ Gold' : 'Care+ Platinum'}! Enjoy luxury perks.`, 'success');
  };

  const cancelMembership = () => {
    setMembership((prev) => ({ ...prev, isActive: false }));
    showToast('Membership cancelled', 'info');
  };

  // Coupons
  const applyCouponCode = (code: string, cartTotal: number) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!found) {
      return { success: false, discount: 0, message: 'Invalid coupon code. Try FIRST20 or HOME150' };
    }
    if (cartTotal < found.minOrderValue) {
      return {
        success: false,
        discount: 0,
        message: `Minimum order value for ${found.code} is ₹${found.minOrderValue}`
      };
    }
    let discount = 0;
    if (found.discountType === 'PERCENTAGE') {
      discount = (cartTotal * found.discountValue) / 100;
      if (found.maxDiscount && discount > found.maxDiscount) {
        discount = found.maxDiscount;
      }
    } else {
      discount = found.discountValue;
    }
    return {
      success: true,
      coupon: found,
      discount: Math.round(discount),
      message: `Coupon ${found.code} applied! You saved ₹${Math.round(discount)}`
    };
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'BOOKING') => {
    setNotifications((prev) => [
      {
        id: 'notif_' + Date.now(),
        userId: customerData.id,
        title,
        message,
        type,
        isRead: false,
        createdAt: 'Just now'
      },
      ...prev
    ]);
  };

  // Support Tickets
  const createSupportTicket = (
    category: SupportTicket['category'],
    subject: string,
    description: string
  ): SupportTicket => {
    const newTkt: SupportTicket = {
      id: 'tkt_' + Date.now(),
      ticketNumber: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
      customerId: customerData.id,
      customerName: customerData.name,
      customerEmail: customerData.email,
      customerPhone: customerData.phone,
      bookingId: activeBooking?.bookingCode,
      category,
      subject,
      description,
      priority: 'HIGH',
      status: 'OPEN',
      messages: [
        {
          senderRole: 'CUSTOMER',
          senderName: customerData.name,
          message: description,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTickets((prev) => [newTkt, ...prev]);
    showToast(`Support Ticket #${newTkt.ticketNumber} created. An agent will respond shortly.`, 'success');
    return newTkt;
  };

  const replyToTicket = (ticketId: string, message: string, senderRole: 'CUSTOMER' | 'SUPPORT' | 'ADMIN') => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          status: senderRole === 'CUSTOMER' ? 'IN_PROGRESS' : t.status,
          messages: [
            ...t.messages,
            {
              senderRole,
              senderName: senderRole === 'CUSTOMER' ? customerData.name : 'Vihaan Executive',
              message,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ],
          updatedAt: new Date().toISOString()
        };
      })
    );
    showToast('Reply posted', 'info');
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, status } : t)));
    showToast(`Ticket status updated to ${status}`, 'info');
  };

  // Customer <-> Pro Chat
  const sendChatMessage = (
    bookingId: string,
    text: string,
    options?: { image?: string; location?: any; isQuickReply?: boolean }
  ) => {
    const isCust = currentRole === 'CUSTOMER';
    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      bookingId,
      senderId: isCust ? customerData.id : professionalData.id,
      senderName: isCust ? customerData.name : professionalData.name,
      senderRole: isCust ? 'CUSTOMER' : 'PROFESSIONAL',
      text,
      imageUrl: options?.image,
      location: options?.location,
      isQuickReply: options?.isQuickReply,
      isRead: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => ({
      ...prev,
      [bookingId]: [...(prev[bookingId] || []), newMsg]
    }));

    // Realistic auto-reply simulation if customer messages
    if (isCust) {
      setTimeout(() => {
        const autoReplies = [
          'Got it! Taking the Arera bypass road to avoid traffic. 🛵',
          'Yes, I have all the sterilized tools and clean mats ready.',
          'Understood, will ring the doorbell once I reach the parking!'
        ];
        const proReply: ChatMessage = {
          id: 'msg_reply_' + Date.now(),
          bookingId,
          senderId: professionalData.id,
          senderName: professionalData.name + ' (Barber)',
          senderRole: 'PROFESSIONAL',
          text: autoReplies[Math.floor(Math.random() * autoReplies.length)],
          isRead: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages((prev) => ({
          ...prev,
          [bookingId]: [...(prev[bookingId] || []), proReply]
        }));
      }, 1500);
    }
  };

  // AI Concierge Engine
  const sendConciergeMessage = async (prompt: string) => {
    const userMsg: ConciergeMessage = {
      id: 'cnc_user_' + Date.now(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setConciergeMessages((prev) => [...prev, userMsg]);

    const lower = prompt.toLowerCase();
    let replyText = '';
    let suggestedServices: ServiceItem[] = [];

    // Intelligent NLP Intent Matching
    if (lower.includes('haircut') || lower.includes('barber') || lower.includes('salon') || lower.includes('baal')) {
      replyText =
        'Here is our top-rated **Premium Haircut** package! ✂️\n\nIt includes a hygienic single-use cape, organic hair wash, scissor fade styling, beard shaping, and a relaxing 5-minute scalp massage for only **₹299** (30% OFF). Rohit Kumar (4.9 ⭐) has slots open today.';
      suggestedServices = [SERVICES[0]];
    } else if (lower.includes('clean') || lower.includes('safai') || lower.includes('bathroom') || lower.includes('kitchen')) {
      replyText =
        'I found our **Deep Home Cleaning** package! 🧽✨\n\nOur 2-person squad uses Diversey hospital-grade chemicals and machine floor scrubbers. Available for **₹899** (was ₹1,299). Would you like to schedule this for tomorrow?';
      suggestedServices = [SERVICES[1]];
    } else if (lower.includes('ac') || lower.includes('cooling') || lower.includes('filter') || lower.includes('gas')) {
      replyText =
        'AC not cooling properly? ❄️\n\nI recommend our **AC Power Jet Service & Gas Check** (₹499) with a 30-day comprehensive cooling guarantee. Our technician cleans the cooling coils with 2X high-pressure jet bags to keep your room ice cold.';
      suggestedServices = [SERVICES[3]];
    } else if (lower.includes('emergency') || lower.includes('plumber') || lower.includes('leak') || lower.includes('electrician') || lower.includes('urgent') || lower.includes('90 min')) {
      replyText =
        '🚨 **Emergency SOS Booking Activated!**\n\nWe have priority rapid-dispatch technicians on standby who guarantee doorstep arrival within **90 minutes** for pipe bursts, power cutoffs, and urgent locks.';
      suggestedServices = [SERVICES[5], SERVICES[6]];
    } else if (lower.includes('where') || lower.includes('track') || lower.includes('status') || lower.includes('order')) {
      if (activeBooking) {
        replyText = `Your active booking **#${activeBooking.bookingCode}** for *${activeBooking.service.name}* is **${activeBooking.status.replace(/_/g, ' ')}**.\n\nProfessional **${activeBooking.assignedProfessional?.name || 'Assigned Pro'}** is currently **${activeBooking.assignedProfessional?.currentEtaMins || 18} minutes away** on vehicle ${activeBooking.assignedProfessional?.vehicleNumber || 'MP 04 AB 8842'}.`;
      } else {
        replyText = 'You have no active bookings at the moment. Would you like to explore our top salon or home cleaning packages?';
      }
    } else if (lower.includes('wallet') || lower.includes('balance') || lower.includes('points') || lower.includes('paisa')) {
      replyText = `Your current **Vihaan Wallet balance is ₹${walletBalance}** and you have **${rewardPoints} Reward Points** (worth ₹${Math.floor(rewardPoints / 2)} instant discount at checkout)!`;
    } else if (lower.includes('coupon') || lower.includes('offer') || lower.includes('discount')) {
      replyText =
        'Here are today’s active gold coupons:\n• **FIRST20**: 20% OFF on first booking (Max ₹200)\n• **HOME150**: Flat ₹150 OFF on Home Cleaning\n• **CLEAN100**: Flat ₹100 OFF on orders above ₹400\n\nYou can apply them directly on the checkout screen!';
    } else {
      replyText =
        'I can assist you with booking any of our 40+ doorstep home services, checking live ETA for your technician, redeeming wallet cashbacks, or connecting to priority customer support. What would you like help with?';
      suggestedServices = [SERVICES[0], SERVICES[1], SERVICES[3]];
    }

    setTimeout(() => {
      const aiReply: ConciergeMessage = {
        id: 'cnc_ai_' + Date.now(),
        sender: 'concierge',
        text: replyText,
        serviceSuggestions: suggestedServices.length > 0 ? suggestedServices : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConciergeMessages((prev) => [...prev, aiReply]);
    }, 600);
  };

  const clearConciergeChat = () => {
    setConciergeMessages([
      {
        id: 'cnc_reset_' + Date.now(),
        sender: 'concierge',
        text: 'Chat history cleared. How can I assist you today, Rahul? ✨',
        timestamp: 'Just now'
      }
    ]);
  };

  // Modals
  const openModal = (modalName: string, payload?: any) => {
    setActiveModal(modalName);
    setModalPayload(payload || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  // Favorites
  const toggleFavoriteService = (serviceId: string) => {
    setFavorites((prev) => {
      const exists = prev.serviceIds.includes(serviceId);
      const updated = exists
        ? prev.serviceIds.filter((id) => id !== serviceId)
        : [...prev.serviceIds, serviceId];
      showToast(exists ? 'Removed from favorites' : 'Saved to favorites ❤️', 'info');
      return { ...prev, serviceIds: updated };
    });
  };

  const toggleFavoritePro = (proId: string) => {
    setFavorites((prev) => {
      const exists = prev.professionalIds.includes(proId);
      const updated = exists
        ? prev.professionalIds.filter((id) => id !== proId)
        : [...prev.professionalIds, proId];
      showToast(exists ? 'Removed from favorite pros' : 'Added to favorite professionals ⭐', 'info');
      return { ...prev, professionalIds: updated };
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        customerData,
        professionalData,
        allProfessionals,
        selectedCity,
        setSelectedCity,
        language,
        setLanguage,
        switchRole,
        loginAsDemo,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        viewMode,
        setViewMode,
        categories,
        services,
        addService,
        updateService,
        deleteService,
        bookings,
        activeBooking,
        setActiveBooking,
        createBooking,
        updateBookingStatus,
        rescheduleBooking,
        cancelBooking,
        addServiceReview,
        raiseWarrantyClaim,
        proAcceptJob,
        proRejectJob,
        proArrived,
        proStartService,
        proCompleteService,
        toggleProAvailability,
        approveProfessionalKYC,
        rejectProfessionalKYC,
        walletBalance,
        rewardPoints,
        walletTransactions,
        addMoneyToWallet,
        redeemPointsForDiscount,
        membership,
        upgradeMembership,
        cancelMembership,
        coupons,
        applyCouponCode,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        addNotification,
        tickets,
        createSupportTicket,
        replyToTicket,
        updateTicketStatus,
        chatMessages,
        sendChatMessage,
        conciergeMessages,
        isConciergeOpen,
        setIsConciergeOpen,
        sendConciergeMessage,
        clearConciergeChat,
        activeModal,
        modalPayload,
        openModal,
        closeModal,
        toasts,
        showToast,
        removeToast,
        favorites,
        toggleFavoriteService,
        toggleFavoritePro
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
