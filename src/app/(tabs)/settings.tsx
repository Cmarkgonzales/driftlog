import { useState } from 'react';

import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { signOut } from '@/features/auth/sign-out';
import { useAuth } from '@/features/auth/use-auth';
import { Text, View } from '@/tw';

export default function SettingsScreen() {
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setErrorMessage(null);
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not sign out.');
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <ScreenContainer>
      <View className="flex-1 justify-between px-6 py-4">
        <View className="gap-6">
          <Text className="text-[36px] font-semibold text-text-primary">Settings</Text>
          <View className="gap-2 rounded-card border border-border bg-surface p-5">
            <Text className="text-sm font-medium text-text-secondary">Signed in as</Text>
            <Text className="text-base text-text-primary">{user?.email ?? 'Unknown user'}</Text>
          </View>
          {errorMessage ? <Text className="text-sm text-blocked">{errorMessage}</Text> : null}
        </View>
        <PrimaryButton isLoading={isSigningOut} title="Sign out" onPress={handleSignOut} />
      </View>
    </ScreenContainer>
  );
}
