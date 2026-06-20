import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';

type Condition = 'all' | 'new' | 'refurbished' | 'used';

const MACHINES = [
  { id: '1', name: 'Hobart AM15 Dishwasher', brand: 'Hobart', model: 'AM15', condition: 'refurbished' as const, price: 1850, originalPrice: 3200, description: 'Fully refurbished rack conveyor dishwasher. Serviced, tested and comes with 90-day warranty.', specs: ['500 racks/hr', '3-phase', 'Fully serviced'], badge: 'Best Seller' },
  { id: '2', name: 'Winterhalter UC-M Dishwasher', brand: 'Winterhalter', model: 'UC-M', condition: 'used' as const, price: 950, originalPrice: null, description: 'Good working order glasswasher, recently serviced. Ideal for bars and cafes.', specs: ['Glasswasher', 'Single phase', 'Recently serviced'], badge: null },
  { id: '3', name: 'Meiko M-iQ Conveyor', brand: 'Meiko', model: 'M-iQ', condition: 'new' as const, price: 8500, originalPrice: null, description: 'Brand new flight conveyor dishwasher with energy recovery. Perfect for large kitchens.', specs: ['Flight conveyor', 'Energy recovery', 'Full warranty'], badge: 'New' },
  { id: '4', name: 'Electrolux WT3LSDA', brand: 'Electrolux', model: 'WT3LSDA', condition: 'refurbished' as const, price: 1200, originalPrice: 2400, description: 'Refurbished undercounter dishwasher. New wash pump fitted. 90-day parts & labour warranty.', specs: ['Undercounter', 'New pump fitted', '90-day warranty'], badge: 'Great Value' },
  { id: '5', name: 'Hobart FX Glasswasher', brand: 'Hobart', model: 'FX', condition: 'used' as const, price: 650, originalPrice: null, description: 'Solid working glasswasher. Minor cosmetic marks but fully functional. Tested before sale.', specs: ['Glasswasher', 'Single phase', 'Tested'], badge: null },
  { id: '6', name: 'Classeq G400 Duo Glasswasher', brand: 'Classeq', model: 'G400 Duo', condition: 'refurbished' as const, price: 780, originalPrice: 1400, description: 'Refurbished twin-tank glasswasher. New elements, pumps cleaned, full service history.', specs: ['Twin tank', 'New elements', 'Serviced'], badge: 'Popular' },
  { id: '7', name: 'Winterhalter PT-M Hood', brand: 'Winterhalter', model: 'PT-M', condition: 'new' as const, price: 6200, originalPrice: null, description: 'New hood-type dishwasher. Quiet operation, low energy consumption. Includes installation.', specs: ['Hood type', 'Low energy', 'Includes install'], badge: 'New' },
  { id: '8', name: 'Meiko FV 40.2 Undercounter', brand: 'Meiko', model: 'FV 40.2', condition: 'used' as const, price: 490, originalPrice: null, description: 'Used undercounter machine, recently serviced and cleaned. Good condition for the price.', specs: ['Undercounter', 'Recently serviced', 'Single phase'], badge: null },
  { id: '9', name: 'Hobart LXeH-2 Undercounter', brand: 'Hobart', model: 'LXeH-2', condition: 'refurbished' as const, price: 2100, originalPrice: 3800, description: 'Premium refurbished low-temp chemical sanitising machine. Perfect for delicate items.', specs: ['Low-temp', 'Chemical sanitise', '90-day warranty'], badge: 'Premium' },
];

const CONDITION_LABELS: Record<string, string> = {
  all: 'All Machines', new: 'New', refurbished: 'Refurbished', used: 'Used',
};

const CONDITION_COLOURS: Record<string, string> = {
  new: '#22C55E', refurbished: Brand.orange, used: 'rgba(255,255,255,0.4)',
};

export default function WashingMachinesPage() {
  const { isMobile } = useBreakpoint();
  const [filter, setFilter] = useState<Condition>('all');
  const [sort, setSort] = useState<'price-asc' | 'price-desc' | 'default'>('default');

  const filtered = MACHINES
    .filter((m) => filter === 'all' || m.condition === filter)
    .sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : 0);

  return (
    <View style={{ backgroundColor: Brand.bg }}>

      {/* Hero */}
      <View style={styles.hero}>
        <View style={[styles.heroInner, isMobile && styles.heroInnerMobile]}>
          <Text style={styles.breadcrumb}>Home / Washing Machines For Sale</Text>
          <Text style={[styles.title, isMobile && styles.titleMobile]}>
            Commercial Dishwashers For Sale
          </Text>
          <Text style={[styles.sub, isMobile && styles.subMobile]}>
            New, refurbished and used commercial dishwashers and glasswashers from leading brands. All machines tested and ready to go.
          </Text>
          <View style={styles.heroBadges}>
            {['All machines tested', '90-day warranty on refurbished', 'UK delivery available', 'Installation service'].map((b) => (
              <View key={b} style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>✓ {b}</Text>
              </View>
            ))}
          </View>
          <View style={styles.heroActions}>
            <Link href="/contact">
              <View style={styles.ctaBtn}><Text style={styles.ctaBtnText}>Enquire About a Machine</Text></View>
            </Link>
            <Link href="/booking">
              <View style={styles.ctaBtnOutline}><Text style={styles.ctaBtnOutlineText}>Book a Repair Instead</Text></View>
            </Link>
          </View>
        </View>
      </View>

      {/* Filter + Sort bar */}
      <View style={styles.filterBar}>
        <View style={[styles.filterInner, isMobile && styles.filterInnerMobile]}>
          <View style={styles.filterGroup}>
            {(Object.keys(CONDITION_LABELS) as Condition[]).map((c) => (
              <Pressable key={c} onPress={() => setFilter(c)} style={[styles.filterBtn, filter === c && styles.filterBtnOn]}>
                <Text style={[styles.filterBtnText, filter === c && styles.filterBtnTextOn]}>
                  {CONDITION_LABELS[c]}
                  <Text style={styles.filterCount}> ({c === 'all' ? MACHINES.length : MACHINES.filter((m) => m.condition === c).length})</Text>
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.sortGroup}>
            <Text style={styles.sortLabel}>Sort:</Text>
            {[['default', 'Featured'], ['price-asc', 'Price ↑'], ['price-desc', 'Price ↓']].map(([val, label]) => (
              <Pressable key={val} onPress={() => setSort(val as any)} style={[styles.sortBtn, sort === val && styles.sortBtnOn]}>
                <Text style={[styles.sortBtnText, sort === val && styles.sortBtnTextOn]}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* Grid */}
      <Section>
        <Text style={styles.resultCount}>{filtered.length} machine{filtered.length !== 1 ? 's' : ''} found</Text>
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {filtered.map((m) => (
            <View key={m.id} style={[styles.card, isMobile && styles.cardMobile]}>
              {/* Image placeholder */}
              <View style={styles.cardImg}>
                <Text style={styles.cardImgIcon}>🍽️</Text>
                {m.badge && (
                  <View style={[styles.badge, { backgroundColor: m.condition === 'new' ? '#22C55E' : Brand.orange }]}>
                    <Text style={styles.badgeText}>{m.badge}</Text>
                  </View>
                )}
                <View style={[styles.conditionTag, { borderColor: CONDITION_COLOURS[m.condition] }]}>
                  <Text style={[styles.conditionText, { color: CONDITION_COLOURS[m.condition] }]}>
                    {m.condition.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.cardBrand}>{m.brand}</Text>
                <Text style={styles.cardName}>{m.name}</Text>
                <Text style={styles.cardDesc}>{m.description}</Text>

                {/* Specs */}
                <View style={styles.specs}>
                  {m.specs.map((s) => (
                    <View key={s} style={styles.spec}>
                      <Text style={styles.specText}>✓ {s}</Text>
                    </View>
                  ))}
                </View>

                {/* Price */}
                <View style={styles.priceRow}>
                  <View>
                    <Text style={styles.price}>£{m.price.toLocaleString()}</Text>
                    {m.originalPrice && (
                      <Text style={styles.originalPrice}>Was £{m.originalPrice.toLocaleString()}</Text>
                    )}
                  </View>
                  {m.originalPrice && (
                    <View style={styles.savingBadge}>
                      <Text style={styles.savingText}>Save £{(m.originalPrice - m.price).toLocaleString()}</Text>
                    </View>
                  )}
                </View>

                {/* CTA */}
                <Link href="/contact">
                  <View style={styles.enquireBtn}>
                    <Text style={styles.enquireBtnText}>Enquire Now</Text>
                  </View>
                </Link>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom CTA */}
        <View style={styles.bottomCta}>
          <View style={styles.bottomCtaInner}>
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={styles.bottomCtaTitle}>Can't Find What You Need?</Text>
              <Text style={styles.bottomCtaSub}>We can source specific models or arrange a part-exchange on your current machine.</Text>
            </View>
            <Link href="/contact">
              <View style={styles.ctaBtn}><Text style={styles.ctaBtnText}>Get In Touch</Text></View>
            </Link>
          </View>
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border },
  heroInner: {
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingVertical: 72,
    gap: Spacing.three,
  },
  heroInnerMobile: { paddingVertical: Spacing.five, paddingHorizontal: Spacing.three },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 42, fontWeight: '900', color: Brand.white, letterSpacing: -1 },
  titleMobile: { fontSize: 28, letterSpacing: -0.5 },
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 560, lineHeight: 26 },
  subMobile: { fontSize: 14, lineHeight: 22 },
  heroBadges: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.two },
  heroBadge: { backgroundColor: Brand.bgCard, borderRadius: 100, paddingHorizontal: Spacing.two, paddingVertical: 6, borderWidth: 1, borderColor: Brand.border },
  heroBadgeText: { color: Brand.textSecondary, fontSize: 12, fontWeight: '500' },
  heroActions: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.two },
  ctaBtn: { backgroundColor: Brand.orange, paddingHorizontal: Spacing.four, paddingVertical: 14, borderRadius: 8 },
  ctaBtnText: { color: '#000', fontWeight: '800', fontSize: 14 },
  ctaBtnOutline: { borderWidth: 1, borderColor: Brand.orange, paddingHorizontal: Spacing.four, paddingVertical: 14, borderRadius: 8 },
  ctaBtnOutlineText: { color: Brand.orange, fontWeight: '700', fontSize: 14 },

  // Filter bar
  filterBar: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border },
  filterInner: {
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    flexDirection: 'row',
    flexWrap: 'wrap' as any,
    gap: Spacing.three,
    alignItems: 'center',
    justifyContent: 'space-between' as any,
  },
  filterInnerMobile: { paddingHorizontal: Spacing.three, gap: Spacing.two },
  filterGroup: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.one },
  filterBtn: { paddingHorizontal: Spacing.two, paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: Brand.border, backgroundColor: Brand.bgCard },
  filterBtnOn: { borderColor: Brand.orange, backgroundColor: 'rgba(0,180,216,0.12)' },
  filterBtnText: { fontSize: 13, color: Brand.textSecondary, fontWeight: '500' },
  filterBtnTextOn: { color: Brand.orange },
  filterCount: { fontSize: 11, color: Brand.textMuted },
  sortGroup: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },
  sortLabel: { fontSize: 12, color: Brand.textMuted, marginRight: 4 },
  sortBtn: { paddingHorizontal: Spacing.two, paddingVertical: 7, borderRadius: 5, borderWidth: 1, borderColor: Brand.border },
  sortBtnOn: { borderColor: Brand.orange },
  sortBtnText: { fontSize: 12, color: Brand.textMuted },
  sortBtnTextOn: { color: Brand.orange },

  // Grid
  resultCount: { fontSize: 13, color: Brand.textMuted },
  grid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  gridMobile: { flexDirection: 'column' },

  card: {
    flex: 1,
    minWidth: 280,
    maxWidth: '32%' as any,
    backgroundColor: Brand.bgCard,
    borderRadius: 12,
    overflow: 'hidden' as any,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  cardMobile: { flex: undefined, minWidth: undefined, maxWidth: undefined },
  cardImg: {
    height: 200,
    backgroundColor: Brand.bgSection,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as any,
  },
  cardImgIcon: { fontSize: 52 },
  badge: {
    position: 'absolute' as any,
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: { color: '#000', fontSize: 11, fontWeight: '800' },
  conditionTag: {
    position: 'absolute' as any,
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  conditionText: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  cardBody: { padding: Spacing.three, gap: Spacing.two, flex: 1 },
  cardBrand: { fontSize: 11, color: Brand.orange, fontWeight: '700', textTransform: 'uppercase' as any, letterSpacing: 1 },
  cardName: { fontSize: 16, fontWeight: '700', color: Brand.white, lineHeight: 22 },
  cardDesc: { fontSize: 13, color: Brand.textSecondary, lineHeight: 20, flex: 1 },
  specs: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: 6 },
  spec: { backgroundColor: 'rgba(0,180,216,0.08)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0,180,216,0.2)' },
  specText: { fontSize: 11, color: Brand.orange, fontWeight: '500' },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' as any, marginTop: Spacing.one },
  price: { fontSize: 24, fontWeight: '900', color: Brand.white },
  originalPrice: { fontSize: 12, color: Brand.textMuted, textDecorationLine: 'line-through' },
  savingBadge: { backgroundColor: '#22C55E22', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderWidth: 1, borderColor: '#22C55E44' },
  savingText: { fontSize: 11, fontWeight: '700', color: '#22C55E' },
  enquireBtn: {
    backgroundColor: Brand.orange,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  enquireBtnText: { color: '#000', fontSize: 14, fontWeight: '800' },

  // Bottom CTA
  bottomCta: {
    backgroundColor: Brand.bgCard,
    borderRadius: 12,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  bottomCtaInner: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three, alignItems: 'center' },
  bottomCtaTitle: { fontSize: 20, fontWeight: '800', color: Brand.white },
  bottomCtaSub: { fontSize: 14, color: Brand.textSecondary },
});
