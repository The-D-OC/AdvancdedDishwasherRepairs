import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { FaultCodeSearch } from '@/components/search/FaultCodeSearch';
import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { FAULT_CODES } from '@/lib/data';

export default function FaultCodesPage() {
  return (
    <ScrollView style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Home / Fault Codes</Text>
          <Text style={styles.title}>Fault Code Finder</Text>
          <Text style={styles.sub}>Search our database for instant diagnosis and repair guidance.</Text>
        </View>
      </View>

      <Section title="Search Fault Codes">
        <View style={styles.searchWrap}><FaultCodeSearch /></View>
      </Section>

      <Section title="Common Fault Codes" alt>
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
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.two },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 42, fontWeight: '900', color: Brand.white, letterSpacing: -1 },
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 500 },
  searchWrap: { maxWidth: 720, alignSelf: 'center' as any, width: '100%' },
  table: { borderRadius: 12, borderWidth: 1, borderColor: Brand.border, overflow: 'hidden' as any },
  tableHead: { flexDirection: 'row', backgroundColor: Brand.bgCard, paddingHorizontal: Spacing.three, paddingVertical: Spacing.two, borderBottomWidth: 1, borderBottomColor: Brand.border },
  th: { fontSize: 11, fontWeight: '700', color: Brand.textMuted, textTransform: 'uppercase' as any, letterSpacing: 1 },
  tableRow: { flexDirection: 'row', paddingHorizontal: Spacing.three, paddingVertical: Spacing.three, borderBottomWidth: 1, borderBottomColor: Brand.border, flexWrap: 'wrap' as any },
  td: { gap: 2, minWidth: 80 },
  codeTag: { backgroundColor: Brand.orange, color: Brand.white, fontSize: 12, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, alignSelf: 'flex-start' as any, overflow: 'hidden' as any },
  tdPrimary: { fontSize: 14, fontWeight: '600', color: Brand.white },
  tdSec: { fontSize: 12, color: Brand.textSecondary },
  viewMore: { fontSize: 13, fontWeight: '600', color: Brand.orange },
});
