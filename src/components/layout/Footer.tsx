import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Brand, ContentWidth, Spacing } from '@/constants/theme';

const LINKS = {
  'Quick Links': [
    { label: 'Home', href: '/' as const },
    { label: 'Services', href: '/services' as const },
    { label: 'Brands', href: '/brands' as const },
    { label: 'Fault Codes', href: '/fault-codes' as const },
    { label: 'Manuals', href: '/manuals' as const },
  ],
  'Services': [
    { label: 'Repairs', href: '/services/repairs' as const },
    { label: 'Installation', href: '/services/installation' as const },
    { label: 'Maintenance', href: '/services/maintenance' as const },
    { label: 'Emergency Call Outs', href: '/services/emergency' as const },
  ],
  'Company': [
    { label: 'About Us', href: '/about' as const },
    { label: 'Blog', href: '/blog' as const },
    { label: 'Coverage Areas', href: '/coverage-areas' as const },
    { label: 'Contact Us', href: '/contact' as const },
    { label: 'Book a Repair', href: '/booking' as const },
  ],
};

export function Footer() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <View style={styles.brand}>
          <Image
            source={require('@/assets/images/logo.jpg')}
            style={styles.logoImg}
            contentFit="contain"
          />
          <Text style={styles.tagline}>
            Fast, reliable & professional commercial dishwasher repair and maintenance services across the North West.
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.phone}>📞 07745 407 919</Text>
            <Text style={styles.email}>✉ info@advanceddishwasherrepairs.co.uk</Text>
          </View>
        </View>

        <View style={styles.linksRow}>
          {Object.entries(LINKS).map(([group, links]) => (
            <View key={group} style={styles.linkCol}>
              <Text style={styles.groupTitle}>{group}</Text>
              {links.map((l) => (
                <Link key={l.href} href={l.href} style={styles.linkWrap}>
                  <Text style={styles.linkText}>{l.label}</Text>
                </Link>
              ))}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.bottomInner}>
          <Text style={styles.bottomText}>
            © {new Date().getFullYear()} Advanced Dishwasher Repairs Ltd. All rights reserved.
          </Text>
          <Text style={styles.bottomText}>Registered in England & Wales</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { backgroundColor: '#060606', borderTopWidth: 1, borderTopColor: Brand.border },
  inner: {
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
    flexDirection: 'row' as any,
    flexWrap: 'wrap' as any,
    gap: Spacing.six,
  },
  brand: { flex: 1, minWidth: 260, gap: Spacing.three },
  logoImg: { width: 160, height: 60 },
  tagline: { color: Brand.textSecondary, fontSize: 13, lineHeight: 22, maxWidth: 280 },
  contactInfo: { gap: Spacing.one },
  phone: { color: Brand.orange, fontSize: 15, fontWeight: '700' },
  email: { color: Brand.textSecondary, fontSize: 13 },
  linksRow: { flex: 2, flexDirection: 'row' as any, flexWrap: 'wrap' as any, gap: Spacing.five },
  linkCol: { minWidth: 120, gap: Spacing.two },
  groupTitle: {
    color: Brand.orange,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase' as any,
    letterSpacing: 1.5,
    marginBottom: Spacing.two,
  },
  linkWrap: { textDecorationLine: 'none' },
  linkText: { color: Brand.textSecondary, fontSize: 13, paddingVertical: 3 },
  bottom: { borderTopWidth: 1, borderTopColor: Brand.border },
  bottomInner: {
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    flexDirection: 'row' as any,
    justifyContent: 'space-between' as any,
    flexWrap: 'wrap' as any,
    gap: Spacing.two,
  },
  bottomText: { color: Brand.textMuted, fontSize: 12 },
});
