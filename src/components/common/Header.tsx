import React from 'react';
import { AppRoute } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  currentRoute?: AppRoute;
  onRouteChange?: (r: AppRoute) => void;
  agencyName?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute = 'marketing', onRouteChange, agencyName = 'Aria Prop' }) => {
  const { user, openAuthModal, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center cursor-pointer" onClick={() => onRouteChange && onRouteChange('marketing')}>
              <div className="w-10 h-10 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-black">AP</div>
              <div className="ml-3 font-bold text-white">{agencyName}</div>
            </div>

            <nav className="hidden md:flex items-center gap-3">
              <button className="text-sm text-slate-200 hover:text-white" onClick={() => onRouteChange && onRouteChange('pricing')}>Precios</button>
              <button className="text-sm text-slate-200 hover:text-white" onClick={() => onRouteChange && onRouteChange('embed-preview')}>Chat</button>
              <button className="text-sm text-slate-200 hover:text-white" onClick={() => onRouteChange && onRouteChange('dashboard-profile')}>Perfil</button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* If user logged in show avatar / logout, else show login / signup */}
            {user ? (
              <>
                <button
                  className="px-3 py-1.5 rounded-md bg-white/5 text-xs text-white hover:bg-white/10"
                  onClick={() => onRouteChange && onRouteChange('dashboard')}
                >
                  Panel
                </button>
                <button
                  className="px-3 py-1.5 rounded-md bg-amber-500 text-xs text-slate-900 font-bold hover:opacity-95"
                  onClick={() => signOut()}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-3 py-1.5 rounded-md bg-white/5 text-xs text-white hover:bg-white/10"
                  onClick={() => openAuthModal('login')}
                  aria-label="Iniciar sesión"
                >
                  Iniciar sesión
                </button>

                <button
                  className="px-3 py-1.5 rounded-md bg-emerald-500 text-xs font-bold text-slate-900 hover:opacity-95"
                  onClick={() => openAuthModal('signup')}
                  aria-label="Registrarse"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
