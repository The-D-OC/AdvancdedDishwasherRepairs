import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { BRANDS } from '@/lib/data';

export default function BrandsPage() {
  return (
    <ScrollView style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Home / Brands</Text>
          <Text style={styles.title}>Brands We Repair</Text>
          <Text style={styles.sub}>We service all major commercial dishwasher brands. Select a brand to browse manuals, fault codes and repair guides.</Text>
        </View>
      </View>

      <Section title="Supported Brands">
        <View style={styles.grid}>
          {BRANDS.map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}` as any} style={styles.cardLink}>
              <View style={styles.card}>
                <Text style={styles.initial}>{b.name[0]}</Text>
                <Text style={styles.name}>{b.name}</Text>
                <Text style={styles.desc}>{b.description}</Text>
                <Text style={styles.cta}>View manuals & fault codes →</Text>
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
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 600 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  cardLink: { flex: 1, minWidth: 220, textDecorationLine: 'none' },
  card: { flex: 1, backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border, alignItems: 'center' },
  initial: { fontSize: 48, fontWeight: '900', color: Brand.orange },
  name: { fontSize: 20, fontWeight: '700', color: Brand.white },
  desc: { fontSize: 13, color: Brand.textSecondary, lineHeight: 20, textAlign: 'center' as any },
  cta: { fontSize: 13, fontWeight: '600', color: Brand.orange, marginTop: Spacing.two },
});
