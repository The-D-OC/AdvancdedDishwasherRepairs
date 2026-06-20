import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Brand, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { BLOG_POSTS } from '@/lib/data';

export default function BlogPage() {
  const { isMobile } = useBreakpoint();

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <PageHero
        breadcrumb="Home / Blog"
        title="Latest News & Updates"
        subtitle="Tips, guides and industry news from our expert engineers."
      />
      <Section title="All Articles">
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {BLOG_POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}` as any} style={[styles.cardLink, isMobile && styles.cardLinkMobile]}>
              <View style={styles.card}>
                <View style={styles.img}><Text style={styles.imgIcon}>📰</Text></View>
                <View style={styles.body}>
                  <Text style={styles.date}>{new Date(p.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
                  <Text style={styles.cardTitle}>{p.title}</Text>
                  <Text style={styles.excerpt}>{p.excerpt}</Text>
                  <Text style={styles.readMore}>Read article →</Text>
                </View>
              </View>
            </Link>
          ))}
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.four },
  gridMobile: { flexDirection: 'column' },
  cardLink: { flex: 1, minWidth: 260, textDecorationLine: 'none' },
  cardLinkMobile: { flex: undefined, minWidth: undefined },
  card: { flex: 1, backgroundColor: Brand.bgCard, borderRadius: 12, overflow: 'hidden' as any, borderWidth: 1, borderColor: Brand.border },
  img: { height: 180, backgroundColor: Brand.bgSection, alignItems: 'center', justifyContent: 'center' },
  imgIcon: { fontSize: 48 },
  body: { padding: Spacing.four, gap: Spacing.two },
  date: { fontSize: 11, color: Brand.textMuted, fontWeight: '500' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: Brand.white, lineHeight: 26 },
  excerpt: { fontSize: 13, color: Brand.textSecondary, lineHeight: 21 },
  readMore: { fontSize: 13, fontWeight: '600', color: Brand.orange, marginTop: Spacing.one },
});
