/**
 * Midnight Tide design tokens for components that still use StyleSheet.
 * Prefer Tailwind classes via @/tw for new UI.
 */

export const Colors = {
  midnight: '#0A1020',
  surface: '#121A2B',
  elevated: '#1B2740',
  border: '#29354F',
  teal: '#3DD9C0',
  indigo: '#7C83FD',
  gold: '#F4B860',
  productive: '#34D399',
  okay: '#94A3B8',
  blocked: '#FB7185',
  textPrimary: '#F8FAFC',
  textSecondary: '#7C88A8',
} as const;

export type ThemeColor = 'text' | 'textSecondary' | 'background' | 'backgroundElement' | 'backgroundSelected';

export const Fonts = {
  sans: 'Inter',
  serif: 'InstrumentSerif',
  mono: 'monospace',
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = 80;
export const MaxContentWidth = 800;

export const LegacyTheme = {
  text: Colors.textPrimary,
  textSecondary: Colors.textSecondary,
  background: Colors.midnight,
  backgroundElement: Colors.surface,
  backgroundSelected: Colors.elevated,
} as const;
