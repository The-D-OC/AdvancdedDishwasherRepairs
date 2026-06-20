import { StyleSheet, Text, View } from 'react-native';

import { FaultCodeSearch } from '@/components/search/FaultCodeSearch';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Brand, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { FAULT_CODES } from '@/lib/data';

export default function FaultCodesPage() {
  const { isMobile } = useBreakpoint();

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <PageHero
        breadcrumb="Home / Fault Codes"
        title="Fault Code Finder"
        subtitle="Search our database for instant diagnosis and repair guidance."
      />

      <Section title="Search Fault Codes">
        <View style={styles.searchWrap}><FaultCodeSearch /></View>
      </Section>

      <Section title="Common Fault Codes" alt>
        {isMobile ? (
          // Card layout on mobile instead of table
          <View style={styles.cardList}>
            {FAULT_CODES.map((fc, i) => (
              <View key={i} style={styles.faultCard}>
                <View style={styles.faultCardHeader}>
                  <Text style={styles.codeTag}>{fc.code}</Text>
                  <Text style={styles.faultBrand}>{fc.brand} · {fc.model}</Text>
                </View>
                <Text style={styles.faultTitle}>{fc.title}</Text>
                <Text style={styles.faultDesc}>{fc.description}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.table}>
            <View style={styles.tableHead}>
              <Text style={[styles.th, { flex: 0.7 }]}>Code</Text>
              <Text style={[styles.th, { flex: 1.5 }]}>Brand / Model</Text>
              <Text style={[styles.th, { flex: 2 }]}>Description</Text>
              <Text style={[styles.th, { flex: 1 }]}>Action</Text>
            </View>
            {FAULT_CODES.map((fc, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={[styles.td, { flex: 0.7 }]}>
                  <Text style={styles.codeTag}>{fc.code}</Text>
                </View>
                <View style={[styles.td, { flex: 1.5 }]}>
                  <Text style={styles.tdPrimary}>{fc.brand}</Text>
                  <Text style={styles.tdSec}>{fc.model}</Text>
                </View>
                <View style={[styles.td, { flex: 2 }]}>
                  <Text style={styles.tdPrimary}>{fc.title}</Text>
                  <Text style={styles.tdSec}>{fc.description}</Text>
                </View>
                <View style={[styles.td, { flex: 1 }]}>
                  <Text style={styles.viewMore}>View More →</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrap: { maxWidth: 720, alignSelf: 'center' as any, width: '100%' },
  // Desktop table
  table: { borderRadius: 12, borderWidth: 1, borderColor: Brand.border, overflow: 'hidden' as any },
  tableHead: { flexDirection: 'row', backgroundColor: Brand.bgCard, paddingHorizontal: Spacing.three, paddingVertical: Spacing.two, borderBottomWidth: 1, borderBottomColor: Brand.border },
  th: { fontSize: 11, fontWeight: '700', color: Brand.textMuted, textTransform: 'uppercase' as any, letterSpacing: 1 },
  tableRow: { flexDirection: 'row', paddingHorizontal: Spacing.three, paddingVertical: Spacing.three, borderBottomWidth: 1, borderBottomColor: Brand.border },
  td: { gap: 2 },
  codeTag: { backgroundColor: Brand.orange, color: '#000', fontSize: 12, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, alignSelf: 'flex-start' as any, overflow: 'hidden' as any },
  tdPrimary: { fontSize: 14, fontWeight: '600', color: Brand.white },
  tdSec: { fontSize: 12, color: Brand.textSecondary },
  viewMore: { fontSize: 13, fontWeight: '600', color: Brand.orange },
  // Mobile cards
  cardList: { gap: Spacing.two },
  faultCard: { backgroundColor: Brand.bgCard, borderRadius: 10, padding: Spacing.three, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border },
  faultCardHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, flexWrap: 'wrap' as any },
  faultBrand: { fontSize: 12, color: Brand.textMuted },
  faultTitle: { fontSize: 15, fontWeight: '700', color: Brand.white },
  faultDesc: { fontSize: 13, color: Brand.textSecondary, lineHeight: 20 },
});
