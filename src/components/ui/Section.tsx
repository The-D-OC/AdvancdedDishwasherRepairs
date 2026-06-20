import { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  alt?: boolean;
  style?: ViewStyle;
  innerStyle?: ViewStyle;
}

export function Section({ children, title, subtitle, alt, style, innerStyle }: SectionProps) {
  const { isMobile } = useBreakpoint();

  return (
    <View style={[styles.section, alt && styles.sectionAlt, style]}>
      <View style={[styles.inner, isMobile && styles.innerMobile, innerStyle]}>
        {(title || subtitle) && (
          <View style={styles.header}>
            {title && <Text style={[styles.title, isMobile && styles.titleMobile]}>{title}</Text>}
            {subtitle && <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>{subtitle}</Text>}
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
  innerMobile: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.four,
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
  titleMobile: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
    color: Brand.textSecondary,
    textAlign: 'center',
    maxWidth: 560,
    lineHeight: 26,
  },
  subtitleMobile: {
    fontSize: 14,
    lineHeight: 22,
  },
});
