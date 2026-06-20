import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Section } from '@/components/ui/Section';
import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { BLOG_POSTS } from '@/lib/data';

export default function BlogPage() {
  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.breadcrumb}>Home / Blog</Text>
          <Text style={styles.title}>Latest News & Updates</Text>
          <Text style={styles.sub}>Tips, guides and industry news from our expert engineers.</Text>
        </View>
      </View>
      <Section title="All Articles">
        <View style={styles.grid}>
          {BLOG_POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}` as any} style={styles.cardLink}>
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
  hero: { backgroundColor: Brand.bgSection, borderBottomWidth: 1, borderBottomColor: Brand.border, paddingVertical: 72, paddingHorizontal: Spacing.four },
  heroInner: { maxWidth: ContentWidth, marginHorizontal: 'auto' as any, width: '100%', gap: Spacing.two },
  breadcrumb: { fontSize: 12, color: Brand.textMuted },
  title: { fontSize: 42, fontWeight: '900', color: Brand.white, letterSpacing: -1 },
  sub: { fontSize: 16, color: Brand.textSecondary, maxWidth: 480 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' as any, gap: Spacing.four },
  cardLink: { flex: 1, minWidth: 280, textDecorationLine: 'none' },
  card: { flex: 1, backgroundColor: Brand.bgCard, borderRadius: 12, overflow: 'hidden' as any, borderWidth: 1, borderColor: Brand.border },
  img: { height: 200, backgroundColor: Brand.bgSection, alignItems: 'center', justifyContent: 'center' },
  imgIcon: { fontSize: 48 },
  body: { padding: Spacing.four, gap: Spacing.two },
  date: { fontSize: 11, color: Brand.textMuted, fontWeight: '500' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: Brand.white, lineHeight: 26 },
  excerpt: { fontSize: 13, color: Brand.textSecondary, lineHeight: 21 },
  readMore: { fontSize: 13, fontWeight: '600', color: Brand.orange, marginTop: Spacing.one },
});
