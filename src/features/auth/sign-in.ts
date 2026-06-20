import { isDevAuthEnabled, signInDev } from '@/features/auth/dev-auth';
import { supabase } from '@/services/supabase/client';

export async function signIn(email: string, password: string): Promise<void> {
  if (isDevAuthEnabled()) {
    await signInDev(email);
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error('Could not sign in. Check your email and password.');
  }
}
