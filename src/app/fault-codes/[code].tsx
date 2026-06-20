import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Brand, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { FAULT_CODES } from '@/lib/data';

export default function FaultCodePage() {
  const { isMobile } = useBreakpoint();
  const { code: codeParam } = useLocalSearchParams<{ code: string }>();
  const fc = FAULT_CODES.find((f) => f.code.toLowerCase() === codeParam?.toLowerCase());

  if (!fc) return (
    <View style={styles.nf}>
      <Text style={styles.nfTitle}>Fault Code Not Found</Text>
      <Text style={styles.nfText}>We don't have "{codeParam}" in our database yet.</Text>
      <Button label="Search Fault Codes" href="/fault-codes" />
      <Button label="Contact an Engineer" href="/contact" variant="outline" />
    </View>
  );

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <PageHero breadcrumb={`Fault Codes / ${fc.brand} / ${fc.code}`} title={fc.title} center>
        <View style={styles.codeTag}><Text style={styles.codeText}>{fc.code}</Text></View>
        <Text style={styles.meta}>{fc.brand} · {fc.model}</Text>
      </PageHero>

      <Section>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Description</Text>
            <Text style={styles.cardBody}>{fc.description}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Common Causes</Text>
            {fc.commonCauses.map((c, i) => (
              <View key={i} style={styles.listRow}><Text style={styles.bullet}>•</Text><Text style={styles.listText}>{c}</Text></View>
            ))}
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recommended Actions</Text>
            {fc.recommendedActions.map((a, i) => (
              <View key={i} style={styles.listRow}><Text style={styles.check}>✓</Text><Text style={styles.listText}>{a}</Text></View>
            ))}
          </View>
          <View style={styles.cta}>
            <Text style={styles.ctaTitle}>Need an Engineer?</Text>
            <Text style={styles.ctaSub}>Our engineers can diagnose and fix this fault — usually on the first visit.</Text>
            <View style={[styles.ctaButtons, isMobile && styles.ctaButtonsCol]}>
              <Button label="Book a Repair" href="/booking" size="lg" />
              <Button label="📞 07745 407 919" onPress={() => {}} size="lg" variant="outline" />
            </View>
          </View>
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  codeTag: { backgroundColor: Brand.orange, paddingHorizontal: Spacing.three, paddingVertical: 8, borderRadius: 8 },
  codeText: { fontSize: 22, fontWeight: '900', color: '#000' },
  meta: { fontSize: 14, color: Brand.textMuted },
  content: { maxWidth: 720, alignSelf: 'center' as any, width: '100%', gap: Spacing.three },
  card: { backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Brand.orange, marginBottom: Spacing.one },
  cardBody: { fontSize: 15, color: Brand.textSecondary, lineHeight: 25 },
  listRow: { flexDirection: 'row', gap: Spacing.two, alignItems: 'flex-start' },
  bullet: { fontSize: 15, color: Brand.textMuted, fontWeight: '700', marginTop: 2 },
  check: { fontSize: 15, color: Brand.orange, fontWeight: '700', marginTop: 2 },
  listText: { fontSize: 14, color: Brand.textSecondary, lineHeight: 23, flex: 1 },
  cta: { backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.orange },
  ctaTitle: { fontSize: 20, fontWeight: '700', color: Brand.white },
  ctaSub: { fontSize: 14, color: Brand.textSecondary, lineHeight: 23 },
  ctaButtons: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' as any, marginTop: Spacing.two },
  ctaButtonsCol: { flexDirection: 'column' },
  nf: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.six, gap: Spacing.three },
  nfTitle: { fontSize: 26, fontWeight: '700', color: Brand.white },
  nfText: { fontSize: 15, color: Brand.textSecondary, textAlign: 'center' },
});
