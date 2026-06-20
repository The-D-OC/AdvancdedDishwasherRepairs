import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { LOCATIONS } from '@/lib/data';

export default function CoverageAreasPage() {
  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Home / Coverage Areas</Text>
          <Text style={styles.title}>Coverage Areas</Text>
          <Text style={styles.sub}>Fast-response commercial dishwasher repair across the UK. Select your area for more info.</Text>
        </View>
      </View>
      <Section title="Areas We Cover">
        <View style={styles.grid}>
          {LOCATIONS.map((loc) => (
            <Link key={loc.slug} href={`/coverage-areas/${loc.slug}` as any} style={styles.cardLink}>
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
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.two },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 42, fontWeight: '900', color: Brand.white, letterSpacing: -1 },
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 560 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  cardLink: { flex: 1, minWidth: 180, textDecorationLine: 'none' },
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
