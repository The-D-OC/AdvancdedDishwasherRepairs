import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { MANUALS } from '@/lib/data';

export default function ManualPage() {
  const { manual: slug } = useLocalSearchParams<{ manual: string }>();
  const manual = MANUALS.find((m) => m.slug === slug);

  if (!manual) return (
    <View style={styles.nf}><Text style={styles.nfText}>Manual not found</Text><Button label="View All Manuals" href="/manuals" /></View>
  );

  return (
    <ScrollView style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Manuals / {manual.brand} / {manual.model}</Text>
          <Text style={styles.title}>{manual.title}</Text>
          <Text style={styles.meta}>{manual.brand} · {manual.model} · {manual.productType}</Text>
        </View>
      </View>
      <Section>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>📄</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{manual.title}</Text>
              <Text style={styles.cardDesc}>{manual.description}</Text>
              {manual.pdfAsset ? (
                <Button label="Download PDF" href={manual.pdfAsset as any} />
              ) : (
                <View style={styles.unavail}>
                  <Text style={styles.unavailText}>PDF not yet available. Contact us to request this manual.</Text>
                  <Button label="Request Manual" href="/contact" variant="outline" />
                </View>
              )}
            </View>
          </View>

          <View style={styles.details}>
            {[['Brand', manual.brand], ['Model', manual.model], ['Product Type', manual.productType]].map(([k, v]) => (
              <View key={k} style={styles.detailRow}>
                <Text style={styles.detailKey}>{k}</Text>
                <Text style={styles.detailVal}>{v}</Text>
              </View>
            ))}
          </View>

          <View style={styles.cta}>
            <Text style={styles.ctaTitle}>Need a repair?</Text>
            <Text style={styles.ctaSub}>Our engineers are trained on {manual.brand} {manual.model} machines.</Text>
            <Button label="Book an Engineer" href="/booking" />
          </View>
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.two },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 36, fontWeight: '900', color: Brand.white, letterSpacing: -0.5 },
  meta: { fontSize: 14, color: Brand.textMuted },
  content: { maxWidth: 720, alignSelf: 'center' as any, width: '100%', gap: Spacing.four },
  card: { flexDirection: 'row', gap: Spacing.three, backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, borderWidth: 1, borderColor: Brand.border, flexWrap: 'wrap' as any },
  cardIcon: { fontSize: 40 },
  cardBody: { flex: 1, gap: Spacing.two, minWidth: 200 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: Brand.white },
  cardDesc: { fontSize: 14, color: Brand.textSecondary, lineHeight: 23 },
  unavail: { gap: Spacing.two },
  unavailText: { fontSize: 13, color: Brand.textSecondary, lineHeight: 21 },
  details: { borderRadius: 10, borderWidth: 1, borderColor: Brand.border, overflow: 'hidden' as any },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.three, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Brand.border },
  detailKey: { fontSize: 13, fontWeight: '600', color: Brand.textSecondary },
  detailVal: { fontSize: 13, color: Brand.white },
  cta: { backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.orange, alignItems: 'flex-start' as any },
  ctaTitle: { fontSize: 20, fontWeight: '700', color: Brand.white },
  ctaSub: { fontSize: 14, color: Brand.textSecondary },
  nf: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.six, gap: Spacing.three },
  nfText: { fontSize: 20, color: Brand.textSecondary },
});
