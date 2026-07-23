import React, { useState, useEffect } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
  initialTab?: 'login' | 'signup';
}> = ({ isOpen, onClose, onAuthSuccess, initialTab = 'login' }) => {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  const [identifier, setIdentifier] = useState(''); // accepts username or email
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { signIn, signUp } = useAuth();

  useEffect(() => {
    setTab(initialTab);
    if (!isOpen) {
      setIdentifier('');
      setPassword('');
      setDisplayName('');
      setErrorMsg(null);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const normalizeIdentifier = (value: string) => {
    const v = value.trim();
    if (v === 'admin') return 'admin@admin.com';
    return v;
  };

  const handleAction = async () => {
    setLoading(true);
    setErrorMsg(null);

    const normalized = normalizeIdentifier(identifier || '');
    const email = normalized.includes('@') ? normalized : normalized;

    try {
      // Admin local bypass (DEV/DEMO only)
      if ((identifier === 'admin' || identifier === 'admin@admin.com') && password === 'admin') {
        const adminUser = {
          id: 'admin',
          email: 'admin@admin.com',
          nombre: displayName || 'Admin',
          avatarUrl: '',
          role: 'admin',
          createdAt: new Date().toISOString(),
        } as any;
        try { localStorage.setItem('aria_prop_mock_session_user', JSON.stringify(adminUser)); } catch {}
        try { localStorage.setItem('aria_prop_mock_role', 'admin'); } catch {}
        onAuthSuccess?.();
        onClose();
        return;
      }

      if (tab === 'login') {
        const res = await signIn({ email, password });
        if (!res.success) throw new Error(res.error || 'Error al iniciar sesión');
      } else {
        const signupEmail = email || `${displayName || identifier}@example.com`;
        const res = await signUp({ email: signupEmail, password, nombre: displayName || signupEmail.split('@')[0] });
        if (!res.success) throw new Error(res.error || 'Error en registro');
      }

      onAuthSuccess?.();
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  const googleEnabled = isSupabaseConfigured;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="tabs" role="tablist" style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px', marginBottom: '12px' }}>
          <button className={tab === 'login' ? 'active-tab' : ''} onClick={() => setTab('login')} aria-selected={tab === 'login'}>Iniciar Sesión</button>
          <button className={tab === 'signup' ? 'active-tab' : ''} onClick={() => setTab('signup')} aria-selected={tab === 'signup'}>Registrarse</button>
        </div>

        <div className="modal-body">
          <label htmlFor="identifier" className="text-sm block mb-1">Correo o Usuario</label>
          <input id="identifier" placeholder="usuario o correo" type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="w-full mb-3" />

          {tab === 'signup' && (
            <>
              <label htmlFor="displayName" className="text-sm block mb-1">Nombre visible</label>
              <input id="displayName" placeholder="Nombre" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full mb-3" />
            </>
          )}

          <label htmlFor="password" className="text-sm block mb-1">Contraseña</label>
          <input id="password" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-3" />

          {errorMsg && <p className="error" style={{ color: '#ff6b6b' }}>{errorMsg}</p>}

          <div className="actions" style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button onClick={handleAction} disabled={loading} className="btn primary">{tab === 'login' ? 'Entrar' : 'Crear cuenta'}</button>

            {googleEnabled ? (
              <button onClick={async () => { /* OAuth handled by AuthContext/supabase */ }} className="btn google-btn" type="button">Entrar con Google</button>
            ) : (
              <button disabled title="OAuth no configurado" style={{ opacity: 0.6, cursor: 'not-allowed' }} className="btn">OAuth deshabilitado</button>
            )}
          </div>

          <button className="close-btn mt-3" onClick={onClose} aria-label="Cerrar modal">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
