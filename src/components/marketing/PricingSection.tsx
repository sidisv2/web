import React, { useState } from 'react';
import { AppRoute } from '../../types';
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, Clock, CreditCard } from 'lucide-react';

interface PricingSectionProps {
  onRouteChange: (route: AppRoute) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onRouteChange }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Pricing calculations with 20% discount on annual
  const starterPrice = isAnnual ? Math.round(39 * 0.8) : 39;
  const proPrice = isAnnual ? Math.round(89 * 0.8) : 89;
  const agencyPrice = isAnnual ? Math.round(199 * 0.8) : 199;

  const faqs = [
    {
      q: '¿Cómo funciona la prueba gratuita de 7 días?',
      a: 'Puedes registrarte hoy en menos de 2 minutos sin ingresar ninguna tarjeta de crédito. Obtendrás acceso completo para subir hasta 20 propiedades y probar a Aria Prop con tu equipo o clientes.',
    },
    {
      q: '¿Puedo conectar Aria Prop a mi cuenta de WhatsApp Business?',
      a: 'Sí, el Plan Pro y Plan Agency incluyen integración nativa directa con la API Oficial de WhatsApp Business para responder chats automáticamente.',
    },
    {
      q: '¿Qué pasarelas de pago aceptan?',
      a: 'Soportamos tarjetas de crédito/débito internacionales via Stripe, Mercado Pago para Latinoamérica (MXN, COP, ARS, CLP), PayPal y transferencias bancarias directas.',
    },
    {
      q: '¿Cómo lee Aria Prop la información de mis propiedades?',
      a: 'Simplemente subes tus archivos PDF (dossiers, memorias de calidad), Excel o enlaces web. Nuestro motor RAG indexa las características en segundos.',
    },
    {
      q: '¿Puedo cancelar o cambiar de plan en cualquier momento?',
      a: 'Absolutamente. No hay contratos de permanencia obligatorios en planes mensuales y puedes actualizar tu plan desde tu panel en un clic.',
    },
  ];

  return (
    <section className="py-20 bg-zinc-950 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Suscripciones Transparentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Planes diseñados para acelerar tus ventas
          </h2>
          <p className="text-slate-400 text-sm">
            Comienza gratis por 7 días sin tarjeta. Escala a medida que crece tu catálogo de propiedades.
          </p>

          {/* Free trial callout badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span><strong>7 Días de Prueba Gratis</strong> — Registro instantáneo sin tarjeta de crédito</span>
          </div>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Facturación Mensual</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full bg-slate-900 p-1 border border-white/10 transition-colors cursor-pointer"
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
          <div className="rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Plan Starter</h3>
                <p className="text-xs text-slate-400 mt-1">Ideal para agentes independientes iniciando con IA.</p>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">${starterPrice}</span>
                  <span className="text-xs text-slate-400">USD / mes</span>
                </div>
                {isAnnual && <p className="text-[10px] text-emerald-400 mt-1">Ahorro anual del 20% aplicado</p>}
              </div>

              <ul className="space-y-3 text-xs text-slate-300 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> 1 Agente de IA (Aria)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Hasta 500 chats/mes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Hasta 20 propiedades sincronizadas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Widget Web Embebible
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Notificaciones por email
                </li>
              </ul>
            </div>

            <button
              onClick={() => onRouteChange('dashboard-checkout')}
              className="mt-8 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Probar 7 Días Gratis</span>
            </button>
          </div>

          {/* Plan Pro (RECOMENDADO) */}
          <div className="rounded-3xl bg-slate-900/90 backdrop-blur-md border-2 border-emerald-500 p-8 flex flex-col justify-between shadow-2xl shadow-emerald-500/20 relative transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Plan Recomendado
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Plan Pro
                </h3>
                <p className="text-xs text-slate-400 mt-1">Para agencias en crecimiento y desarrolladoras inmobiliarias.</p>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-white">${proPrice}</span>
                  <span className="text-xs text-slate-400">USD / mes</span>
                </div>
                {isAnnual && <p className="text-[10px] text-emerald-400 mt-1">Ahorro anual del 20% aplicado</p>}
              </div>

              <ul className="space-y-3 text-xs text-slate-200 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> 3 Agentes de IA configurables
                </li>
                <li className="flex items-center gap-2 font-medium text-emerald-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Chats y propiedades ilimitados
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Sincronización automática de CRM
                </li>
                <li className="flex items-center gap-2 font-medium text-emerald-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Soporte prioritario por WhatsApp
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> RAG Documental (PDFs, Excel, Planos)
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Intervención en vivo (Human-in-the-loop)
                </li>
              </ul>
            </div>

            <button
              onClick={() => onRouteChange('dashboard-checkout')}
              className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Suscribirse con Probar Gratis</span>
            </button>
          </div>

          {/* Plan Agency */}
          <div className="rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Plan Agency</h3>
                <p className="text-xs text-slate-400 mt-1">Para redes inmobiliarias, franquicias y múltiples sucursales.</p>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">${agencyPrice}</span>
                  <span className="text-xs text-slate-400">USD / mes</span>
                </div>
                {isAnnual && <p className="text-[10px] text-emerald-400 mt-1">Ahorro anual del 20% aplicado</p>}
              </div>

              <ul className="space-y-3 text-xs text-slate-300 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Agentes de IA Ilimitados
                </li>
                <li className="flex items-center gap-2 text-emerald-300 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Marca Blanca (Sin logo de Aria Prop)
                </li>
                <li className="flex items-center gap-2 text-emerald-300 font-medium">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Dominio Personalizado
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Múltiples sucursales y ciudades
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Gerente de Cuenta Dedicado
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> API Custom & Webhooks
                </li>
              </ul>
            </div>

            <button
              onClick={() => onRouteChange('dashboard-checkout')}
              className="mt-8 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 transition-all cursor-pointer"
            >
              Elegir Plan Agency
            </button>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-white/10 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Preguntas Frecuentes sobre Aria Prop
            </h3>
            <p className="text-xs text-slate-400">Resuelve tus dudas antes de comenzar tu prueba gratuita de 7 días.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-white font-semibold text-xs hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-slate-300 text-xs leading-relaxed border-t border-white/5 bg-black/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
