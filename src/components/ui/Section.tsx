import { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Brand, ContentWidth, Spacing } from '@/constants/theme';

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  alt?: boolean;
  style?: ViewStyle;
  innerStyle?: ViewStyle;
}

export function Section({ children, title, subtitle, alt, style, innerStyle }: SectionProps) {
  return (
    <View style={[styles.section, alt && styles.sectionAlt, style]}>
      <View style={[styles.inner, innerStyle]}>
        {(title || subtitle) && (
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        )}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: Spacing.seven,
    backgroundColor: Brand.bg,
  },
  sectionAlt: {
    backgroundColor: Brand.bgSection,
  },
  inner: {
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    paddingHorizontal: Spacing.four,
    gap: Spacing.five,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Brand.white,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: Brand.textSecondary,
    textAlign: 'center',
    maxWidth: 560,
    lineHeight: 26,
  },
});
