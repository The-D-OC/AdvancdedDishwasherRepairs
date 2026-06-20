import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface PageHeroProps {
  breadcrumb: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  center?: boolean;
}

export function PageHero({ breadcrumb, title, subtitle, children, center }: PageHeroProps) {
  const { isMobile } = useBreakpoint();
  return (
    <View style={styles.hero}>
      <View style={[styles.inner, isMobile && styles.innerMobile, center && styles.innerCenter]}>
        <Text style={styles.breadcrumb}>{breadcrumb}</Text>
        <Text style={[styles.title, isMobile && styles.titleMobile, center && styles.textCenter]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.sub, isMobile && styles.subMobile, center && styles.textCenter]}>{subtitle}</Text>
        )}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: Brand.bgSection,
    borderBottomWidth: 1,
    borderBottomColor: Brand.border,
  },
  inner: {
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingVertical: 72,
    gap: Spacing.two,
  },
  innerMobile: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.five,
  },
  innerCenter: { alignItems: 'center' },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 42, fontWeight: '900', color: Brand.white, letterSpacing: -1 },
  titleMobile: { fontSize: 26, letterSpacing: -0.5, lineHeight: 34 },
  sub: { fontSize: 16, color: Brand.textSecondary, lineHeight: 26 },
  subMobile: { fontSize: 14, lineHeight: 22 },
  textCenter: { textAlign: 'center' as any },
});
