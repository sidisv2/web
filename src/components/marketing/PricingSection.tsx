import React, { useState } from 'react';
import { AppRoute } from '../../types';
import {
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  Lock,
  RefreshCw,
  Award,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Globe,
  Wallet,
  ShieldAlert,
  Sliders
} from 'lucide-react';
import {
  VisaLogo,
  MastercardLogo,
  AmexLogo,
  MercadoPagoLogo,
  PaypalLogo,
  SpeiLogo,
  PseLogo,
  UsdtLogo
} from '../common/PaymentLogos';

interface PricingSectionProps {
  onRouteChange: (route: AppRoute) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onRouteChange }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedGateway, setSelectedGateway] = useState<string>('all');

  // Pricing calculations with 20% discount on annual
  const starterPrice = isAnnual ? Math.round(39 * 0.8) : 39;
  const proPrice = isAnnual ? Math.round(89 * 0.8) : 89;
  const agencyPrice = isAnnual ? Math.round(199 * 0.8) : 199;

  const paymentMethods = [
    {
      id: 'cards',
      name: 'Tarjetas de Crédito y Débito',
      category: 'global',
      description: 'Visa, Mastercard, American Express y tarjetas locales.',
      speed: 'Procesamiento Instantáneo (0s)',
      currencies: 'USD, MXN, COP, ARS, CLP, EUR',
      icon: (
        <div className="flex items-center gap-2">
          <VisaLogo className="h-5" />
          <MastercardLogo className="h-5" />
          <AmexLogo className="h-4" />
        </div>
      ),
      badge: 'Bancario SSL'
    },
    {
      id: 'mercadopago',
      name: 'Mercado Pago LATAM',
      category: 'latam',
      description: 'Pago seguro en moneda local sin comisiones por tipo de cambio.',
      speed: 'Aprobación Inmediata',
      currencies: '🇲🇽 MXN | 🇦🇷 ARS | 🇨🇴 COP | 🇨🇱 CLP | 🇵🇪 PEN',
      icon: <MercadoPagoLogo className="h-6" />,
      badge: 'Líder LATAM'
    },
    {
      id: 'paypal',
      name: 'PayPal Express',
      category: 'global',
      description: 'Protección al comprador de PayPal en transacciones internacionales.',
      speed: 'Instantáneo',
      currencies: 'USD, EUR y 25+ divisas',
      icon: <PaypalLogo className="h-6" />,
      badge: 'Protección Total'
    },
    {
      id: 'transfer',
      name: 'Transferencia Directa (SPEI / PSE)',
      category: 'latam',
      description: 'Transferencia bancaria directa SPEI (México), PSE (Colombia) y CBU (Argentina).',
      speed: 'Confirmación < 5 min',
      currencies: 'Moneda Local Directa',
      icon: (
        <div className="flex items-center gap-1.5">
          <SpeiLogo />
          <PseLogo />
        </div>
      ),
      badge: 'Sin Tarjeta'
    },
    {
      id: 'crypto',
      name: 'Binance Pay & USDT Crypto',
      category: 'crypto',
      description: 'Pagos descentralizados en USDT (TRC20 / Polygon) y USDC con cero comisiones.',
      speed: 'Confirmación Blockchain (1 min)',
      currencies: 'USDT, USDC, BUSD',
      icon: (
        <div className="flex items-center gap-2">
          <UsdtLogo className="h-6" />
          <span className="text-xs font-bold text-yellow-400">Binance Pay</span>
        </div>
      ),
      badge: 'Web3 & Crypto'
    }
  ];

  const trustBadges = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Pago 100% Seguro',
      desc: 'Encriptado bancario SSL de 256 bits a través de pasarelas auditadas PCI-DSS.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-emerald-400" />,
      title: 'Garantía 14 Días',
      desc: 'Reembolso sin preguntas si el agente de IA no incrementa tus contactos cualificados.'
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-400" />,
      title: 'Sin Permanencia',
      desc: 'Cancela o cambia de plan en cualquier momento con un solo clic desde tu panel.'
    },
    {
      icon: <Headphones className="w-6 h-6 text-emerald-400" />,
      title: 'Soporte VIP 24/7',
      desc: 'Equipo especializado para asistirte en la puesta en marcha de tu agente Aria.'
    }
  ];

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
      a: 'Aceptamos tarjetas de crédito/débito internacionales via Stripe, Mercado Pago para Latinoamérica (MXN, COP, ARS, CLP, PEN), PayPal Express, transferencias bancarias locales (SPEI/PSE) y criptomonedas (USDT/Binance Pay).',
    },
    {
      q: '¿Cómo lee Aria Prop la información de mis propiedades?',
      a: 'Simplemente subes tus archivos PDF (dossiers, memorias de calidad), Excel o enlaces web. Nuestro motor RAG indexa las características en segundos.',
    },
    {
      q: '¿Puedo cancelar o cambiar de plan en cualquier momento?',
      a: 'Absolutamente. No hay contratos de permanencia obligatorios en planes mensuales ni anuales, y puedes actualizar tu plan desde tu panel en un solo clic.',
    },
  ];

  const filteredMethods = selectedGateway === 'all'
    ? paymentMethods
    : paymentMethods.filter(m => m.category === selectedGateway);

  return (
    <section id="pricing" className="py-24 bg-slate-950 border-t border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-bold tracking-wide uppercase shadow-lg shadow-emerald-500/10">
            <Zap className="w-3.5 h-3.5" />
            <span>Suscripciones Transparentes & Pagos Flexibles</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Planes diseñados para acelerar tus ventas
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Comienza gratis por 7 días sin requerir tarjeta. Escala a medida que crece tu catálogo e integra las mejores pasarelas de pago de tu región.
          </p>

          {/* Free trial callout badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-emerald-500/20 text-xs text-slate-200 shadow-inner">
            <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span><strong>7 Días de Prueba Gratis</strong> — Registro instantáneo sin tarjeta de crédito</span>
          </div>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={`text-xs sm:text-sm font-semibold transition-colors ${!isAnnual ? 'text-white font-bold' : 'text-slate-400'}`}>
              Facturación Mensual
            </span>
            
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              aria-label="Alternar facturación mensual y anual"
              className="relative w-16 h-8 rounded-full bg-slate-900 p-1 border border-emerald-500/30 hover:border-emerald-500 transition-colors cursor-pointer shadow-inner"
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-md transform transition-transform ${
                  isAnnual ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>

            <span className={`text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors ${isAnnual ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
              <span>Facturación Anual</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm animate-pulse">
                AHORRA 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Tier Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* TIER 1: Básico / Starter */}
          <div className="rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group">
            <div className="space-y-6">
              <div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-white/10 text-slate-300 border border-white/10">
                  INICIO RÁPIDO
                </span>
                <h3 className="text-xl font-extrabold text-white mt-3">Plan Básico</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Ideal para agentes independientes e inmobiliarias pequeñas que inician con IA.
                </p>
              </div>

              <div className="py-2 border-y border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">${starterPrice}</span>
                  <span className="text-xs text-slate-400 font-medium">USD / mes</span>
                </div>
                {isAnnual ? (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">✓ 20% de descuento incluido ($374/año)</p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1">Facturado mensualmente</p>
                )}
              </div>

              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>1 Agente de IA (Aria)</strong> totalmente activo</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Hasta <strong>500 chats de cualificación</strong>/mes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Hasta <strong>20 propiedades</strong> sincronizadas</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Widget Web Embebible 100% personalizable</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Alertas instantáneas por correo</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onRouteChange('dashboard-checkout')}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white font-extrabold text-xs border border-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Comenzar Prueba Gratis (7 Días)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* TIER 2: Plan Profesional (MÁS POPULAR) */}
          <div className="rounded-3xl bg-slate-900/90 backdrop-blur-md border-2 border-emerald-500 p-8 flex flex-col justify-between shadow-2xl shadow-emerald-500/20 relative transform lg:-translate-y-3 transition-all duration-300 group hover:border-emerald-400">
            {/* Badge Highlight */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 ring-2 ring-slate-950">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>MÁS POPULAR — MEJOR VALOR</span>
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  RECOMENDADO PARA AGENCIAS
                </span>
                <h3 className="text-2xl font-black text-white mt-3 flex items-center gap-2">
                  Plan Profesional
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Para agencias en crecimiento que buscan automatización total por WhatsApp y CRM.
                </p>
              </div>

              <div className="py-2 border-y border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white font-mono">${proPrice}</span>
                  <span className="text-xs text-slate-300 font-medium">USD / mes</span>
                </div>
                {isAnnual ? (
                  <p className="text-[11px] text-emerald-400 font-bold mt-1">✓ Ahorras $216 al año (Facturado $854/año)</p>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-1">Facturado mensualmente</p>
                )}
              </div>

              <ul className="space-y-3.5 text-xs text-slate-100">
                <li className="flex items-center gap-2.5 font-semibold text-emerald-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>3 Agentes de IA configurables</strong> (Ventas, Rentas, Postventa)</span>
                </li>
                <li className="flex items-center gap-2.5 font-semibold text-emerald-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Chats y Propiedades Ilimitados</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Sincronización Automática de CRM en vivo</span>
                </li>
                <li className="flex items-center gap-2.5 font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Soporte Prioritario por WhatsApp 24/7</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>RAG Documental (PDFs, Excel, Planos de obra)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Intervención humana en vivo (Human-in-the-loop)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onRouteChange('dashboard-checkout')}
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 transform group-hover:scale-[1.02]"
              >
                <CreditCard className="w-4 h-4" />
                <span>Suscribirse con 7 Días Gratis</span>
              </button>
            </div>
          </div>

          {/* TIER 3: Enterprise / Agency */}
          <div className="rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group">
            <div className="space-y-6">
              <div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  REDES E INMOBILIARIAS
                </span>
                <h3 className="text-xl font-extrabold text-white mt-3">Plan Enterprise</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Para franquicias, desarrolladoras y múltiples sucursales con marca blanca.
                </p>
              </div>

              <div className="py-2 border-y border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">${agencyPrice}</span>
                  <span className="text-xs text-slate-400 font-medium">USD / mes</span>
                </div>
                {isAnnual ? (
                  <p className="text-[11px] text-emerald-400 font-semibold mt-1">✓ Ahorras $478 al año (Facturado $1,910/año)</p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1">Facturado mensualmente</p>
                )}
              </div>

              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Agentes de IA Ilimitados</strong></span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-emerald-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>Marca Blanca 100%</strong> (Sin marca de Aria Prop)</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-emerald-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Dominio personalizado (bot.tuagencia.com)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Gestión de múltiples sucursales y ciudades</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Gerente de Cuenta Dedicado</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>API REST Custom, Webhooks & Zapier</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onRouteChange('dashboard-checkout')}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white font-extrabold text-xs border border-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Elegir Plan Enterprise</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* SECTION 2: ACCEPTED PAYMENT METHODS */}
        <div id="payment-methods" className="rounded-3xl bg-slate-900/60 border border-white/10 p-8 sm:p-12 space-y-10 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                <Wallet className="w-3.5 h-3.5" />
                <span>Métodos de Pago Aceptados</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Paga de forma fácil y segura en tu moneda local
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Soportamos las pasarelas de pago más populares de Latinoamérica y el mundo. Transacciones 100% cifradas y acreditación instantánea.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setSelectedGateway('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedGateway === 'all'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedGateway('latam')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedGateway === 'latam'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🌎 LATAM Local
              </button>
              <button
                onClick={() => setSelectedGateway('global')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedGateway === 'global'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                💳 Tarjeta / Global
              </button>
              <button
                onClick={() => setSelectedGateway('crypto')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedGateway === 'crypto'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🪙 Crypto / USDT
              </button>
            </div>
          </div>

          {/* Payment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMethods.map((method) => (
              <div
                key={method.id}
                className="rounded-2xl bg-black/40 border border-white/5 hover:border-emerald-500/40 p-6 space-y-4 transition-all duration-300 hover:bg-black/60 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                      {method.icon}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {method.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {method.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2 text-[11px]">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500">Velocidad:</span>
                    <span className="font-semibold text-emerald-400">{method.speed}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-500">Monedas:</span>
                    <span className="font-mono text-slate-300">{method.currencies}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Direct CTA Bar under Payment Methods */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">¿Listo para probar Aria Prop en tu negocio?</h4>
                <p className="text-xs text-slate-400">Prueba gratuita de 7 días. Selecciona tu plan y método preferido en el checkout.</p>
              </div>
            </div>

            <button
              onClick={() => onRouteChange('dashboard-checkout')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Ir a la Pasarela de Pago</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SECTION 3: TRUST & SECURITY BADGES */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Garantías de Seguridad y Confianza</h3>
            <p className="text-xs text-slate-400 mt-1">Transacciones protegidas con los máximos estándares de la industria financiera.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-inner">
                  {badge.icon}
                </div>
                <h4 className="text-sm font-bold text-white">{badge.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-white/10 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Preguntas Frecuentes sobre Aria Prop
            </h3>
            <p className="text-xs text-slate-400">Resuelve todas tus dudas antes de iniciar tu prueba de 7 días gratis.</p>
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
                    className="w-full p-4 text-left flex items-center justify-between text-white font-semibold text-xs sm:text-sm hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 bg-black/20">
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
