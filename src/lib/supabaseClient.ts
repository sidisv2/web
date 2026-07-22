import { createClient } from '@supabase/supabase-js';

/**
 * Recomendación: define estas variables en .env:
 * VITE_SUPABASE_URL=
 * VITE_SUPABASE_ANON_KEY=
 */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Upsert profile row in 'profiles' after signup/login.
 * profileData must include id (user.id), email, display_name, avatar_url, estado_cuenta.
 */
export async function upsertProfile(profileData: {
  id: string;
  email?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
  estado_cuenta?: 'gratis' | 'prueba_7dias' | 'plan_activo';
}) {
  const payload = {
    id: profileData.id,
    email: profileData.email || null,
    display_name: profileData.display_name || null,
    avatar_url: profileData.avatar_url || null,
    estado_cuenta: profileData.estado_cuenta || 'gratis',
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('profiles').upsert(payload, { returning: 'minimal' });
  if (error) console.warn('upsertProfile error', error);
}

/**
 * Inicializa listener de auth state. callback recibe (event, session)
 */
export function initAuthListener(callback?: (event: string, session: any) => void) {
  supabase.auth.onAuthStateChange((event, session) => {
    if (callback) callback(event, session);
    if (session?.user) {
      // Ensure profile exists
      upsertProfile({
        id: session.user.id,
        email: session.user.email,
        display_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || null,
        avatar_url: session.user.user_metadata?.avatar_url || null,
        estado_cuenta: 'gratis',
      });
    }
  });
}
