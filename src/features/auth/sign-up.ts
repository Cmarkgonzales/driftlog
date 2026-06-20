import { isDevAuthEnabled, signInDev } from '@/features/auth/dev-auth';
import { supabase } from '@/services/supabase/client';

export async function signUp(email: string, password: string): Promise<void> {
  if (isDevAuthEnabled()) {
    await signInDev(email);
    return;
  }

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw new Error('Could not create account. Try a different email or password.');
  }
}
