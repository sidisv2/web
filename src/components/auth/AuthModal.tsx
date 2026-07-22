import React, { useState } from 'react';
import { supabase, saveUserProfile as upsertProfile, isSupabaseConfigured } from '../../lib/supabase';

export const AuthModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      if (!isSupabaseConfigured || !supabase) {
        // Fallback mock login
        const mockUserId = `mock_${Date.now()}`;
        await upsertProfile({ id: mockUserId, email, display_name: displayName || email.split('@')[0] || null, estado_cuenta: 'gratis' });
        onAuthSuccess?.();
        onClose();
        return;
      }

      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data?.user) {
        await upsertProfile({ id: data.user.id, email: data.user.email, display_name: displayName || data.user.email?.split('@')[0] || null, estado_cuenta: 'gratis' });
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
        await upsertProfile({ id: mockUserId, email, display_name: displayName || email.split('@')[0] || null, estado_cuenta: 'gratis' });
        onAuthSuccess?.();
        onClose();
        return;
      }

      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: displayName } } });
      if (error) throw error;
      if (data?.user) {
        await upsertProfile({ id: data.user.id, email: data.user.email, display_name: displayName || data.user.email?.split('@')[0] || null, estado_cuenta: 'gratis' });
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
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="tabs">
          <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Iniciar Sesión</button>
          <button className={tab === 'signup' ? 'active' : ''} onClick={() => setTab('signup')}>Registro</button>
        </div>

        <div className="modal-body">
          {tab === 'signup' && (
            <input placeholder="Nombre" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          )}
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMsg && <p className="error">{errorMsg}</p>}
          <div className="actions">
            {tab === 'login' ? (
              <button onClick={handleLogin} disabled={loading}>Entrar</button>
            ) : (
              <button onClick={handleSignup} disabled={loading}>Crear cuenta</button>
            )}
            <button onClick={handleGoogle} className="google-btn">Entrar con Google</button>
          </div>
          <button className="close-btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
