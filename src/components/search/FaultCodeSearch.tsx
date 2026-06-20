import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';
import { FAULT_CODES } from '@/lib/data';

export function FaultCodeSearch() {
  const [brand, setBrand] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter();

  const results = useMemo(() => {
    if (!brand.trim() && !code.trim()) return [];
    return FAULT_CODES.filter((f) => {
      const mb = !brand.trim() || f.brand.toLowerCase().includes(brand.toLowerCase());
      const mc = !code.trim() || f.code.toLowerCase().includes(code.toLowerCase());
      return mb && mc;
    }).slice(0, 5);
  }, [brand, code]);

  const hasQuery = brand.trim() || code.trim();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>Brand</Text>
          <TextInput style={styles.input} placeholder="e.g. Hobart" placeholderTextColor={Brand.textMuted} value={brand} onChangeText={setBrand} />
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Fault Code</Text>
          <TextInput style={styles.input} placeholder="e.g. F1" placeholderTextColor={Brand.textMuted} value={code} onChangeText={setCode} />
        </View>
      </View>

      {results.length > 0 && (
        <View style={styles.results}>
          {results.map((fc, i) => (
            <Pressable key={i} style={({ pressed }) => [styles.item, pressed && styles.itemPressed]} onPress={() => router.push('/fault-codes' as any)}>
              <View style={styles.itemHeader}>
                <Text style={styles.codeTag}>{fc.code}</Text>
                <Text style={styles.itemTitle}>{fc.title}</Text>
              </View>
              <Text style={styles.itemMeta}>{fc.brand} · {fc.model}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {hasQuery && results.length === 0 && (
        <View style={styles.results}>
          <Text style={styles.empty}>No fault codes found. Try broadening your search.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.three },
  row: { flexDirection: 'row', gap: Spacing.three, flexWrap: 'wrap' as any },
  group: { flex: 1, minWidth: 180, gap: Spacing.one },
  label: { fontSize: 13, fontWeight: '600', color: Brand.textSecondary },
  input: { backgroundColor: Brand.bgCard, borderRadius: 8, paddingHorizontal: Spacing.three, height: 52, fontSize: 15, color: Brand.white, borderWidth: 1, borderColor: Brand.border, outlineStyle: 'none' as any },
  results: { backgroundColor: Brand.bgCard, borderRadius: 8, borderWidth: 1, borderColor: Brand.border, overflow: 'hidden' as any },
  item: { paddingHorizontal: Spacing.three, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Brand.border, gap: 4 },
  itemPressed: { backgroundColor: Brand.bgSection },
  itemHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  codeTag: { backgroundColor: Brand.orange, color: Brand.white, fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' as any },
  itemTitle: { fontSize: 14, fontWeight: '600', color: Brand.white },
  itemMeta: { fontSize: 12, color: Brand.textSecondary },
  empty: { paddingHorizontal: Spacing.three, paddingVertical: 12, fontSize: 14, color: Brand.textSecondary },
});
