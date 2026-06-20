import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { FaultCodeSearch } from '@/components/search/FaultCodeSearch';
import { ManualSearch } from '@/components/search/ManualSearch';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { BLOG_POSTS, BRANDS, SERVICES, TESTIMONIALS } from '@/lib/data';

const STATS = [
  { value: '5000+', label: 'Machines Repaired' },
  { value: '15+', label: 'Years Experience' },
  { value: '98%', label: 'First Time Fix' },
  { value: '24/7', label: 'Support' },
];

const SERVICE_ICONS: Record<string, string> = {
  repairs: '🔧', installation: '🏗️', maintenance: '📋', emergency: '🚨',
};

export default function HomePage() {
  const { isMobile } = useBreakpoint();

  return (
    <View style={{ backgroundColor: Brand.bg }}>

      {/* HERO */}
      <View style={styles.hero}>
        <View style={[styles.heroInner, isMobile && styles.heroInnerMobile]}>
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>⚡ Commercial Specialists</Text>
            </View>
            <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile]}>
              Commercial Dishwasher{'\n'}Repair Experts
            </Text>
            <Text style={[styles.heroSub, isMobile && styles.heroSubMobile]}>
              Fast, reliable & professional commercial dishwasher repair and maintenance services across the North West.
            </Text>
            <View style={styles.heroChecks}>
              {['24/7 Emergency Call Out', '100+ Years Combined Experience', 'Fully Qualified Engineers'].map((c) => (
                <Text key={c} style={styles.heroCheck}>✓  {c}</Text>
              ))}
            </View>
            <View style={[styles.heroActions, isMobile && styles.heroActionsMobile]}>
              <Button label="Book Engineer" href="/booking" size={isMobile ? 'md' : 'lg'} />
              <Button label="Get Instant Quote" href="/contact" size={isMobile ? 'md' : 'lg'} variant="outline" />
            </View>
            <View style={styles.phone}>
              <Text style={styles.phoneIcon}>📞</Text>
              <Text style={[styles.phoneNumber, isMobile && styles.phoneNumberMobile]}>07745 407 919</Text>
            </View>
          </View>

          {!isMobile && (
            <View style={styles.heroVisual}>
              <View style={styles.heroImageBox}>
                <Text style={styles.heroImageIcon}>⚙️</Text>
                <Text style={styles.heroImageText}>Commercial{'\n'}Dishwasher{'\n'}Equipment</Text>
                <View style={styles.emergencyBadge}>
                  <Text style={styles.emergencyTop}>24/7</Text>
                  <Text style={styles.emergencyLabel}>EMERGENCY</Text>
                  <Text style={styles.emergencyPhone}>07745 407 919</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Stats bar */}
        <View style={styles.statsBar}>
          <View style={[styles.statsInner, isMobile && styles.statsInnerMobile]}>
            {STATS.map((s, i) => (
              <View key={s.label} style={[styles.statItem, !isMobile && i < STATS.length - 1 && styles.statBorder]}>
                <Text style={[styles.statValue, isMobile && styles.statValueMobile]}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* BRANDS STRIP */}
      <View style={styles.brandsStrip}>
        <View style={[styles.brandsInner, isMobile && styles.brandsInnerMobile]}>
          <Text style={styles.brandsLabel}>TRUSTED BY BRANDS ACROSS THE UK</Text>
          <View style={styles.brandLogos}>
            {BRANDS.map((b) => (
              <Link key={b.slug} href={`/brands/${b.slug}` as any} style={styles.brandLogoLink}>
                <View style={styles.brandLogoBox}>
                  <Text style={styles.brandLogoText}>{b.name.toUpperCase()}</Text>
                </View>
              </Link>
            ))}
          </View>
        </View>
      </View>

      {/* MANUAL SEARCH */}
      <Section title="Find a Manual" subtitle="Search by brand, model or product type." alt>
        <View style={styles.searchWrap}><ManualSearch /></View>
      </Section>

      {/* FAULT CODE SEARCH */}
      <Section title="Diagnose a Fault Code" subtitle="Enter your brand and fault code for instant diagnosis.">
        <View style={styles.searchWrap}><FaultCodeSearch /></View>
      </Section>

      {/* SERVICES */}
      <Section title="OUR SERVICES" subtitle="Professional commercial dishwasher services you can rely on." alt>
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}` as any} style={[styles.serviceLink, isMobile && styles.serviceLinkMobile]}>
              <View style={styles.serviceCard}>
                <Text style={styles.serviceIcon}>{SERVICE_ICONS[s.slug] ?? '🔧'}</Text>
                <Text style={styles.serviceTitle}>{s.title}</Text>
                <Text style={styles.serviceDesc}>{s.description}</Text>
                <Text style={styles.serviceCta}>Find out more →</Text>
              </View>
            </Link>
          ))}
        </View>
        <View style={[styles.statsRow, isMobile && styles.gridMobile]}>
          {STATS.map((s) => (
            <View key={s.label} style={[styles.statsCard, isMobile && styles.statsCardMobile]}>
              <Text style={styles.statsCardValue}>{s.value}</Text>
              <Text style={styles.statsCardLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </Section>

      {/* BEFORE & AFTER */}
      <Section title="BEFORE & AFTER">
        <View style={[styles.galleryRow, isMobile && styles.galleryRowMobile]}>
          <View style={styles.galleryCard}>
            <View style={styles.galleryImg}>
              <Text style={styles.galleryImgLabel}>Before</Text>
            </View>
            <Text style={styles.galleryCaption}>Faulty wash pump — Hobart AM15</Text>
          </View>
          {!isMobile && (
            <View style={styles.galleryDivider}>
              <Text style={styles.galleryArrow}>→</Text>
            </View>
          )}
          <View style={styles.galleryCard}>
            <View style={[styles.galleryImg, styles.galleryImgAfter]}>
              <Text style={styles.galleryImgLabel}>After</Text>
            </View>
            <Text style={styles.galleryCaption}>Fully repaired & recommissioned</Text>
          </View>
        </View>
      </Section>

      {/* TESTIMONIALS */}
      <Section title="WHAT OUR CLIENTS SAY" subtitle="Trusted by hospitality and catering businesses across the UK." alt>
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {TESTIMONIALS.map((t, i) => (
            <View key={i} style={[styles.testimonialCard, isMobile && styles.testimonialCardMobile]}>
              <Text style={styles.stars}>{'★'.repeat(t.rating)}</Text>
              <Text style={styles.review}>"{t.review}"</Text>
              <View style={styles.reviewer}>
                <Text style={styles.reviewerName}>{t.customerName}</Text>
                <Text style={styles.reviewerCompany}>{t.companyName}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.phoneCta}>
          <Text style={styles.phoneCtaText}>📞 07745 407 919</Text>
        </View>
      </Section>

      {/* LATEST ARTICLES */}
      <Section title="LATEST NEWS & UPDATES">
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {BLOG_POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}` as any} style={[styles.articleLink, isMobile && styles.serviceLinkMobile]}>
              <View style={styles.articleCard}>
                <View style={styles.articleImg}>
                  <Text style={styles.articleImgIcon}>📰</Text>
                </View>
                <View style={styles.articleBody}>
                  <Text style={styles.articleDate}>
                    {new Date(p.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </Text>
                  <Text style={styles.articleTitle}>{p.title}</Text>
                  <Text style={styles.articleExcerpt}>{p.excerpt}</Text>
                </View>
              </View>
            </Link>
          ))}
        </View>
      </Section>

      {/* EMERGENCY CTA */}
      <View style={[styles.emergencyCta, isMobile && styles.emergencyCtaMobile]}>
        <View style={[styles.emergencyInner, isMobile && styles.emergencyInnerMobile]}>
          <View style={styles.emergencyContent}>
            <Text style={[styles.emergencyTitle, isMobile && styles.emergencyTitleMobile]}>MACHINE DOWN? WE CAN HELP</Text>
            <Text style={styles.emergencySub}>24/7 emergency repair service. Fast response across the North West.</Text>
          </View>
          <View style={[styles.emergencyActions, isMobile && styles.emergencyActionsMobile]}>
            <Button label="Book Engineer" href="/booking" size="lg" />
            <View style={styles.emergencyPhoneBox}>
              <Text style={styles.emergencyPhoneLabel}>📞 CALL 07745 407 919</Text>
            </View>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  // Hero
  hero: { backgroundColor: Brand.bg },
  heroInner: {
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.seven,
    flexDirection: 'row',
    gap: Spacing.six,
    alignItems: 'center',
  },
  heroInnerMobile: {
    flexDirection: 'column',
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.three,
    gap: Spacing.four,
  },
  heroContent: { flex: 1, minWidth: 0, gap: Spacing.three },
  heroBadge: {
    alignSelf: 'flex-start' as any,
    backgroundColor: Brand.orangeLight,
    borderRadius: 100,
    paddingHorizontal: Spacing.three,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(37,99,235,0.3)',
  },
  heroBadgeText: { color: Brand.orange, fontSize: 12, fontWeight: '600' },
  heroTitle: { fontSize: 44, fontWeight: '900', color: Brand.white, lineHeight: 52, letterSpacing: -1 },
  heroTitleMobile: { fontSize: 30, lineHeight: 38, letterSpacing: -0.5 },
  heroSub: { fontSize: 16, color: Brand.textSecondary, lineHeight: 26, maxWidth: 460 },
  heroSubMobile: { fontSize: 14, lineHeight: 22 },
  heroChecks: { gap: 8 },
  heroCheck: { fontSize: 14, color: Brand.textSecondary, fontWeight: '500' },
  heroActions: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' as any },
  heroActionsMobile: { flexDirection: 'column' },
  phone: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  phoneIcon: { fontSize: 16 },
  phoneNumber: { color: Brand.orange, fontSize: 18, fontWeight: '700' },
  phoneNumberMobile: { fontSize: 16 },
  heroVisual: { flex: 1, minWidth: 260, alignItems: 'center' },
  heroImageBox: {
    width: '100%',
    maxWidth: 380,
    aspectRatio: 4 / 3,
    backgroundColor: Brand.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Brand.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    position: 'relative' as any,
  },
  heroImageIcon: { fontSize: 56 },
  heroImageText: { color: Brand.textSecondary, fontSize: 14, textAlign: 'center', lineHeight: 22 },
  emergencyBadge: {
    position: 'absolute' as any,
    bottom: Spacing.three,
    right: Spacing.three,
    backgroundColor: Brand.orange,
    borderRadius: 8,
    padding: Spacing.two,
    alignItems: 'center',
  },
  emergencyTop: { color: Brand.white, fontSize: 20, fontWeight: '900' },
  emergencyLabel: { color: Brand.white, fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  emergencyPhone: { color: Brand.white, fontSize: 11, fontWeight: '600', marginTop: 2 },

  // Stats bar
  statsBar: { backgroundColor: Brand.bgCard, borderTopWidth: 1, borderBottomWidth: 1, borderColor: Brand.border },
  statsInner: {
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    flexDirection: 'row',
  },
  statsInnerMobile: { flexWrap: 'wrap' as any },
  statItem: { flex: 1, minWidth: 80, alignItems: 'center', paddingVertical: Spacing.three },
  statBorder: { borderRightWidth: 1, borderRightColor: Brand.border },
  statValue: { fontSize: 26, fontWeight: '900', color: Brand.orange },
  statValueMobile: { fontSize: 20 },
  statLabel: { fontSize: 11, color: Brand.textSecondary, fontWeight: '500', marginTop: 2, textAlign: 'center' },

  // Brands
  brandsStrip: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderTopWidth: 1, borderColor: Brand.border, paddingVertical: Spacing.four },
  brandsInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', paddingHorizontal: Spacing.four, gap: Spacing.three },
  brandsInnerMobile: { paddingHorizontal: Spacing.three },
  brandsLabel: { color: Brand.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 2, textAlign: 'center' as any },
  brandLogos: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.two, justifyContent: 'center' as any },
  brandLogoLink: { textDecorationLine: 'none' },
  brandLogoBox: { paddingHorizontal: Spacing.two, paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: Brand.border, backgroundColor: Brand.bgCard },
  brandLogoText: { color: Brand.textSecondary, fontSize: 11, fontWeight: '700', letterSpacing: 1 },

  // Search
  searchWrap: { maxWidth: 720, alignSelf: 'center' as any, width: '100%' },

  // Grid
  grid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  gridMobile: { flexDirection: 'column' },

  // Services
  serviceLink: { flex: 1, minWidth: 220, textDecorationLine: 'none' },
  serviceLinkMobile: { flex: undefined, minWidth: undefined },
  serviceCard: { flex: 1, backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border },
  serviceIcon: { fontSize: 32 },
  serviceTitle: { fontSize: 18, fontWeight: '700', color: Brand.white },
  serviceDesc: { fontSize: 13, color: Brand.textSecondary, lineHeight: 21, flex: 1 },
  serviceCta: { fontSize: 13, fontWeight: '600', color: Brand.orange, marginTop: Spacing.two },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.three },
  statsCard: { flex: 1, minWidth: 100, backgroundColor: Brand.bgCard, borderRadius: 10, padding: Spacing.three, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: Brand.border },
  statsCardMobile: { flex: undefined, minWidth: undefined },
  statsCardValue: { fontSize: 26, fontWeight: '900', color: Brand.orange },
  statsCardLabel: { fontSize: 12, color: Brand.textSecondary },

  // Gallery
  galleryRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, flexWrap: 'wrap' as any },
  galleryRowMobile: { flexDirection: 'column' },
  galleryCard: { flex: 1, minWidth: 200, gap: Spacing.two },
  galleryImg: { height: 200, backgroundColor: Brand.bgCard, borderRadius: 12, borderWidth: 1, borderColor: Brand.border, alignItems: 'center', justifyContent: 'center' },
  galleryImgAfter: { borderColor: Brand.orange },
  galleryImgLabel: { color: Brand.textMuted, fontSize: 13, fontWeight: '600' },
  galleryCaption: { color: Brand.textSecondary, fontSize: 13, textAlign: 'center' as any },
  galleryDivider: { alignItems: 'center' },
  galleryArrow: { fontSize: 28, color: Brand.orange, fontWeight: '700' },

  // Testimonials
  testimonialCard: { flex: 1, minWidth: 250, backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.border },
  testimonialCardMobile: { flex: undefined, minWidth: undefined },
  stars: { fontSize: 16, color: '#F59E0B' },
  review: { fontSize: 14, color: Brand.textSecondary, lineHeight: 22, fontStyle: 'italic', flex: 1 },
  reviewer: { borderTopWidth: 1, borderTopColor: Brand.border, paddingTop: Spacing.two, marginTop: Spacing.one },
  reviewerName: { fontSize: 14, fontWeight: '700', color: Brand.white },
  reviewerCompany: { fontSize: 12, color: Brand.textSecondary },
  phoneCta: { backgroundColor: Brand.orange, borderRadius: 8, paddingVertical: Spacing.three, alignItems: 'center' },
  phoneCtaText: { color: Brand.white, fontSize: 16, fontWeight: '700' },

  // Articles
  articleLink: { flex: 1, minWidth: 260, textDecorationLine: 'none' },
  articleCard: { flex: 1, backgroundColor: Brand.bgCard, borderRadius: 12, overflow: 'hidden' as any, borderWidth: 1, borderColor: Brand.border },
  articleImg: { height: 160, backgroundColor: Brand.bgSection, alignItems: 'center', justifyContent: 'center' },
  articleImgIcon: { fontSize: 40 },
  articleBody: { padding: Spacing.three, gap: Spacing.one },
  articleDate: { fontSize: 11, color: Brand.textMuted },
  articleTitle: { fontSize: 16, fontWeight: '700', color: Brand.white, lineHeight: 24 },
  articleExcerpt: { fontSize: 13, color: Brand.textSecondary, lineHeight: 20 },

  // Emergency CTA
  emergencyCta: { backgroundColor: '#0D0D0D', borderTopWidth: 1, borderTopColor: Brand.border },
  emergencyCtaMobile: {},
  emergencyInner: {
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
    flexDirection: 'row',
    flexWrap: 'wrap' as any,
    alignItems: 'center',
    gap: Spacing.four,
    justifyContent: 'space-between' as any,
  },
  emergencyInnerMobile: { flexDirection: 'column', paddingHorizontal: Spacing.three, alignItems: 'stretch' },
  emergencyContent: { flex: 1, minWidth: 0, gap: Spacing.two },
  emergencyTitle: { fontSize: 22, fontWeight: '900', color: Brand.white },
  emergencyTitleMobile: { fontSize: 18 },
  emergencySub: { fontSize: 14, color: Brand.textSecondary },
  emergencyActions: { flexDirection: 'row', gap: Spacing.two, flexWrap: 'wrap' as any },
  emergencyActionsMobile: { flexDirection: 'column' },
  emergencyPhoneBox: { backgroundColor: Brand.bgCard, paddingHorizontal: Spacing.four, paddingVertical: 15, borderRadius: 6, borderWidth: 1, borderColor: Brand.border, justifyContent: 'center' },
  emergencyPhoneLabel: { color: Brand.white, fontSize: 14, fontWeight: '700' },
});
