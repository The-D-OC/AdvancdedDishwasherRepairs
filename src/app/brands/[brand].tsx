import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { BRANDS, FAULT_CODES, MANUALS } from '@/lib/data';

// Test

export default function BrandPage() {
  const { brand: slug } = useLocalSearchParams<{ brand: string }>();
  const brand = BRANDS.find((b) => b.slug === slug);
  const manuals = MANUALS.filter((m) => m.brand.toLowerCase() === brand?.name.toLowerCase());
  const faults = FAULT_CODES.filter((f) => f.brand.toLowerCase() === brand?.name.toLowerCase());

  if (!brand) return (
    <View style={styles.nf}><Text style={styles.nfText}>Brand not found</Text><Button label="All Brands" href="/brands" /></View>
  );

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Brands / {brand.name}</Text>
          <Text style={styles.initial}>{brand.name[0]}</Text>
          <Text style={styles.title}>{brand.name}</Text>
          <Text style={styles.sub}>{brand.description}</Text>
        </View>
      </View>

      {manuals.length > 0 && (
        <Section title="Manuals">
          <View style={styles.list}>
            {manuals.map((m) => (
              <Link key={m.slug} href={`/manuals/${m.slug}` as any} style={styles.itemLink}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemIcon}>📄</Text>
                  <View style={styles.itemBody}>
                    <Text style={styles.itemTitle}>{m.title}</Text>
                    <Text style={styles.itemMeta}>{m.model} · {m.productType}</Text>
                  </View>
                  <Text style={styles.itemArrow}>→</Text>
                </View>
              </Link>
            ))}
          </View>
        </Section>
      )}

      {faults.length > 0 && (
        <Section title="Fault Codes" alt>
          <View style={styles.faultList}>
            {faults.map((fc, i) => (
              <View key={i} style={styles.faultCard}>
                <View style={styles.faultHeader}>
                  <Text style={styles.faultCode}>{fc.code}</Text>
                  <Text style={styles.faultTitle}>{fc.title}</Text>
                </View>
                <Text style={styles.faultMeta}>{fc.model}</Text>
                <Text style={styles.faultDesc}>{fc.description}</Text>
              </View>
            ))}
          </View>
        </Section>
      )}

      <Section title={`${brand.name} Repair Service`}>
        <View style={styles.cta}>
          <Button label={`Book a ${brand.name} Repair`} href="/booking" size="lg" />
          <Button label="All Manuals" href="/manuals" size="lg" variant="outline" />
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.two, alignItems: 'center' },
  breadcrumb: { fontSize: 12, color: Brand.textMuted, alignSelf: 'flex-start' as any },
  initial: { fontSize: 72, fontWeight: '900', color: Brand.orange },
  title: { fontSize: 38, fontWeight: '900', color: Brand.white, textAlign: 'center' },
  sub: { fontSize: 16, color: Brand.textSecondary, textAlign: 'center', maxWidth: 560 },
  list: { gap: Spacing.two },
  itemLink: { textDecorationLine: 'none' },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, backgroundColor: Brand.bgCard, borderRadius: 10, padding: Spacing.three, borderWidth: 1, borderColor: Brand.border },
  itemIcon: { fontSize: 24 },
  itemBody: { flex: 1, gap: 2 },
  itemTitle: { fontSize: 15, fontWeight: '600', color: Brand.white },
  itemMeta: { fontSize: 12, color: Brand.textSecondary },
  itemArrow: { color: Brand.orange, fontSize: 18, fontWeight: '700' },
  faultList: { gap: Spacing.three },
  faultCard: { backgroundColor: Brand.bgCard, borderRadius: 10, padding: Spacing.three, gap: Spacing.one, borderWidth: 1, borderColor: Brand.border },
  faultHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  faultCode: { backgroundColor: Brand.orange, color: Brand.white, fontSize: 12, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' as any },
  faultTitle: { fontSize: 16, fontWeight: '700', color: Brand.white },
  faultMeta: { fontSize: 12, color: Brand.textMuted },
  faultDesc: { fontSize: 14, color: Brand.textSecondary, lineHeight: 22 },
  cta: { flexDirection: 'row', gap: Spacing.three, flexWrap: 'wrap' as any },
  nf: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.six, gap: Spacing.three },
  nfText: { fontSize: 20, color: Brand.textSecondary },
});
