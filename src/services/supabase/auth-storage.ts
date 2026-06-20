import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import type { SupportedStorage } from '@supabase/supabase-js';

const isServer = typeof window === 'undefined';

function getWebStorage(): Storage | null {
  if (isServer) {
    return null;
  }
  return window.localStorage;
}

export const authStorage: SupportedStorage = {
  getItem(key: string): Promise<string | null> {
    if (isServer) {
      return Promise.resolve(null);
    }
    if (Platform.OS === 'web') {
      return Promise.resolve(getWebStorage()?.getItem(key) ?? null);
    }
    return AsyncStorage.getItem(key);
  },
  setItem(key: string, value: string): Promise<void> {
    if (isServer) {
      return Promise.resolve();
    }
    if (Platform.OS === 'web') {
      getWebStorage()?.setItem(key, value);
      return Promise.resolve();
    }
    return AsyncStorage.setItem(key, value);
  },
  removeItem(key: string): Promise<void> {
    if (isServer) {
      return Promise.resolve();
    }
    if (Platform.OS === 'web') {
      getWebStorage()?.removeItem(key);
      return Promise.resolve();
    }
    return AsyncStorage.removeItem(key);
  },
};
