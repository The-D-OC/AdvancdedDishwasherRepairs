import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#FFFFFF',
    background: '#0D0D0D',
    backgroundElement: '#1A1A1A',
    backgroundSelected: '#242424',
    textSecondary: 'rgba(255,255,255,0.55)',
  },
  dark: {
    text: '#FFFFFF',
    background: '#0D0D0D',
    backgroundElement: '#1A1A1A',
    backgroundSelected: '#242424',
    textSecondary: 'rgba(255,255,255,0.55)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Brand = {
  // Core
  bg: '#0D0D0D',
  bgCard: '#1A1A1A',
  bgCardHover: '#222222',
  bgSection: '#111111',
  border: 'rgba(255,255,255,0.08)',
  borderLight: 'rgba(255,255,255,0.12)',

  // Text
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.55)',
  textMuted: 'rgba(255,255,255,0.35)',

  // Accent
  orange: '#F97316',
  orangeDark: '#EA6C0A',
  orangeLight: 'rgba(249,115,22,0.15)',

  // Status
  success: '#22C55E',
  danger: '#EF4444',
  info: '#3B82F6',

  // Legacy (keep for compat)
  primary: '#0D0D0D',
  primaryDark: '#000000',
  accent: '#F97316',
  dark: '#0D0D0D',
  muted: 'rgba(255,255,255,0.55)',
  success_hex: '#22C55E',
} as const;

export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', rounded: 'normal', mono: 'monospace' },
  web: { sans: 'var(--font-display)', serif: 'var(--font-serif)', rounded: 'var(--font-rounded)', mono: 'var(--font-mono)' },
});

export const Spacing = {
  half: 2, one: 4, two: 8, three: 16, four: 24,
  five: 32, six: 64, seven: 96, eight: 128,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 1280;
export const ContentWidth = 1100;
