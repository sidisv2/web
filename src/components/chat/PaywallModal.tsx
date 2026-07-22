import React, { useState } from 'react';
import { supabase, saveUserProfile, isSupabaseConfigured } from '../../lib/supabase';
import AuthModal from '../auth/AuthModal';
import { useAuth } from '../../context/AuthContext';

export const PaywallModal: React.FC<{ isOpen: boolean; onClose: () => void; onSubscriptionActivated?: () => void; }> = ({ isOpen, onClose, onSubscriptionActivated }) => {
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, openAuthModal } = useAuth();

  if (!isOpen) return null;

  const activateTrial = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!isSupabaseConfigured || !supabase) {
        // Mock activation: write to local storage via saveUserProfile
        const mockSession = (await supabase?.auth?.getSession?.()) || null;
        const fakeUserId = mockSession?.session?.user?.id || `mock_${Date.now()}`;
        await saveUserProfile({ id: fakeUserId, email: 'demo@local', nombre: 'Usuario Demo', fecha_registro: new Date().toISOString(), estado_cuenta: 'prueba_7dias', fecha_fin_prueba: new Date(Date.now() + 7*24*60*60*1000).toISOString() });
        try { localStorage.setItem('sent_messages_count', '0'); } catch {}
        onSubscriptionActivated?.();
        onClose();
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const sUser = sessionData?.session?.user;
      if (!sUser) {
        // require auth first - open Auth Modal
        openAuthModal('login');
        setLoading(false);
        return;
      }

      // mark subscription trial active and set trial expiry (7 days)
      const trialEnds = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      // Update profiles: estado_cuenta -> 'prueba_7dias' and fecha_fin_prueba
      const { error: upErr } = await supabase.from('profiles').upsert({
        id: sUser.id,
        estado_cuenta: 'prueba_7dias',
        fecha_fin_prueba: trialEnds,
        updated_at: new Date().toISOString(),
      }, { returning: 'minimal' });

      if (upErr) throw upErr;

      // Clear local counters so chat unlocks
      try { localStorage.setItem('sent_messages_count', '0'); } catch {}

      onSubscriptionActivated?.();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Error al activar la prueba');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="paywall-overlay" role="dialog" aria-modal="true">
        <div className="paywall-card">
          <h3 className="text-lg font-bold">Plan Básico — Prueba Gratis por 7 Días</h3>
          <p className="text-sm text-slate-300">Disfruta de chat ilimitado con la IA durante 7 días. Después se cobrará según el plan seleccionado.</p>
          {error && <p className="error">{error}</p>}
          <div className="paywall-actions" style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button onClick={activateTrial} disabled={loading} className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 font-bold">Comenzar Prueba Gratis de 7 Días</button>
            <button className="px-4 py-2 rounded-lg border" onClick={onClose}>No ahora</button>
          </div>
        </div>
      </div>

      {/* If user not authenticated, we can also show the AuthModal inline */}
      {showAuth && (
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onAuthSuccess={() => {
            setShowAuth(false);
            setTimeout(() => activateTrial(), 250);
          }}
        />
      )}
    </>
  );
};

export default PaywallModal;
