import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { SERVICES } from '@/lib/data';

const ICONS: Record<string, string> = { repairs: '🔧', installation: '🏗️', maintenance: '📋', emergency: '🚨' };

export default function ServicesPage() {
  return (
    <ScrollView style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Home / Services</Text>
          <Text style={styles.title}>Our Services</Text>
          <Text style={styles.sub}>Comprehensive commercial dishwasher services from installation to emergency repairs.</Text>
        </View>
      </View>

      <Section title="What We Offer" subtitle="All major brands and models covered.">
        <View style={styles.grid}>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}` as any} style={styles.cardLink}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.two },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 42, fontWeight: '900', color: Brand.white, letterSpacing: -1 },
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 520 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  cardLink: { flex: 1, minWidth: 240, textDecorationLine: 'none' },
  card: { flex: 1, backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border },
  icon: { fontSize: 36 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: Brand.white },
  cardDesc: { fontSize: 14, color: Brand.textSecondary, lineHeight: 22, flex: 1 },
  cardCta: { fontSize: 13, fontWeight: '600', color: Brand.orange, marginTop: Spacing.two },
});
