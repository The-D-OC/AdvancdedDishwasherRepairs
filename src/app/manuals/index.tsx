import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { MANUALS } from '@/lib/data';

export default function ManualsPage() {
  const [query, setQuery] = useState('');
  const filtered = MANUALS.filter((m) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return m.title.toLowerCase().includes(q) || m.brand.toLowerCase().includes(q) || m.model.toLowerCase().includes(q) || m.productType.toLowerCase().includes(q);
  });

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Home / Manuals</Text>
          <Text style={styles.title}>Service Manuals</Text>
          <Text style={styles.sub}>Download installation guides, service manuals and user documentation for all major brands.</Text>
          <View style={styles.searchRow}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search brand, model or type..."
              placeholderTextColor={Brand.textMuted}
              value={query}
              onChangeText={setQuery}
            />
          </View>
        </View>
      </View>

      <Section>
        <Text style={styles.count}>{filtered.length} manual{filtered.length !== 1 ? 's' : ''} found</Text>
        <View style={styles.grid}>
          {filtered.map((m) => (
            <View key={m.slug} style={styles.card}>
              <View style={styles.cardIcon}><Text style={styles.cardIconText}>📄</Text></View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{m.title}</Text>
                <Text style={styles.cardMeta}>{m.brand} · {m.model} · {m.productType}</Text>
                <Text style={styles.cardDesc}>{m.description}</Text>
              </View>
              <Button label="Download PDF" href={`/manuals/${m.slug}` as any} size="sm" />
            </View>
          ))}
        </View>
        {filtered.length === 0 && (
          <Text style={styles.empty}>No manuals found for "{query}"</Text>
        )}
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.three },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 42, fontWeight: '900', color: Brand.white, letterSpacing: -1 },
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 560 },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Brand.bgCard, borderRadius: 8, paddingHorizontal: Spacing.three, height: 52, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border, maxWidth: 560 },
  searchIcon: { fontSize: 18 },
  searchInput: { flex: 1, fontSize: 15, color: Brand.white, outlineStyle: 'none' as any },
  count: { fontSize: 13, color: Brand.textMuted },
  grid: { gap: Spacing.two },
  card: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, backgroundColor: Brand.bgCard, borderRadius: 10, padding: Spacing.three, borderWidth: 1, borderColor: Brand.border, flexWrap: 'wrap' as any },
  cardIcon: { width: 48, height: 48, borderRadius: 8, backgroundColor: Brand.bgSection, alignItems: 'center', justifyContent: 'center' },
  cardIconText: { fontSize: 24 },
  cardBody: { flex: 1, gap: 3, minWidth: 180 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: Brand.white },
  cardMeta: { fontSize: 12, color: Brand.textMuted },
  cardDesc: { fontSize: 13, color: Brand.textSecondary, lineHeight: 20 },
  empty: { fontSize: 16, color: Brand.textSecondary, textAlign: 'center' as any, paddingVertical: Spacing.five },
});
