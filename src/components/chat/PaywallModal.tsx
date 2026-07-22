import React from 'react';
import { Sparkles, Check, Zap, X, ShieldCheck, ArrowRight, Lock, Gift } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, onSelectPlan }) => {
  const { requireAuthForPayment } = useAuth();

  if (!isOpen) return null;

  const handleStartFreeTrial = () => {
    onClose();
    if (onSelectPlan) {
      onSelectPlan();
    } else {
      requireAuthForPayment({
        planId: 'basico_1day',
        targetRoute: 'dashboard-checkout',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border-2 border-emerald-500/50 p-6 sm:p-8 shadow-2xl shadow-emerald-500/20 text-center overflow-hidden">
        
        {/* Decorative Top Ambient Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4 shadow-inner">
          <Gift className="w-3.5 h-3.5" />
          <span>Oferta Exclusiva: Prueba de 1 Día GRATIS</span>
        </div>

        {/* Lock / Sparkles Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/10">
          <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
          ¡Agotaste tu mensaje gratuito de IA!
        </h3>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Para continuar chateando con <strong className="text-emerald-400">Aria Prop</strong> y analizar proyectos o inmuebles sin límites, activa tu <span className="text-white font-bold underline decoration-emerald-400">Suscripción Básica con 1 Día GRATIS</span>.
        </p>

        {/* Plan Feature Bullets */}
        <div className="my-6 p-4 rounded-2xl bg-black/40 border border-white/10 text-left space-y-2.5 text-xs text-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span><strong>Prueba 1 Día Totalmente Gratis</strong> (Sin cobro hoy)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span><strong>Consultas e Ideas Ilimitadas</strong> con IA Gemini Flash</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>Acceso al catálogo de propiedades RAG y dossiers</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>Cancela en 1-clic en cualquier momento</span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={handleStartFreeTrial}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 transition-all transform hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>Comenzar Prueba Gratis de 1 Día</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Trust Note */}
        <p className="text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Garantía de activación instantánea. Proceso 100% seguro con Supabase.</span>
        </p>

      </div>
    </div>
  );
};
