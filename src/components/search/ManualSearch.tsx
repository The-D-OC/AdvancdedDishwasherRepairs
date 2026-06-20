import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';
import { MANUALS } from '@/lib/data';

export function ManualSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MANUALS.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q) ||
        m.model.toLowerCase().includes(q) ||
        m.productType.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Text style={styles.icon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder="Search brand, model or fault code..."
          placeholderTextColor={Brand.textMuted}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} style={styles.clearBtn}>
            <Text style={styles.clearText}>✕</Text>
          </Pressable>
        )}
      </View>

      {results.length > 0 && (
        <View style={styles.dropdown}>
          {results.map((m) => (
            <Pressable
              key={m.slug}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
              onPress={() => { setQuery(''); router.push(`/manuals/${m.slug}` as any); }}>
              <Text style={styles.itemTitle}>{m.title}</Text>
              <Text style={styles.itemMeta}>{m.brand} · {m.model} · {m.productType}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.viewAll} onPress={() => router.push('/manuals' as any)}>
            <Text style={styles.viewAllText}>View all manuals →</Text>
          </Pressable>
        </View>
      )}

      {query.trim().length > 0 && results.length === 0 && (
        <View style={styles.dropdown}>
          <Text style={styles.empty}>No manuals found for "{query}"</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative' as any },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Brand.bgCard,
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    height: 56,
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  icon: { fontSize: 18 },
  input: { flex: 1, fontSize: 15, color: Brand.white, outlineStyle: 'none' as any },
  clearBtn: { padding: 4 },
  clearText: { fontSize: 14, color: Brand.textMuted },
  dropdown: {
    position: 'absolute' as any,
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: Brand.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Brand.border,
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden' as any,
  },
  item: { paddingHorizontal: Spacing.three, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Brand.border, gap: 2 },
  itemPressed: { backgroundColor: Brand.bgSection },
  itemTitle: { fontSize: 14, fontWeight: '600', color: Brand.white },
  itemMeta: { fontSize: 12, color: Brand.textSecondary },
  viewAll: { paddingHorizontal: Spacing.three, paddingVertical: 12 },
  viewAllText: { fontSize: 13, fontWeight: '600', color: Brand.orange },
  empty: { paddingHorizontal: Spacing.three, paddingVertical: 12, fontSize: 14, color: Brand.textSecondary },
});
