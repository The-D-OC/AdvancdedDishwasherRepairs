import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { LOCATIONS, SERVICES } from '@/lib/data';

export default function LocationPage() {
  const { location: slug } = useLocalSearchParams<{ location: string }>();
  const location = LOCATIONS.find((l) => l.slug === slug);

  if (!location) return (
    <View style={styles.nf}><Text style={styles.nfText}>Location not found</Text><Button label="View All Areas" href="/coverage-areas" /></View>
  );

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Coverage Areas / {location.name}</Text>
          <Text style={styles.title}>Commercial Dishwasher Repair{'\n'}{location.name}</Text>
          <Text style={styles.sub}>Fast, reliable commercial dishwasher repairs across {location.coverageArea}.</Text>
          <View style={styles.heroActions}>
            <Button label="Book Engineer" href="/booking" size="lg" />
            <Button label="📞 07745 407 919" onPress={() => {}} size="lg" variant="outline" />
          </View>
        </View>
      </View>

      <Section>
        <View style={styles.content}>
          <Text style={styles.body}>{location.content}</Text>
          <Text style={styles.coverage}>Coverage area: {location.coverageArea}</Text>
        </View>
      </Section>

      <Section title={`Services in ${location.name}`} alt>
        <View style={styles.services}>
          {SERVICES.map((s) => (
            <View key={s.slug} style={styles.serviceRow}>
              <Text style={styles.check}>✓</Text>
              <View style={styles.serviceBody}>
                <Text style={styles.serviceTitle}>{s.title}</Text>
                <Text style={styles.serviceDesc}>{s.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.three },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 40, fontWeight: '900', color: Brand.white, letterSpacing: -1, lineHeight: 48 },
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 520 },
  heroActions: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' as any },
  content: { maxWidth: 720, alignSelf: 'center' as any, width: '100%', gap: Spacing.two },
  body: { fontSize: 17, color: Brand.textSecondary, lineHeight: 28 },
  coverage: { fontSize: 13, color: Brand.textMuted, fontStyle: 'italic' },
  services: { gap: Spacing.three },
  serviceRow: { flexDirection: 'row', gap: Spacing.three, alignItems: 'flex-start' },
  check: { fontSize: 18, color: Brand.orange, fontWeight: '700', marginTop: 2 },
  serviceBody: { flex: 1 },
  serviceTitle: { fontSize: 16, fontWeight: '700', color: Brand.white },
  serviceDesc: { fontSize: 13, color: Brand.textSecondary, lineHeight: 21, marginTop: 2 },
  nf: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.six, gap: Spacing.three },
  nfText: { fontSize: 20, color: Brand.textSecondary },
});
