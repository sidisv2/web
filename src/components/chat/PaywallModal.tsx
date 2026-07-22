import React, { useState } from 'react';
import { supabase, saveUserProfile, isSupabaseConfigured } from '../../lib/supabase';
import AuthModal from '../auth/AuthModal';

export const PaywallModal: React.FC<{ isOpen: boolean; onClose: () => void; onSubscriptionActivated?: () => void; }> = ({ isOpen, onClose, onSubscriptionActivated }) => {
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const activateTrial = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!isSupabaseConfigured || !supabase) {
        // Mock activation: write to local storage via saveUserProfile
        const mockSession = (await supabase?.auth?.getSession?.()) || null;
        const fakeUserId = mockSession?.session?.user?.id || `mock_${Date.now()}`;
        await saveUserProfile({ id: fakeUserId, email: 'demo@local', nombre: 'Usuario Demo', fecha_registro: new Date().toISOString(), estado_cuenta: 'plan_activo', fecha_fin_prueba: new Date(Date.now() + 7*24*60*60*1000).toISOString() });
        try { localStorage.setItem('sent_messages_count', '0'); } catch {}
        onSubscriptionActivated?.();
        onClose();
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      if (!user) {
        // require auth first
        setShowAuth(true);
        setLoading(false);
        return;
      }

      // mark subscription active and set trial expiry (7 days)
      const trialEnds = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      // Update profiles: estado_cuenta -> 'plan_activo' and trial_end
      const { error: upErr } = await supabase.from('profiles').upsert({
        id: user.id,
        estado_cuenta: 'plan_activo',
        trial_ends_at: trialEnds,
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
      <div className="paywall-overlay">
        <div className="paywall-card">
          <h3>Plan Básico — Prueba Gratis por 7 Días</h3>
          <p>Disfruta de chat ilimitado con la IA durante 7 días. Después se cobrará según el plan seleccionado.</p>
          {error && <p className="error">{error}</p>}
          <div className="paywall-actions">
            <button onClick={activateTrial} disabled={loading}>Iniciar Prueba 7 Días (Gratis)</button>
            <button className="outline" onClick={onClose}>No ahora</button>
          </div>
        </div>
      </div>

      {showAuth && (
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onAuthSuccess={() => {
            setShowAuth(false);
            // try again after auth
            setTimeout(() => activateTrial(), 250);
          }}
        />
      )}
    </>
  );
};

export default PaywallModal;
