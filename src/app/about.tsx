import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Brand, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const STATS = [
  { value: '5000+', label: 'Machines Repaired' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'First Time Fix Rate' },
  { value: '24/7', label: 'Emergency Support' },
];

const VALUES = [
  { icon: '⚡', title: 'Speed', desc: 'Fast response. Same-day service where possible.' },
  { icon: '🔧', title: 'Expertise', desc: 'Fully trained engineers with 15+ years combined experience.' },
  { icon: '💰', title: 'Transparency', desc: 'Fixed pricing. Quoted before we start. No surprises.' },
  { icon: '🛡️', title: 'Quality', desc: '90-day warranty on all parts and labour as standard.' },
];

const CERTS = ['Gas Safe', 'CHAS', 'FSB Member', 'City & Guilds'];

export default function AboutPage() {
  const { isMobile } = useBreakpoint();

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <PageHero
        breadcrumb="Home / About Us"
        title="About Us"
        subtitle="Advanced Dishwasher Repairs — the UK's trusted partner for commercial warewashing since 2009."
      />

      <Section title="Over 15 Years of Experience You Can Rely On">
        <View style={[styles.twoCol, isMobile && styles.oneCol]}>
          <View style={styles.textCol}>
            <Text style={styles.body}>Founded in 2009, Advanced Dishwasher Repairs has grown to become one of the North West's leading specialists in commercial dishwasher and glasswasher repair, maintenance and installation.</Text>
            <Text style={styles.body}>Our team of fully trained engineers covers the whole of the UK, providing fast, reliable service to hotels, restaurants, schools, hospitals and catering businesses of all sizes.</Text>
            <Text style={styles.body}>We work with all major brands including Hobart, Winterhalter, Classeq, Maidaid, Meiko, Electrolux and many more. We carry an extensive stock of genuine spare parts to ensure the fastest possible fix.</Text>
            <View style={styles.certRow}>
              {CERTS.map((c) => (
                <View key={c} style={styles.certBadge}>
                  <Text style={styles.certText}>{c}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.statsCol}>
            <View style={styles.statsGrid}>
              {STATS.map((s) => (
                <View key={s.label} style={styles.statCard}>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Section>

      <Section title="Our Values" alt>
        <View style={[styles.valuesGrid, isMobile && styles.oneCol]}>
          {VALUES.map((v) => (
            <View key={v.title} style={styles.valueCard}>
              <Text style={styles.valueIcon}>{v.icon}</Text>
              <Text style={styles.valueTitle}>{v.title}</Text>
              <Text style={styles.valueDesc}>{v.desc}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Work With Us">
        <View style={[styles.ctaRow, isMobile && styles.oneCol]}>
          <Button label="Book a Repair" href="/booking" size="lg" />
          <Button label="Contact Us" href="/contact" size="lg" variant="outline" />
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  twoCol: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.six },
  oneCol: { flexDirection: 'column' },
  textCol: { flex: 2, minWidth: 0, gap: Spacing.three },
  body: { fontSize: 16, color: Brand.textSecondary, lineHeight: 27 },
  certRow: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.two, marginTop: Spacing.two },
  certBadge: { backgroundColor: Brand.bgCard, borderRadius: 6, paddingHorizontal: Spacing.three, paddingVertical: 8, borderWidth: 1, borderColor: Brand.orange },
  certText: { fontSize: 13, fontWeight: '600', color: Brand.orange },
  statsCol: { flex: 1, minWidth: 0 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  statCard: { flex: 1, minWidth: 100, backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: Brand.border },
  statValue: { fontSize: 32, fontWeight: '900', color: Brand.orange },
  statLabel: { fontSize: 12, color: Brand.textSecondary, textAlign: 'center' as any },
  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  valueCard: { flex: 1, minWidth: 0, backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border },
  valueIcon: { fontSize: 36 },
  valueTitle: { fontSize: 18, fontWeight: '700', color: Brand.white },
  valueDesc: { fontSize: 13, color: Brand.textSecondary, lineHeight: 21 },
  ctaRow: { flexDirection: 'row', gap: Spacing.three, flexWrap: 'wrap' as any },
});
