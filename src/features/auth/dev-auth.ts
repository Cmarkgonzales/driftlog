import type { Session } from '@supabase/supabase-js';

import { isDevAuthEnabled } from '@/constants/dev-auth';
import { authStorage } from '@/services/supabase/auth-storage';

const DEV_AUTH_STORAGE_KEY = 'driftlog.dev-auth.session';

type DevAuthListener = (session: Session | null) => void;

const listeners = new Set<DevAuthListener>();

export { isDevAuthEnabled };

function notifyDevAuthListeners(session: Session | null): void {
  listeners.forEach((listener) => {
    listener(session);
  });
}

export function subscribeDevAuth(listener: DevAuthListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function createMockSession(email: string): Session {
  const now = new Date().toISOString();
  const userId = '00000000-0000-4000-8000-000000000001';

  return {
    access_token: 'dev-access-token',
    refresh_token: 'dev-refresh-token',
    expires_in: 60 * 60 * 24 * 365,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    token_type: 'bearer',
    user: {
      id: userId,
      aud: 'authenticated',
      role: 'authenticated',
      email,
      email_confirmed_at: now,
      phone: '',
      confirmed_at: now,
      last_sign_in_at: now,
      app_metadata: { provider: 'email', providers: ['email'] },
      user_metadata: { dev: true },
      identities: [],
      created_at: now,
      updated_at: now,
      is_anonymous: false,
    },
  };
}

export async function getDevSession(): Promise<Session | null> {
  const stored = await authStorage.getItem(DEV_AUTH_STORAGE_KEY);
  if (!stored) {
    return null;
  }
  try {
    return JSON.parse(stored) as Session;
  } catch {
    await authStorage.removeItem(DEV_AUTH_STORAGE_KEY);
    return null;
  }
}

async function persistDevSession(session: Session): Promise<void> {
  await authStorage.setItem(DEV_AUTH_STORAGE_KEY, JSON.stringify(session));
}

export async function signInDev(email: string): Promise<void> {
  const normalizedEmail = email.trim() || 'dev@driftlog.local';
  const session = createMockSession(normalizedEmail);
  await persistDevSession(session);
  notifyDevAuthListeners(session);
}

export async function signOutDev(): Promise<void> {
  await authStorage.removeItem(DEV_AUTH_STORAGE_KEY);
  notifyDevAuthListeners(null);
}
