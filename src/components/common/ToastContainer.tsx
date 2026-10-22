import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-14 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => {
        let bg = 'bg-[#061A33] border-slate-700 text-white';
        let Icon = Info;
        let iconColor = 'text-blue-400';

        if (t.type === 'success') {
          bg = 'bg-[#061A33] border-emerald-500/40 text-white';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
        } else if (t.type === 'warning') {
          bg = 'bg-[#061A33] border-amber-500/40 text-white';
          Icon = AlertCircle;
          iconColor = 'text-[#F5D36A]';
        } else if (t.type === 'error') {
          bg = 'bg-[#061A33] border-red-500/40 text-white';
          Icon = XCircle;
          iconColor = 'text-red-400';
        }

        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-2.5 p-3 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-slide-in ${bg}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 flex items-center justify-between gap-2">
              <p className="text-xs font-medium leading-relaxed">{t.message}</p>
              {t.onUndo && (
                <button
                  onClick={() => {
                    t.onUndo?.();
                    removeToast(t.id);
                  }}
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-[#061A33] rounded-md font-bold text-[11px] uppercase tracking-wider flex-shrink-0 shadow transition active:scale-95"
                >
                  {t.undoLabel || 'Undo'}
                </button>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white p-0.5 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
