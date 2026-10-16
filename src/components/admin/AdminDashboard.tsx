import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem, Professional, Booking, Coupon } from '../../types';
import {
  ShieldCheck,
  Users,
  Briefcase,
  CalendarCheck,
  TrendingUp,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Tag,
  Image,
  Headphones,
  Sliders,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    services,
    addService,
    updateService,
    deleteService,
    bookings,
    updateBookingStatus,
    allProfessionals,
    approveProfessionalKYC,
    rejectProfessionalKYC,
    coupons,
    tickets,
    replyToTicket,
    updateTicketStatus,
    showToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'services' | 'professionals' | 'bookings' | 'coupons' | 'tickets'
  >('overview');

  // Service Management Modal State
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('cat_salon');
  const [newServicePrice, setNewServicePrice] = useState(299);
  const [newServiceOriginalPrice, setNewServiceOriginalPrice] = useState(399);
  const [newServiceDuration, setNewServiceDuration] = useState(45);
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceWarranty, setNewServiceWarranty] = useState(7);

  // Filter state for bookings table
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('ALL');

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    addService({
      categoryId: newServiceCategory,
      name: newServiceName.trim(),
      description: newServiceDesc || 'High quality professional home service performed with sterile equipment.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80'],
      price: newServicePrice,
      originalPrice: newServiceOriginalPrice,
      discountPercentage: Math.round(((newServiceOriginalPrice - newServicePrice) / newServiceOriginalPrice) * 100),
      durationMinutes: newServiceDuration,
      rating: 4.8,
      reviewCount: 12,
      serviceType: 'at_home',
      includedItems: ['Doorstep inspection', 'Sterile single-use tools', 'Post cleanup guarantee'],
      excludedItems: ['Additional hardware parts cost'],
      benefits: ['Verified specialist', 'Standard rate card'],
      safetyInfo: ['Hospital-grade chemicals and sanitized gear'],
      faqs: [{ question: 'Is cleanup included?', answer: 'Yes, full cleanup is included.' }],
      warrantyDays: newServiceWarranty,
      status: 'active'
    });

    setShowAddServiceModal(false);
    setNewServiceName('');
    setNewServiceDesc('');
  };

  const filteredAdminBookings = bookings.filter((b) => {
    if (bookingFilterStatus === 'ALL') return true;
    return b.status === bookingFilterStatus;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 select-none animate-fade-in text-xs">
      {/* Top Admin Header Bar */}
      <div className="bg-gradient-to-r from-[#061A33] via-[#0B3A78] to-[#040F20] text-white p-5 rounded-3xl shadow-xl border border-[#D9A928]/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#F5D36A]" />
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              Vihaan Command Center & Super Admin
            </h2>
          </div>
          <p className="text-slate-300 text-xs mt-0.5">
            Platform governance, service catalogs, KYC approvals & real-time dispatch analytics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>All Systems Live • 9 Cities</span>
          </span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-slate-200/60 p-1 rounded-2xl no-scrollbar font-bold text-[11px]">
        {[
          { id: 'overview', label: '📊 Executive KPI Dashboard' },
          { id: 'services', label: `🛠️ Catalog Management (${services.length})` },
          { id: 'professionals', label: `👨‍🔧 Partner Verification & KYC (${allProfessionals.length})` },
          { id: 'bookings', label: `📦 Live Bookings (${bookings.length})` },
          { id: 'coupons', label: `🏷️ Coupons & Offers (${coupons.length})` },
          { id: 'tickets', label: `🎧 Support Desk (${tickets.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`py-2 px-3 rounded-xl whitespace-nowrap transition ${
              activeAdminTab === tab.id
                ? 'bg-[#061A33] text-[#F5D36A] shadow-md font-extrabold'
                : 'text-slate-700 hover:text-black hover:bg-white/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: EXECUTIVE KPI DASHBOARD (Section 34 of PDF) */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-5 animate-fade-in">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase">Total GMV Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xl font-extrabold text-[#061A33]">₹1,48,50,000</span>
              <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">
                +18.4% this month
              </span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase">Vihaan Commission (15%)</span>
                <TrendingUp className="w-4 h-4 text-[#D9A928]" />
              </div>
              <span className="text-xl font-extrabold text-[#061A33]">₹22,27,500</span>
              <span className="block text-[10px] text-[#0B3A78] font-bold mt-0.5">
                Direct Net Take Rate
              </span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase">Active Customers</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xl font-extrabold text-[#061A33]">12,480</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Across 9 Operating Cities</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase">Verified Pros</span>
                <Briefcase className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xl font-extrabold text-[#061A33]">840 Partners</span>
              <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">312 Online Now</span>
            </div>
          </div>

          {/* Visual Category & City Distribution Chart Simulator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-[#061A33]">Revenue by Service Vertical</h3>
              <div className="space-y-2">
                {[
                  { name: 'Beauty & Salon Services', pct: 38, val: '₹56.4L', color: 'bg-pink-500' },
                  { name: 'Home Deep Cleaning', pct: 26, val: '₹38.6L', color: 'bg-blue-500' },
                  { name: 'Appliance & AC Repair', pct: 20, val: '₹29.7L', color: 'bg-amber-500' },
                  { name: '90-Min Emergency SOS', pct: 16, val: '₹23.8L', color: 'bg-red-500' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{item.name}</span>
                      <span className="text-[#061A33] font-bold">{item.val} ({item.pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-[#061A33]">City Hub Demand Index</h3>
              <div className="space-y-2">
                {[
                  { city: 'Bhopal (Hub 1)', orders: '11,420 orders', load: '94%', color: 'bg-[#0B3A78]' },
                  { city: 'Delhi NCR', orders: '9,840 orders', load: '88%', color: 'bg-[#061A33]' },
                  { city: 'Bengaluru', orders: '8,210 orders', load: '82%', color: 'bg-[#D9A928]' },
                  { city: 'Lucknow & Pune', orders: '5,450 orders', load: '71%', color: 'bg-emerald-600' }
                ].map((city, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D9A928]"></span>
                      <span className="font-bold text-[#061A33]">{city.city}</span>
                    </div>
                    <span className="text-slate-500">{city.orders}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                      {city.load} Capacity
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SERVICE CATALOG MANAGEMENT (Section 35) */}
      {activeAdminTab === 'services' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#061A33]">Active Service Catalog</h3>
            <button
              onClick={() => setShowAddServiceModal(true)}
              className="px-3.5 py-2 bg-[#061A33] hover:bg-[#0B3A78] text-[#F5D36A] rounded-2xl font-bold flex items-center gap-1.5 shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Service</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Warranty</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map((srv) => (
                    <tr key={srv.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 flex items-center gap-2.5">
                        <img src={srv.image} alt={srv.name} className="w-9 h-9 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-[#061A33]">{srv.name}</p>
                          <p className="text-[10px] text-slate-400">{srv.reviewCount} reviews • {srv.rating} ⭐</p>
                        </div>
                      </td>
                      <td className="p-3 font-semibold text-slate-700 capitalize">{srv.categoryId.replace('cat_', '')}</td>
                      <td className="p-3 font-bold text-[#061A33]">₹{srv.price}</td>
                      <td className="p-3 text-slate-600">{srv.durationMinutes} mins</td>
                      <td className="p-3 text-emerald-700 font-bold">{srv.warrantyDays} Days</td>
                      <td className="p-3">
                        <button
                          onClick={() => updateService(srv.id, { status: srv.status === 'active' ? 'inactive' : 'active' })}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            srv.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {srv.status.toUpperCase()}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => deleteService(srv.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Service Modal Dialog */}
          {showAddServiceModal && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
              <form onSubmit={handleCreateService} className="bg-white rounded-3xl p-5 max-w-md w-full space-y-3 shadow-2xl border border-slate-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-[#061A33] text-sm">Add New Catalog Service</h3>
                  <button type="button" onClick={() => setShowAddServiceModal(false)} className="text-slate-400">✕</button>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Service Title</label>
                  <input
                    type="text"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="e.g. Sofa Sanitization & Deep Shampoo"
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs font-semibold focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs font-semibold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={newServiceOriginalPrice}
                      onChange={(e) => setNewServiceOriginalPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs font-semibold focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Duration (Mins)</label>
                    <input
                      type="number"
                      value={newServiceDuration}
                      onChange={(e) => setNewServiceDuration(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs font-semibold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Warranty (Days)</label>
                    <input
                      type="number"
                      value={newServiceWarranty}
                      onChange={(e) => setNewServiceWarranty(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs font-semibold focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#061A33] hover:bg-[#0B3A78] text-[#F5D36A] rounded-xl font-bold text-xs shadow transition"
                >
                  Publish to Marketplace
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROFESSIONAL VERIFICATION & KYC DESK (Section 36) */}
      {activeAdminTab === 'professionals' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#061A33]">Partner Verification & Approvals</h3>
            <span className="text-[10px] text-slate-500 font-bold">{allProfessionals.length} Active Partners</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {allProfessionals.map((pro) => (
              <div key={pro.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={pro.avatar} alt={pro.name} className="w-12 h-12 rounded-2xl object-cover" />
                    <div>
                      <h4 className="font-extrabold text-[#061A33] text-sm">{pro.name}</h4>
                      <p className="text-[10px] text-slate-400">{pro.category} • {pro.experienceYears} yrs exp</p>
                      <p className="text-[10px] text-slate-500 font-semibold">{pro.completedJobsCount} Jobs Completed</p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      pro.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {pro.isVerified ? '✓ VERIFIED' : 'PENDING'}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl text-[10px] space-y-1 text-slate-600">
                  <p><strong>Specializations:</strong> {pro.specializations?.join(', ')}</p>
                  <p><strong>Phone:</strong> {pro.phone}</p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {!pro.isVerified ? (
                    <button
                      onClick={() => approveProfessionalKYC(pro.id)}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[11px]"
                    >
                      Approve & Verify KYC
                    </button>
                  ) : (
                    <button
                      onClick={() => rejectProfessionalKYC(pro.id)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 rounded-xl font-bold text-[11px]"
                    >
                      Suspend / Re-verify
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BOOKING CONTROL DESK (Section 38) */}
      {activeAdminTab === 'bookings' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#061A33]">Live Orders & Dispatch Override</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-bold">Filter Status:</span>
              <select
                value={bookingFilterStatus}
                onChange={(e) => setBookingFilterStatus(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="ON_THE_WAY">On The Way</option>
                <option value="SERVICE_STARTED">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Booking ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Assigned Pro</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Admin Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAdminBookings.map((bk) => (
                    <tr key={bk.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-mono font-bold text-[#0B3A78]">{bk.bookingCode}</td>
                      <td className="p-3">
                        <p className="font-bold text-[#061A33]">{bk.customerName}</p>
                        <p className="text-[10px] text-slate-400">{bk.customerPhone}</p>
                      </td>
                      <td className="p-3 font-medium text-slate-700">{bk.service.name}</td>
                      <td className="p-3">
                        <p className="font-bold text-[#061A33]">{bk.assignedProfessional?.name || 'Unassigned'}</p>
                        <p className="text-[10px] text-slate-400">{bk.assignedProfessional?.phone}</p>
                      </td>
                      <td className="p-3 font-extrabold text-[#061A33]">₹{bk.priceBreakdown.totalAmount}</td>
                      <td className="p-3 font-bold text-[10px] uppercase text-[#0B3A78]">
                        {bk.status.replace(/_/g, ' ')}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => updateBookingStatus(bk.id, 'COMPLETED', 'Admin forced completion')}
                          className="px-2.5 py-1 bg-blue-50 text-[#0B3A78] hover:bg-blue-100 rounded-lg font-bold text-[10px] transition"
                        >
                          Mark Completed
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: COUPONS & PROMOS (Section 39) */}
      {activeAdminTab === 'coupons' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#061A33]">Active Discount Promo Codes</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {coupons.map((c) => (
              <div key={c.id} className="bg-white p-4 rounded-3xl border border-amber-200/80 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-extrabold text-sm text-[#061A33] bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    {c.code}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700">
                    {c.discountType === 'PERCENTAGE' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT`}
                  </span>
                </div>
                <h4 className="font-bold text-[#061A33] text-xs">{c.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{c.description}</p>
                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
                  <span>Min Order: ₹{c.minOrderValue}</span>
                  <span>Used: {c.usageCount} times</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SUPPORT DESK (Section 25) */}
      {activeAdminTab === 'tickets' && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-sm font-extrabold text-[#061A33]">Customer Inquiries & Support Desk</h3>

          <div className="space-y-3">
            {tickets.map((tkt) => (
              <div key={tkt.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#0B3A78]">{tkt.ticketNumber}</span>
                    <span className="font-bold text-[#061A33]">{tkt.customerName}</span>
                  </div>
                  <button
                    onClick={() => updateTicketStatus(tkt.id, tkt.status === 'RESOLVED' ? 'OPEN' : 'RESOLVED')}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      tkt.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {tkt.status}
                  </button>
                </div>

                <p className="font-bold text-[#061A33] text-xs">{tkt.subject}</p>
                <p className="text-slate-600 text-[11px] bg-slate-50 p-2.5 rounded-xl">{tkt.description}</p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Category: {tkt.category}</span>
                  <span>{tkt.messages.length} Messages in Thread</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
