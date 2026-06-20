import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Brand, Spacing } from '@/constants/theme';
import { BLOG_POSTS } from '@/lib/data';

export default function ArticlePage() {
  const { article: slug } = useLocalSearchParams<{ article: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return (
    <View style={styles.nf}><Text style={styles.nfText}>Article not found</Text><Button label="View All Articles" href="/blog" /></View>
  );

  return (
    <View style={{ backgroundColor: Brand.bg }}>
      <PageHero breadcrumb={`Blog / ${post.author}`} title={post.title}>
        <Text style={styles.meta}>
          {post.author} · {new Date(post.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </Text>
      </PageHero>

      <Section>
        <View style={styles.article}>
          <Text style={styles.excerpt}>{post.excerpt}</Text>
          {post.content ? (
            <Text style={styles.body}>{post.content}</Text>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Full article content coming soon. Connect to CMS to populate.</Text>
            </View>
          )}
          <View style={styles.cta}>
            <Text style={styles.ctaTitle}>Need a dishwasher repair?</Text>
            <Button label="Book an Engineer" href="/booking" size="lg" />
          </View>
        </View>
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  meta: { fontSize: 13, color: Brand.textMuted, marginTop: 4 },
  article: { maxWidth: 720, alignSelf: 'center' as any, width: '100%', gap: Spacing.four },
  excerpt: { fontSize: 18, color: Brand.textSecondary, lineHeight: 29, fontStyle: 'italic' },
  body: { fontSize: 16, color: Brand.textSecondary, lineHeight: 28 },
  placeholder: { backgroundColor: Brand.bgCard, borderRadius: 10, padding: Spacing.four, borderWidth: 1, borderColor: Brand.border, borderStyle: 'dashed' as any, alignItems: 'center' },
  placeholderText: { fontSize: 14, color: Brand.textMuted, textAlign: 'center' },
  cta: { backgroundColor: Brand.bgCard, borderRadius: 12, padding: Spacing.four, gap: Spacing.two, borderWidth: 1, borderColor: Brand.orange, alignItems: 'flex-start' as any },
  ctaTitle: { fontSize: 20, fontWeight: '700', color: Brand.white },
  nf: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.six, gap: Spacing.three },
  nfText: { fontSize: 20, color: Brand.textSecondary },
});
