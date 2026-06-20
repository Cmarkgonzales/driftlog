import { isDevAuthEnabled, signOutDev } from '@/features/auth/dev-auth';
import { supabase } from '@/services/supabase/client';

export async function signOut(): Promise<void> {
  if (isDevAuthEnabled()) {
    await signOutDev();
    return;
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error('Could not sign out. Please try again.');
  }
}
