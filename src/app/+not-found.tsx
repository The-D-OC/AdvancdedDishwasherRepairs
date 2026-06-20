import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';

export default function NotFoundPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>404</Text>
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.sub}>
        Sorry, we couldn't find the page you're looking for.
      </Text>
      <Link href="/">
        <View style={styles.btn}>
          <Text style={styles.btnText}>Go Back Home</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.six,
    gap: Spacing.three,
    minHeight: 500,
  },
  code: {
    fontSize: 120,
    fontWeight: '900',
    color: Brand.bgCard,
    lineHeight: 120,
  },
  title: { fontSize: 32, fontWeight: '800', color: Brand.white },
  sub: { fontSize: 16, color: Brand.textSecondary, textAlign: 'center', maxWidth: 400 },
  btn: {
    backgroundColor: Brand.orange,
    paddingHorizontal: Spacing.five,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: Spacing.two,
  },
  btnText: { color: Brand.white, fontSize: 15, fontWeight: '700' },
});
