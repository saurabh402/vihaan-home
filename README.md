# Vihaan Home Services - Full-Stack Production Application

> **Tagline:** *"Your Home, Our Care. Professional Services at Your Doorstep."*  
> Built strictly according to the **Vihaan Home Services Product Requirements & Build Specification (34 Pages)** and official reference UI mockup.

---

## 🌟 Application Architecture & Key Features

### 1. Brand Identity & Visual Styling
- **Color Palette**: Deep Navy (`#061A33`), Royal Blue (`#0B3A78`), Pure Gold (`#D9A928`), Light Gold (`#F5D36A`), Off-White (`#F7F8FA`).
- **Monogram & Crest**: Custom SVG Golden Crown monogram with home roof and 'V' silhouette.
- **Dual View Modes**:
  - **Mobile Frame**: Pixel-perfect reproduction of the iOS 15 mockup frame with notch, status bar, and bottom navigation.
  - **Responsive Desktop**: Expansive dashboard layout with full analytics and data tables.

---

### 2. Multi-Role User Architecture

| Role | Demo Email | Password | OTP | Features & Access |
| :--- | :--- | :--- | :--- | :--- |
| **Customer** | `customer@vihaan.demo` | `Demo@123` | `123456` | Splash, Onboarding, Catalog, 8-Step Booking, Live GPS Tracking, In-App Chat, Wallet, Care+ Pass, Reviews, Warranty Claims. |
| **Service Pro** | `professional@vihaan.demo` | `Demo@123` | `123456` | Job Dispatch, Live GPS Route, Doorstep Arrived, 4-Digit OTP Start, Proof Photo Upload, Daily ₹2,450 Earnings, Bank Payouts. |
| **Super Admin** | `admin@vihaan.demo` | `Demo@123` | `123456` | ₹1.48 Cr GMV KPI Analytics, Service Catalog Manager, Partner KYC Approvals, Live Booking Override Desk, Coupons & Tickets. |

---

### 3. Core Modules Implemented

1. **Customer Home & Discovery**:
   - Location switcher across 9 operating cities (*Bhopal, Lucknow, Delhi NCR, Noida, Gurgaon, Bengaluru, Mumbai, Pune, Hyderabad*).
   - Search bar with live autocomplete debounce & voice AI mic.
   - 20% OFF Gold Gift promotional banner carousel (`FIRST20`).
   - 8+ Category browser & Quick Book cards (*Haircut, Deep Cleaning, Full Body Spa*).
   - 90-Min Emergency SOS service dispatch (*Plumber, Electrician, Locksmith*).
   - "Book Again" 1-click repeat booking.

2. **8-Step Multi-Step Booking Wizard**:
   - Step 1: Service selection & duration summary.
   - Step 2: Date selector calendar chips.
   - Step 3: Time slot selector (09:00 AM, 11:00 AM, 01:00 PM, 04:00 PM, 07:00 PM).
   - Step 4: Address selection (Saved Home/Work + Add New Address).
   - Step 5: Professional matching (Vihaan Smart Auto Match vs Manual Partner Selection).
   - Step 6: Payment method (UPI, Credit/Debit Card, Net Banking, Vihaan Wallet, Cash on Service).
   - Step 7: Coupon codes (`FIRST20`, `HOME150`, `CLEAN100`) & 650 Reward Points instant redemption.
   - Step 8: Price breakdown & Confetti confirmation celebration.

3. **Real-Time Live Service Tracking**:
   - Simulated dynamic route map showing partner moving towards customer location.
   - Live Status timeline (*Confirmed → Assigned → On The Way (18 mins) → Service Started → Completed*).
   - In-app masked calling & encrypted customer-partner chat.

4. **Real-Time In-App Chat System**:
   - Quick reply chips (*"Where are you?", "I am waiting", "How long will you take?", "I have shared my location"*).
   - Photo attachments & doorstep location sharing.
   - Simulated realistic partner replies.

5. **Vihaan Concierge AI Assistant**:
   - Floating AI trigger button across the application.
   - Intelligent NLP understanding (haircuts, AC repair cooling issues, technician ETA, wallet checks, coupon queries).
   - Multilingual support for English, Hindi, and Hinglish.
   - Web Speech API voice speech recognition & Speech synthesis voice readout!

6. **Vihaan Care+ Gold Membership**:
   - Luxury membership pass card with VIP perks (Priority booking, 30% Extra discounts, Free inspection, Zero convenience fee).
   - Annual & monthly billing cycles.

7. **Wallet & Loyalty Rewards**:
   - Total balance: ₹1,250 | Reward points: 650 pts.
   - Add money modal with preset chips.
   - Detailed ledger of credits, referral earnings, and booking debits.

8. **Digital Invoice & 7-Day Warranty**:
   - Printable GST digital invoice with PDF download trigger.
   - 7-Day workmanship warranty coverage & free re-inspection claim filing.

9. **Professional & Admin Command Hubs**:
   - Partner dashboard with job dispatch, OTP verification, photo proof upload, and daily payouts.
   - Super admin dashboard with catalog CRUD, KYC verification approvals, and booking controls.

---

## 🚀 Running the Application Locally

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

Open `http://localhost:5173` in your browser.
