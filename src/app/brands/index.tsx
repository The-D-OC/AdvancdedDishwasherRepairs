import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Brand, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { BRANDS } from '@/lib/data';

export default function BrandsPage() {
  const { isMobile } = useBreakpoint();

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <PageHero
        breadcrumb="Home / Brands"
        title="Brands We Repair"
        subtitle="We service all major commercial dishwasher brands. Select a brand to browse manuals, fault codes and repair guides."
      />
      <Section title="Supported Brands">
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {BRANDS.map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}` as any} style={[styles.cardLink, isMobile && styles.cardLinkMobile]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  gridMobile: { flexDirection: 'column' },
  cardLink: { flex: 1, minWidth: 200, textDecorationLine: 'none' },
  cardLinkMobile: { flex: undefined, minWidth: undefined },
  card: { flex: 1, backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border, alignItems: 'center' },
  initial: { fontSize: 40, fontWeight: '900', color: Brand.orange },
  name: { fontSize: 20, fontWeight: '700', color: Brand.white },
  desc: { fontSize: 13, color: Brand.textSecondary, lineHeight: 20, textAlign: 'center' as any },
  cta: { fontSize: 13, fontWeight: '600', color: Brand.orange, marginTop: Spacing.two },
});
