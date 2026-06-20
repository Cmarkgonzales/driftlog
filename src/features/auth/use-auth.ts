import { useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';

import { getDevSession, isDevAuthEnabled, subscribeDevAuth } from '@/features/auth/dev-auth';
import { supabase } from '@/services/supabase/client';

type AuthState = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isDevAuth: boolean;
};

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isDevAuth = isDevAuthEnabled();

  useEffect(() => {
    if (isDevAuth) {
      let isMounted = true;

      getDevSession().then((currentSession) => {
        if (!isMounted) {
          return;
        }
        setSession(currentSession);
        setIsLoading(false);
      });

      const unsubscribe = subscribeDevAuth((nextSession) => {
        setSession(nextSession);
        setIsLoading(false);
      });

      return () => {
        isMounted = false;
        unsubscribe();
      };
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!isMounted) {
        return;
      }
      setSession(currentSession);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [isDevAuth]);

  return {
    session,
    user: session?.user ?? null,
    isLoading,
    isDevAuth,
  };
}
