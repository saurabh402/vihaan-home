import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { ToastContainer } from './components/common/ToastContainer';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { SplashScreen } from './components/customer/SplashScreen';
import { OnboardingScreen } from './components/customer/OnboardingScreen';
import { AuthModal } from './components/customer/AuthModal';
import { HomeScreen } from './components/customer/HomeScreen';
import { CategoryView } from './components/customer/CategoryView';
import { ServiceDetailModal } from './components/customer/ServiceDetailModal';
import { ProfessionalProfileModal } from './components/customer/ProfessionalProfileModal';
import { BookingFlowModal } from './components/customer/BookingFlowModal';
import { BookingConfirmationModal } from './components/customer/BookingConfirmationModal';
import { LiveTrackingModal } from './components/customer/LiveTrackingModal';
import { ChatModal } from './components/customer/ChatModal';
import { WalletModal } from './components/customer/WalletModal';
import { VihaanCareModal } from './components/customer/VihaanCareModal';
import { EmergencyBookingModal } from './components/customer/EmergencyBookingModal';
import { DigitalInvoiceModal } from './components/customer/DigitalInvoiceModal';
import { WarrantyModal } from './components/customer/WarrantyModal';
import { ReviewModal } from './components/customer/ReviewModal';
import { SupportCenterModal } from './components/customer/SupportCenterModal';
import { BookingHistoryScreen } from './components/customer/BookingHistoryScreen';
import { ReferralModal } from './components/customer/ReferralModal';
import { ProfileScreen } from './components/customer/ProfileScreen';
import { NotificationsModal } from './components/customer/NotificationsModal';
import { DemoCredentialsModal } from './components/common/DemoCredentialsModal';
import { RescheduleModal } from './components/customer/RescheduleModal';
import { CancelModal } from './components/customer/CancelModal';
import { ConciergeAIFloating } from './components/customer/ConciergeAIFloating';
import { ProfessionalDashboard } from './components/professional/ProfessionalDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ServiceCategory, ServiceItem, Professional, Booking } from './types';
import { Wifi, Battery, Signal } from 'lucide-react';

export const AppContent: React.FC = () => {
  const {
    currentRole,
    isAuthenticated,
    viewMode,
    activeModal,
    modalPayload,
    openModal,
    closeModal,
    categories,
    services
  } = useApp();

  // Screen flow states
  const [showSplash, setShowSplash] = useState(false); // Can be triggered or skipped
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // If user is not authenticated, show Auth Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#040F20] flex flex-col justify-between">
        <RoleSwitcherBar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
            <AuthModal />
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }

  // Splash Screen view
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Onboarding Screen view
  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl">
          <OnboardingScreen
            onGetStarted={() => setShowOnboarding(false)}
            onLogin={() => setShowOnboarding(false)}
          />
        </div>
      </div>
    );
  }

  // Render Customer Screen based on active tab and category selection
  const renderCustomerContent = () => {
    if (selectedCategory) {
      return (
        <CategoryView
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
          onSelectService={(srv) => setSelectedService(srv)}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onSelectService={(srv) => setSelectedService(srv)}
            onViewAllCategories={() => {
              setSelectedCategory({
                id: 'cat_all',
                name: 'All Market',
                slug: 'all',
                iconName: 'Sparkles',
                description: 'Complete verified home services',
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
                serviceCount: services.length
              });
            }}
          />
        );
      case 'explore':
        return (
          <CategoryView
            category={{
              id: 'cat_all',
              name: 'Explore All',
              slug: 'all',
              iconName: 'Sparkles',
              description: 'Browse complete verified directory',
              image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
              serviceCount: services.length
            }}
            onBack={() => setActiveTab('home')}
            onSelectService={(srv) => setSelectedService(srv)}
          />
        );
      case 'bookings':
        return (
          <BookingHistoryScreen
            onSelectServiceForRebook={(srv) => openModal('booking', { service: srv })}
          />
        );
      case 'wallet':
        return (
          <div className="p-2 sm:p-4">
            <WalletModal onClose={() => setActiveTab('home')} />
          </div>
        );
      case 'profile':
        return (
          <ProfileScreen
            onOpenTab={(tab) => {
              if (tab === 'bookings') setActiveTab('bookings');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#040F20] flex flex-col justify-between font-sans selection:bg-[#D9A928]">
      {/* 1. Universal Role & Device Control Bar */}
      <RoleSwitcherBar />

      {/* 2. Main Viewport Container */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-x-hidden">
        {viewMode === 'mobile-frame' ? (
          /* iOS 15 Mobile Frame Wrapper (Exact match to Reference Screenshot) */
          <div className="w-full max-w-[420px] bg-black rounded-[48px] p-3 shadow-modal border-[4px] border-slate-700/80 relative my-auto animate-fade-in">
            {/* Dynamic Island / Camera Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></span>
              <span className="w-2 h-2 rounded-full bg-blue-900/60"></span>
            </div>

            {/* Mobile App Canvas */}
            <div className="bg-[#F7F8FA] rounded-[38px] overflow-hidden min-h-[820px] max-h-[860px] flex flex-col justify-between relative shadow-inner">
              {/* iOS Top Status Bar (9:41, WiFi, Battery) */}
              <div className="pt-3 px-6 pb-1 flex items-center justify-between text-[#061A33] font-bold text-xs z-30 select-none">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 text-[#061A33]">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Portal Content */}
              {currentRole === 'CUSTOMER' && (
                <>
                  <Header />
                  <div className="flex-1 overflow-y-auto">{renderCustomerContent()}</div>
                  <BottomNav currentTab={activeTab} onTabChange={(tab) => {
                    setSelectedCategory(null);
                    setActiveTab(tab);
                  }} />
                </>
              )}

              {currentRole === 'PROFESSIONAL' && (
                <div className="flex-1 overflow-y-auto">
                  <Header />
                  <ProfessionalDashboard />
                </div>
              )}

              {currentRole === 'ADMIN' && (
                <div className="flex-1 overflow-y-auto">
                  <Header />
                  <AdminDashboard />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Full Responsive Desktop / Tablet Layout */
          <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 min-h-[88vh] flex flex-col justify-between overflow-hidden animate-fade-in">
            <Header />
            <div className="flex-1 overflow-y-auto bg-[#F7F8FA]">
              {currentRole === 'CUSTOMER' && renderCustomerContent()}
              {currentRole === 'PROFESSIONAL' && <ProfessionalDashboard />}
              {currentRole === 'ADMIN' && <AdminDashboard />}
            </div>
          </div>
        )}
      </main>

      {/* 3. Floating AI Concierge Drawer / Modal */}
      <ConciergeAIFloating />

      {/* 4. Global Modals Dispatcher */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onBookNow={(srv) => {
            setSelectedService(null);
            openModal('booking', { service: srv });
          }}
        />
      )}

      {selectedPro && (
        <ProfessionalProfileModal
          professional={selectedPro}
          onClose={() => setSelectedPro(null)}
          onBook={(pro) => {
            setSelectedPro(null);
            openModal('booking', { service: services[0] });
          }}
          onChat={(pro) => {
            setSelectedPro(null);
            openModal('chat', { id: 'bk_active_01', assignedProfessional: pro });
          }}
        />
      )}

      {activeModal === 'booking' && (
        <BookingFlowModal
          initialService={modalPayload?.service || services[0]}
          initialCoupon={modalPayload?.coupon}
          onClose={closeModal}
          onBookingSuccess={(newBk) => {
            closeModal();
            setConfirmedBooking(newBk);
          }}
        />
      )}

      {confirmedBooking && (
        <BookingConfirmationModal
          booking={confirmedBooking}
          onTrackBooking={(bk) => {
            setConfirmedBooking(null);
            openModal('tracking', bk);
          }}
          onBackToHome={() => {
            setConfirmedBooking(null);
            setActiveTab('home');
          }}
        />
      )}

      {activeModal === 'tracking' && (
        <LiveTrackingModal
          booking={modalPayload || confirmedBooking}
          onClose={closeModal}
          onOpenChat={() => openModal('chat', modalPayload || confirmedBooking)}
          onOpenReschedule={() => {
            closeModal();
            openModal('reschedule', modalPayload);
          }}
          onOpenCancel={() => {
            closeModal();
            openModal('cancel', modalPayload);
          }}
        />
      )}

      {activeModal === 'chat' && (
        <ChatModal
          booking={modalPayload || confirmedBooking}
          onClose={closeModal}
        />
      )}

      {activeModal === 'wallet' && <WalletModal onClose={closeModal} />}
      {activeModal === 'vihaanCare' && <VihaanCareModal onClose={closeModal} />}
      {activeModal === 'emergencyBooking' && <EmergencyBookingModal onClose={closeModal} />}
      {activeModal === 'invoice' && <DigitalInvoiceModal booking={modalPayload} onClose={closeModal} />}
      {activeModal === 'warranty' && <WarrantyModal booking={modalPayload} onClose={closeModal} />}
      {activeModal === 'review' && <ReviewModal booking={modalPayload} onClose={closeModal} />}
      {activeModal === 'support' && <SupportCenterModal onClose={closeModal} />}
      {activeModal === 'referral' && <ReferralModal onClose={closeModal} />}
      {activeModal === 'notifications' && <NotificationsModal onClose={closeModal} />}
      {activeModal === 'demoCredentials' && <DemoCredentialsModal onClose={closeModal} />}
      {activeModal === 'reschedule' && <RescheduleModal booking={modalPayload || confirmedBooking} onClose={closeModal} />}
      {activeModal === 'cancel' && <CancelModal booking={modalPayload || confirmedBooking} onClose={closeModal} />}

      {/* 5. Floating Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
