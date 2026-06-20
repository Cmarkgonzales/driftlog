import '../global.css';

import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '@/features/auth/use-auth';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require('../../assets/fonts/Inter-Variable.ttf'),
    InstrumentSerif: require('../../assets/fonts/InstrumentSerif-Italic.ttf'),
  });

  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const isReady = fontsLoaded || fontError;

  useEffect(() => {
    if (isLoading || !isReady) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)' as typeof segments[number];

    if (!session && !inAuthGroup) {
      router.replace('/sign-in');
      return;
    }

    if (session && inAuthGroup) {
      router.replace('/(tabs)/today');
    }
  }, [session, isLoading, isReady, segments, router]);

  useEffect(() => {
    if (isReady && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isReady, isLoading]);

  if (!isReady || isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A1020' },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
