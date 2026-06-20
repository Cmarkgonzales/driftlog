import { Link } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { ScreenContainer } from '@/components/ScreenContainer';
import { isDevAuthEnabled } from '@/constants/dev-auth';
import { signUp } from '@/features/auth/sign-up';
import { Pressable, ScrollView, Text, TextInput, View } from '@/tw';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp() {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);
    try {
      await signUp(email.trim(), password);
      setSuccessMessage('Account created. You can sign in now.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not create account.');
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
                Start your driftlog.
              </Text>
              <Text className="text-base text-text-secondary">
                Clock in once. Drop quick notes. Let AI write the report.
              </Text>
              {isDevAuthEnabled() ? (
                <Text className="text-sm text-gold">
                  Dev mode: sign-up creates a local session instantly.
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
                  autoComplete="new-password"
                  className="rounded-card border border-border bg-surface px-4 py-4 text-base text-text-primary"
                  placeholder="At least 6 characters"
                  placeholderTextColor="#7C88A8"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {errorMessage ? (
                <Text className="text-sm text-blocked">{errorMessage}</Text>
              ) : null}
              {successMessage ? (
                <Text className="text-sm text-productive">{successMessage}</Text>
              ) : null}
            </View>

            <PrimaryButton
              disabled={!isDevAuthEnabled() && (!email.trim() || password.length < 6)}
              isLoading={isLoading}
              title="Create account"
              onPress={handleSignUp}
            />

            <View className="flex-row justify-center gap-1">
              <Text className="text-text-secondary">Already have an account?</Text>
              <Link href="/sign-in" asChild>
                <Pressable>
                  <Text className="font-medium text-teal">Sign in</Text>
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
