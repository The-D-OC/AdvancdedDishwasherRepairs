import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Brand, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { LOCATIONS } from '@/lib/data';

export default function CoverageAreasPage() {
  const { isMobile } = useBreakpoint();

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <PageHero
        breadcrumb="Home / Coverage Areas"
        title="Coverage Areas"
        subtitle="Fast-response commercial dishwasher repair across the UK. Select your area for more info."
      />
      <Section title="Areas We Cover">
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {LOCATIONS.map((loc) => (
            <Link key={loc.slug} href={`/coverage-areas/${loc.slug}` as any} style={[styles.cardLink, isMobile && styles.cardLinkMobile]}>
              <View style={styles.card}>
                <Text style={styles.pin}>📍</Text>
                <Text style={styles.name}>{loc.name}</Text>
                <Text style={styles.coverage}>{loc.coverageArea}</Text>
                <Text style={styles.cta}>View coverage →</Text>
              </View>
            </Link>
          ))}
        </View>
      </Section>
      <Section alt>
        <View style={styles.notListed}>
          <Text style={styles.nlTitle}>Don't see your area?</Text>
          <Text style={styles.nlText}>We cover a wide range of UK locations. Contact us to check if we service your area.</Text>
          <Link href="/contact"><Text style={styles.nlLink}>Get in touch →</Text></Link>
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  gridMobile: { flexDirection: 'column' },
  cardLink: { flex: 1, minWidth: 160, textDecorationLine: 'none' },
  cardLinkMobile: { flex: undefined, minWidth: undefined },
  card: { flex: 1, backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border, alignItems: 'center' },
  pin: { fontSize: 32 },
  name: { fontSize: 22, fontWeight: '700', color: Brand.white },
  coverage: { fontSize: 13, color: Brand.textSecondary, textAlign: 'center' as any },
  cta: { fontSize: 13, fontWeight: '600', color: Brand.orange, marginTop: Spacing.one },
  notListed: { alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.four },
  nlTitle: { fontSize: 24, fontWeight: '700', color: Brand.white },
  nlText: { fontSize: 15, color: Brand.textSecondary, textAlign: 'center', maxWidth: 440 },
  nlLink: { fontSize: 15, fontWeight: '700', color: Brand.orange },
});
