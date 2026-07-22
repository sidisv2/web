import React from 'react';
import { AppRoute } from '../../types';
import { RealtimeDot } from './RealtimeDot';
import { 
  Building2, 
  LayoutDashboard, 
  Sliders, 
  Code, 
  Sparkles,
  CreditCard,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  agencyName?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onRouteChange, agencyName = 'Aria Prop LATAM' }) => {
  const isDashboard = currentRoute.startsWith('dashboard');

  return (
    <header className="sticky top-0 z-50 w-full bg-black/20 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onRouteChange('marketing')}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 rounded-[7px] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">Aria <span className="text-emerald-400">Prop</span></span>
              <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">LATAM AI</span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Agentes de IA Inmobiliaria para Latinoamérica</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-sm p-1 rounded-xl border border-white/5">
          <button
            onClick={() => onRouteChange('marketing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentRoute === 'marketing'
                ? 'bg-white/10 text-white font-semibold border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Inicio</span>
          </button>

          <button
            onClick={() => onRouteChange('dashboard-metrics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              isDashboard && currentRoute !== 'dashboard-checkout'
                ? 'bg-white/10 text-white font-semibold border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dashboard Agencia</span>
          </button>

          <button
            onClick={() => onRouteChange('dashboard-checkout')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentRoute === 'dashboard-checkout'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Planes & Pagos</span>
          </button>

          <button
            onClick={() => onRouteChange('embed-preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentRoute === 'embed-preview'
                ? 'bg-white/10 text-white font-semibold border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-emerald-400" />
            <span>Widget Embebible</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          <RealtimeDot className="hidden lg:inline-flex" />

          {isDashboard ? (
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-white">{agencyName}</p>
                <p className="text-[10px] text-emerald-400">Pro LATAM Activo</p>
              </div>
              <button
                onClick={() => onRouteChange('dashboard-bot-config')}
                className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all cursor-pointer"
                title="Configuración del Bot Aria Prop"
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onRouteChange('dashboard-metrics')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Acceder al Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
