import React from 'react';
import { InteractiveSandboxWidget } from './InteractiveSandboxWidget';
import { Property, AppRoute } from '../../types';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, MessageSquare } from 'lucide-react';

interface HeroSectionProps {
  sampleProperties: Property[];
  onRouteChange: (route: AppRoute) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ sampleProperties, onRouteChange }) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      
      {/* Background glow & grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-gradient blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Shiny Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-300">Novedad: Conexión nativa con WhatsApp Business API</span>
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            </div>

            {/* Impact Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Agentes de IA que <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Venden y Cualifican
              </span> <br />
              Inmuebles 24/7.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Aumenta la captura de leandings inmobiliarios en un <strong className="text-emerald-400 font-bold">340%</strong>. Tu agente de IA responde preguntas sobre planos, precios y memoria de calidades en menos de 1 segundo e integra directamente con tu CRM.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onRouteChange('dashboard-metrics')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Probar 7 Días Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onRouteChange('embed-preview')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Ver Widget Interactivo</span>
              </button>
            </div>

            {/* Key Trust Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RAG con Dossier PDF y Planos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lead Scoring Automático</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Agendamiento de Visitas</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Widget Sandbox */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl"></div>
            <InteractiveSandboxWidget sampleProperties={sampleProperties} />
          </div>

        </div>
      </div>
    </section>
  );
};
