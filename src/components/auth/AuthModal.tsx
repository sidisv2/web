import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Lock,
  Mail,
  User as UserIcon,
  Eye,
  EyeOff,
  X,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  CreditCard
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    modalTab,
    pendingPlan,
    closeAuthModal,
    signIn,
    signUp,
    signInWithGoogle
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(modalTab || 'login');
  
  // Form fields
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status & Validation
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success' | 'info'; message: string } | null>(null);

  // Sync tab with AuthContext state when modal opens
  useEffect(() => {
    if (authModalOpen) {
      setActiveTab(modalTab);
      setFeedback(null);
      setNombre('');
      setEmail('');
      setPassword('');
      setShowPassword(false);
    }
  }, [authModalOpen, modalTab]);

  if (!authModalOpen) return null;

  // Real-time validations
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isNameValid = activeTab === 'signup' ? nombre.trim().length >= 2 : true;

  const canSubmit = isEmailValid && isPasswordValid && isNameValid && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setFeedback({ type: 'info', message: activeTab === 'login' ? 'Iniciando sesión...' : 'Creando tu cuenta en Supabase...' });

    if (activeTab === 'login') {
      const res = await signIn({ email, password });
      if (!res.success) {
        setFeedback({ type: 'error', message: res.error || 'Credenciales incorrectas. Verifica tu email y contraseña.' });
        setSubmitting(false);
      } else {
        setFeedback({ type: 'success', message: '¡Sesión iniciada con éxito! Redirigiendo...' });
      }
    } else {
      const res = await signUp({ email, password, nombre });
      if (!res.success) {
        setFeedback({ type: 'error', message: res.error || 'No se pudo crear la cuenta. Intenta de nuevo.' });
        setSubmitting(false);
      } else {
        setFeedback({ type: 'success', message: '¡Cuenta creada con éxito en Supabase! Redirigiendo...' });
      }
    }
  };

  const handleGoogleAuth = async () => {
    setSubmitting(true);
    setFeedback({ type: 'info', message: 'Conectando con Google OAuth...' });
    const res = await signInWithGoogle();
    if (!res.success) {
      setFeedback({ type: 'error', message: res.error || 'Error al conectar con Google' });
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-500/10 overflow-hidden space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-b-full shadow-[0_0_20px_rgba(16,185,129,0.8)]" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Title & Pending Intention Banner */}
        <div className="space-y-2 text-center pt-2">
          {pendingPlan ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold shadow-sm">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Protección de Pago: Plan {pendingPlan.toUpperCase()}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acceso Seguro Aria Prop</span>
            </div>
          )}

          <h3 className="text-2xl font-black text-white tracking-tight">
            {pendingPlan ? 'Inicia sesión para continuar tu suscripción' : 'Bienvenido a Aria Prop'}
          </h3>
          
          <p className="text-xs text-slate-400 leading-relaxed">
            {pendingPlan
              ? 'Por seguridad, debes estar registrado para activar tu plan y acceder a las pasarelas de pago.'
              : 'Gestiona tus agentes de IA inmobiliaria y automatizaciones en un solo lugar.'}
          </p>
        </div>

        {/* Auth Tabs Switcher */}
        <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setFeedback(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              setFeedback(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
              feedback.type === 'error'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                : feedback.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-sky-500/10 border-sky-500/30 text-sky-300'
            }`}
          >
            {feedback.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />}
            {feedback.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
            {feedback.type === 'info' && <Loader2 className="w-4 h-4 shrink-0 animate-spin text-sky-400" />}
            <span className="leading-tight">{feedback.message}</span>
          </div>
        )}

        {/* OAuth Google Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={submitting}
          className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continuar con Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative px-3 bg-slate-900 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            o con tu email
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nombre Completo (Solo Sign Up) */}
          {activeTab === 'signup' && (
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-300">
                Nombre Completo
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ej. Carlos Mendoza"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-[11px] font-semibold text-slate-300">
                Correo Electrónico
              </label>
              {email.length > 0 && (
                <span className={`text-[10px] ${isEmailValid ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isEmailValid ? '✓ Email válido' : 'Email inválido'}
                </span>
              )}
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="ejemplo@agenciainmobiliaria.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Password with Eye Toggle 👁️ */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-[11px] font-semibold text-slate-300">
                Contraseña
              </label>
              {password.length > 0 && (
                <span className={`text-[10px] ${isPasswordValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isPasswordValid ? '✓ Mínimo 6 caracteres' : 'Faltan caracteres'}
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-1 cursor-pointer"
                title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{activeTab === 'login' ? 'Iniciar Sesión & Continuar' : 'Crear Cuenta en Supabase'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Guarantee stamp */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-2 border-t border-white/5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Autenticación 100% Segura vía Supabase Auth</span>
        </div>

      </div>
    </div>
  );
};
