import React, { useState } from 'react';
import { supabase, saveUserProfile as upsertProfile, isSupabaseConfigured } from '../../lib/supabase';

export const AuthModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
  initialTab?: 'login' | 'signup';
}> = ({ isOpen, onClose, onAuthSuccess, initialTab = 'login' }) => {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    setTab(initialTab);
  }, [initialTab, isOpen]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      if (!isSupabaseConfigured || !supabase) {
        // Fallback mock login
        const mockUserId = `mock_${Date.now()}`;
        await upsertProfile({ id: mockUserId, email, display_name: displayName || email.split('@')[0] || null, estado_cuenta: 'gratis', fecha_registro: new Date().toISOString() });
        onAuthSuccess?.();
        onClose();
        return;
      }

      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data?.user) {
        await upsertProfile({ id: data.user.id, email: data.user.email, display_name: displayName || data.user.email?.split('@')[0] || null, estado_cuenta: 'gratis', fecha_registro: new Date().toISOString() });
      }
      onAuthSuccess?.();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error en login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      if (!isSupabaseConfigured || !supabase) {
        // Mock signup
        const mockUserId = `mock_${Date.now()}`;
        await upsertProfile({ id: mockUserId, email, display_name: displayName || email.split('@')[0] || null, estado_cuenta: 'gratis', fecha_registro: new Date().toISOString() });
        onAuthSuccess?.();
        onClose();
        return;
      }

      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: displayName } } });
      if (error) throw error;
      if (data?.user) {
        await upsertProfile({ id: data.user.id, email: data.user.email, display_name: displayName || data.user.email?.split('@')[0] || null, estado_cuenta: 'gratis', fecha_registro: new Date().toISOString() });
      }
      onAuthSuccess?.();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error en registro');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        setErrorMsg('Google OAuth no está configurado. Usa correo y contraseña o configura OAuth en Supabase. (Modo demo)');
        return;
      }
      await supabase.auth.signInWithOAuth({ provider: 'google' });
      // OAuth redirect handled by Supabase
    } catch (err: any) {
      setErrorMsg('Google OAuth no está configurado. Usa correo y contraseña o configura OAuth en Supabase.');
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="tabs" role="tablist">
          <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')} aria-selected={tab === 'login'}>Iniciar Sesión</button>
          <button className={tab === 'signup' ? 'active' : ''} onClick={() => setTab('signup')} aria-selected={tab === 'signup'}>Registro</button>
        </div>

        <div className="modal-body">
          {tab === 'signup' && (
            <input placeholder="Nombre" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          )}
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMsg && <p className="error" style={{ color: '#ff6b6b' }}>{errorMsg}</p>}
          <div className="actions">
            {tab === 'login' ? (
              <button onClick={handleLogin} disabled={loading} className="btn primary">Entrar</button>
            ) : (
              <button onClick={handleSignup} disabled={loading} className="btn primary">Crear cuenta</button>
            )}
            <button onClick={handleGoogle} className="btn google-btn" type="button">Entrar con Google</button>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Cerrar modal">✕</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
