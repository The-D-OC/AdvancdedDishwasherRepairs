import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Brand, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { SERVICES } from '@/lib/data';

const ICONS: Record<string, string> = { repairs: '🔧', installation: '🏗️', maintenance: '📋', emergency: '🚨' };

export default function ServicesPage() {
  const { isMobile } = useBreakpoint();

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <PageHero
        breadcrumb="Home / Services"
        title="Our Services"
        subtitle="Comprehensive commercial dishwasher services from installation to emergency repairs."
      />
      <Section title="What We Offer" subtitle="All major brands and models covered.">
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}` as any} style={[styles.cardLink, isMobile && styles.cardLinkMobile]}>
              <View style={styles.card}>
                <Text style={styles.icon}>{ICONS[s.slug] ?? '🔧'}</Text>
                <Text style={styles.cardTitle}>{s.title}</Text>
                <Text style={styles.cardDesc}>{s.description}</Text>
                <Text style={styles.cardCta}>Find out more →</Text>
              </View>
            </Link>
          ))}
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  gridMobile: { flexDirection: 'column' },
  cardLink: { flex: 1, minWidth: 220, textDecorationLine: 'none' },
  cardLinkMobile: { flex: undefined, minWidth: undefined },
  card: { flex: 1, backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border },
  icon: { fontSize: 36 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: Brand.white },
  cardDesc: { fontSize: 14, color: Brand.textSecondary, lineHeight: 22, flex: 1 },
  cardCta: { fontSize: 13, fontWeight: '600', color: Brand.orange, marginTop: Spacing.two },
});
