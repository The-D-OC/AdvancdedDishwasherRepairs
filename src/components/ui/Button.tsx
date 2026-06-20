import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  href?: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function Button({ label, href, onPress, variant = 'primary', size = 'md', style, fullWidth }: ButtonProps) {
  const inner = (pressed: boolean) => (
    <View style={[styles.base, styles[`size_${size}`], styles[`v_${variant}`], fullWidth && styles.full, style, pressed && styles.pressed]}>
      <Text style={[styles.text, styles[`ts_${size}`], styles[`tv_${variant}`]]}>{label}</Text>
    </View>
  );

  if (href) {
    return (
      <Link href={href as any} style={{ textDecorationLine: 'none' }}>
        <Pressable style={({ pressed }) => [styles.base, styles[`size_${size}`], styles[`v_${variant}`], fullWidth && styles.full, style, pressed && styles.pressed]}>
          <Text style={[styles.text, styles[`ts_${size}`], styles[`tv_${variant}`]]}>{label}</Text>
        </Pressable>
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.base, styles[`size_${size}`], styles[`v_${variant}`], fullWidth && styles.full, style, pressed && styles.pressed]}>
      <Text style={[styles.text, styles[`ts_${size}`], styles[`tv_${variant}`]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  full: { alignSelf: 'stretch' },
  pressed: { opacity: 0.82 },
  size_sm: { paddingHorizontal: Spacing.three, paddingVertical: 8 },
  size_md: { paddingHorizontal: Spacing.four, paddingVertical: 12 },
  size_lg: { paddingHorizontal: Spacing.five, paddingVertical: 15 },
  v_primary: { backgroundColor: Brand.orange },
  v_secondary: { backgroundColor: Brand.bgCard },
  v_outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: Brand.borderLight },
  v_ghost: { backgroundColor: 'transparent' },
  text: { fontWeight: '700' },
  ts_sm: { fontSize: 13 },
  ts_md: { fontSize: 14 },
  ts_lg: { fontSize: 16 },
  tv_primary: { color: Brand.white },
  tv_secondary: { color: Brand.white },
  tv_outline: { color: Brand.white },
  tv_ghost: { color: Brand.orange },
});
