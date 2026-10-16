import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  Trash2,
  Sparkles,
  ShoppingBag,
  Wallet,
  Tag,
  ShieldCheck
} from 'lucide-react';

export const NotificationsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    notifications,
    markNotificationRead,
    clearAllNotifications,
    openModal
  } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'BOOKING':
        return <ShoppingBag className="w-4 h-4 text-[#0B3A78]" />;
      case 'WALLET':
        return <Wallet className="w-4 h-4 text-emerald-600" />;
      case 'OFFER':
        return <Tag className="w-4 h-4 text-[#D9A928]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#0B3A78]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-[#F7F8FA] w-full max-w-md min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between animate-scale-up max-h-[94vh]">
        {/* Header */}
        <div className="bg-white px-4 py-3.5 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold text-[#061A33]">Notifications</h2>
          <button
            onClick={clearAllNotifications}
            className="p-1.5 text-slate-400 hover:text-red-500 transition"
            title="Clear All"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto flex-1 p-4 space-y-2.5 text-xs">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                  n.isRead
                    ? 'bg-white border-slate-200/80 text-slate-600'
                    : 'bg-white border-blue-200 shadow-sm text-[#061A33] ring-1 ring-blue-100'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-100">
                  {getIcon(n.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs">{n.title}</h4>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#D9A928]"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                  <span className="text-[9px] text-slate-400 block mt-1">{n.createdAt}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-2">
              <Bell className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-[#061A33]">No new notifications</p>
              <p className="text-slate-400 text-xs">You're all caught up!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400">
            Real-time status alerts powered by Vihaan Event Engine
          </p>
        </div>
      </div>
    </div>
  );
};
