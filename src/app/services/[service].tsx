import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { SERVICES } from '@/lib/data';

export default function ServicePage() {
  const { service: slug } = useLocalSearchParams<{ service: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) return (
    <View style={styles.notFound}>
      <Text style={styles.nfText}>Service not found</Text>
      <Button label="View All Services" href="/services" />
    </View>
  );

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Services / {service.title}</Text>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.sub}>{service.description}</Text>
          <View style={styles.heroActions}>
            <Button label="Book This Service" href="/booking" size="lg" />
            <Button label="Get a Quote" href="/contact" size="lg" variant="outline" />
          </View>
        </View>
      </View>

      <Section>
        <View style={styles.content}>
          <Text style={styles.body}>{service.content}</Text>
          <View style={styles.checklist}>
            <Text style={styles.checkTitle}>Why Choose Us?</Text>
            {['Fully trained and certified engineers', 'All major brands covered', 'Genuine spare parts used', '90-day parts and labour warranty', 'Fixed pricing — quoted before we start'].map((b) => (
              <Text key={b} style={styles.checkItem}>✓  {b}</Text>
            ))}
          </View>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to Book?</Text>
            <Text style={styles.ctaSub}>Call 07745 407 919 or book online below.</Text>
            <Button label="Book Now" href="/booking" size="lg" />
          </View>
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.three },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 42, fontWeight: '900', color: Brand.white, letterSpacing: -1 },
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 520 },
  heroActions: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' as any },
  content: { maxWidth: 720, alignSelf: 'center' as any, width: '100%', gap: Spacing.four },
  body: { fontSize: 17, color: Brand.textSecondary, lineHeight: 28 },
  checklist: { gap: Spacing.two },
  checkTitle: { fontSize: 20, fontWeight: '700', color: Brand.white, marginBottom: Spacing.two },
  checkItem: { fontSize: 15, color: Brand.textSecondary, lineHeight: 26 },
  ctaCard: { backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.orange, alignItems: 'flex-start' as any },
  ctaTitle: { fontSize: 20, fontWeight: '700', color: Brand.white },
  ctaSub: { fontSize: 14, color: Brand.textSecondary },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.six, gap: Spacing.three },
  nfText: { fontSize: 20, color: Brand.textSecondary },
});
