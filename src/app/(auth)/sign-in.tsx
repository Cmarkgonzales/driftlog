import { Link } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { isDevAuthEnabled } from '@/constants/dev-auth';
import { signIn } from '@/features/auth/sign-in';
import { Pressable, ScrollView, Text, TextInput, View } from '@/tw';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not sign in.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View className="gap-8">
            <View className="gap-2">
              <Text className="font-serif text-[22px] italic text-text-primary">
                Welcome back to your drift.
              </Text>
              <Text className="text-base text-text-secondary">
                Sign in to pick up where your workday left off.
              </Text>
              {isDevAuthEnabled() ? (
                <Text className="text-sm text-gold">
                  Dev mode: any email and password will sign you in locally.
                </Text>
              ) : null}
            </View>

            <View className="gap-4">
              <View className="gap-2">
                <Text className="text-sm font-medium text-text-secondary">Email</Text>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="email"
                  className="rounded-card border border-border bg-surface px-4 py-4 text-base text-text-primary"
                  keyboardType="email-address"
                  placeholder="you@example.com"
                  placeholderTextColor="#7C88A8"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View className="gap-2">
                <Text className="text-sm font-medium text-text-secondary">Password</Text>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="password"
                  className="rounded-card border border-border bg-surface px-4 py-4 text-base text-text-primary"
                  placeholder="Your password"
                  placeholderTextColor="#7C88A8"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {errorMessage ? (
                <Text className="text-sm text-blocked">{errorMessage}</Text>
              ) : null}
            </View>

            <PrimaryButton
              disabled={!isDevAuthEnabled() && (!email.trim() || !password)}
              isLoading={isLoading}
              title="Sign in"
              onPress={handleSignIn}
            />

            <View className="flex-row justify-center gap-1">
              <Text className="text-text-secondary">New here?</Text>
              <Link href="/sign-up" asChild>
                <Pressable>
                  <Text className="font-medium text-teal">Create an account</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
});
