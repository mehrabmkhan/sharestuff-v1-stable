
import React, { useState } from 'react';
import { X, Shield, ArrowRight, Loader2, Mail } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleLogin = (provider: string) => {
    setLoading(provider);
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-2xl p-12 border border-slate-100">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 bg-slate-50 hover:bg-rose-500 hover:text-white text-slate-400 rounded-full transition-all active:scale-90"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-emerald-500 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Access Portal</h2>
          <p className="text-slate-500 text-sm font-medium">Join the global logistics protocol.</p>
        </div>

        <div className="space-y-4">
          <button 
            disabled={!!loading}
            onClick={() => handleLogin('google')}
            className="w-full py-5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center gap-4 hover:border-emerald-500 transition-all active:scale-[0.98] group disabled:opacity-50"
          >
            {loading === 'google' ? <Loader2 className="animate-spin text-emerald-500" /> : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Sign in with Google</span>
          </button>

          <button 
            disabled={!!loading}
            onClick={() => handleLogin('apple')}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-800 transition-all active:scale-[0.98] group disabled:opacity-50"
          >
            {loading === 'apple' ? <Loader2 className="animate-spin" /> : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.96.95-2.2 1.72-3.72 1.72-1.47 0-2.31-.9-3.72-.9-1.42 0-2.38.9-3.73.9-1.5 0-2.84-.82-3.77-1.87-1.94-2.18-1.94-5.74 0-7.92.93-1.05 2.27-1.87 3.77-1.87 1.41 0 2.27.9 3.73.9 1.41 0 2.27-.9 3.72-.9 1.5 0 2.84.82 3.77 1.87.65.73 1.15 1.63 1.43 2.61-2.93.92-2.93 4.84 0 5.76-.13.43-.34.84-.5 1.2zm-4.32-15.35c.96-1.12 1.62-2.68 1.62-4.23-.13-.03-.26-.03-.4-.03-1.43 0-2.86.82-3.73 1.87-.96 1.12-1.62 2.68-1.62 4.23.13.03.26.03.4.03 1.43 0 2.86-.82 3.73-1.87z"/>
              </svg>
            )}
            <span className="text-sm font-black uppercase tracking-widest">Sign in with Apple</span>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-50">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center leading-loose">
             By signing in, you agree to our <br/>
             <span className="text-emerald-500 cursor-pointer hover:underline">Logistics Protocol Waiver</span>
           </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
