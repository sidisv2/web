import React, { useState } from 'react';
import { AppRoute } from '../../types';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onRouteChange: (route: AppRoute) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onRouteChange }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-20 bg-slate-950 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Planes de Inversión B2B</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Planes Transparentes para Agencias Inmobiliarias
          </h2>
          <p className="text-slate-400 text-sm">
            Sin comisiones por venta. Elige el volumen que necesita tu cartera de propiedades.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Facturación Mensual</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full bg-slate-800 p-1 border border-white/10 transition-colors cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full bg-emerald-400 shadow-md transform transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-emerald-400' : 'text-slate-400'}`}>
              Facturación Anual
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Ahorra 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Starter Plan */}
          <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Starter Agency</h3>
                <p className="text-xs text-slate-400 mt-1">Para agentes independientes y pequeñas agencias.</p>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{isAnnual ? '$49' : '$59'}</span>
                  <span className="text-xs text-slate-400">USD / mes</span>
                </div>
                {isAnnual && <p className="text-[10px] text-emerald-400 mt-1">Facturado anualmente ($588 USD/año)</p>}
              </div>

              <ul className="space-y-3 text-xs text-slate-300 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> 1 Agente IA Aria Prop activo
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Hasta 20 Propiedades en Catálogo
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> 500 Conversaciones/mes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Widget Web Embebible
                </li>
              </ul>
            </div>

            <button
              onClick={() => onRouteChange('dashboard-checkout')}
              className="mt-8 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 transition-all cursor-pointer"
            >
              Seleccionar Plan Starter
            </button>
          </div>

          {/* Pro Enterprise Plan (Highlighted) */}
          <div className="rounded-3xl bg-slate-900 border-2 border-emerald-500 p-8 flex flex-col justify-between shadow-2xl shadow-emerald-500/20 relative transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Opción Más Elegida en LATAM
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Pro Enterprise LATAM
                </h3>
                <p className="text-xs text-slate-400 mt-1">Para agencias consolidadas y desarrolladoras inmobiliarias.</p>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-white">{isAnnual ? '$149' : '$179'}</span>
                  <span className="text-xs text-slate-400">USD / mes</span>
                </div>
                {isAnnual && <p className="text-[10px] text-emerald-400 mt-1">Facturado anualmente ($1,788 USD/año)</p>}
              </div>

              <ul className="space-y-3 text-xs text-slate-200 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> 3 Agentes IA Aria Prop activos
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Propiedades y Chats Ilimitados + RAG PDFs
                </li>
                <li className="flex items-center gap-2 font-medium text-emerald-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Conexión Nativa WhatsApp Business API
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Pagos en Mercado Pago, Tarjetas, SPEI, PSE, PayPal
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Lead Scoring & Human-in-the-loop
                </li>
              </ul>
            </div>

            <button
              onClick={() => onRouteChange('dashboard-checkout')}
              className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all cursor-pointer"
            >
              Pagar con Mercado Pago / Tarjeta
            </button>
          </div>

          {/* Custom Holding Plan */}
          <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Holding & Promotores</h3>
                <p className="text-xs text-slate-400 mt-1">Para grandes grupos inmobiliarios y franquicias.</p>
              </div>

              <div>
                <div className="text-3xl font-extrabold text-white">A Medida</div>
                <p className="text-[10px] text-slate-400 mt-1">SLA garantizado del 99.9%</p>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Instancia Dedicada Servidor Cloud Run
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Integración Custom con ERP Inmobiliario
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Formación Presencial a Asesores
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Gestor de Cuenta Dedicado
                </li>
              </ul>
            </div>

            <button
              onClick={() => onRouteChange('dashboard-bot-config')}
              className="mt-8 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 transition-all cursor-pointer"
            >
              Contactar equipo Enterprise
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
