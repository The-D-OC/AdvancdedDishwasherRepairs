import { Link, usePathname } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, ContentWidth, Spacing } from '@/constants/theme';

const NAV_LINKS = [
  { label: 'Home', href: '/' as const },
  { label: 'Services', href: '/services' as const },
  { label: 'Brands', href: '/brands' as const },
  { label: 'Fault Codes', href: '/fault-codes' as const },
  { label: 'Manuals', href: '/manuals' as const },
  { label: 'Coverage', href: '/coverage-areas' as const },
  { label: 'About', href: '/about' as const },
  { label: 'Contact Us', href: '/contact' as const },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Link href="/" style={styles.logoLink}>
          <View style={styles.logo}>
            <View style={styles.logoTextBlock}>
              <Text style={styles.logoTop}>ADVANCED</Text>
              <View style={styles.logoDivider} />
              <Text style={styles.logoBottom}>DISHWASHER REPAIRS</Text>
            </View>
          </View>
        </Link>

        {Platform.OS === 'web' && (
          <View style={styles.nav}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href} style={styles.navLinkWrap}>
                  <Text style={[styles.navLink, active && styles.navLinkActive]}>
                    {link.label}
                  </Text>
                </Link>
              );
            })}
          </View>
        )}

        <View style={styles.actions}>
          <Link href="/booking">
            <View style={styles.bookBtn}>
              <Text style={styles.bookBtnText}>Book Repair</Text>
            </View>
          </Link>
          {Platform.OS !== 'web' && (
            <Pressable onPress={() => setMenuOpen(!menuOpen)} style={styles.menuBtn}>
              <Text style={styles.menuIcon}>{menuOpen ? '✕' : '☰'}</Text>
            </Pressable>
          )}
        </View>
      </View>

      {menuOpen && Platform.OS !== 'web' && (
        <View style={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onPress={() => setMenuOpen(false)}>
              <Text style={styles.mobileLink}>{link.label}</Text>
            </Link>
          ))}
          <Link href="/booking" onPress={() => setMenuOpen(false)}>
            <View style={[styles.bookBtn, styles.mobileBookBtn]}>
              <Text style={styles.bookBtnText}>Book Repair</Text>
            </View>
          </Link>
          <View style={styles.mobilePhone}>
            <Text style={styles.mobilePhoneText}>📞 07745 407 919</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: Brand.border,
    zIndex: 100,
    ...Platform.select({ web: { position: 'sticky' as any, top: 0 } }),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    gap: Spacing.three,
  },
  logoLink: { textDecorationLine: 'none' },
  logo: { flexDirection: 'row', alignItems: 'center' },
  logoTextBlock: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  logoTop: {
    color: Brand.white,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 2,
  },
  logoDivider: {
    width: 1,
    height: 20,
    backgroundColor: Brand.orange,
  },
  logoBottom: {
    color: Brand.orange,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase' as any,
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flexWrap: 'wrap' as any,
  },
  navLinkWrap: { textDecorationLine: 'none' },
  navLink: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  navLinkActive: {
    color: Brand.white,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  bookBtn: {
    backgroundColor: Brand.orange,
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    borderRadius: 6,
  },
  bookBtnText: {
    color: Brand.white,
    fontSize: 13,
    fontWeight: '700',
  },
  menuBtn: { padding: Spacing.two },
  menuIcon: { color: Brand.white, fontSize: 20 },
  mobileMenu: {
    backgroundColor: '#111111',
    borderTopWidth: 1,
    borderTopColor: Brand.border,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  mobileLink: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: Brand.border,
  },
  mobileBookBtn: { alignSelf: 'flex-start' as any, marginTop: Spacing.two },
  mobilePhone: {
    paddingVertical: Spacing.two,
  },
  mobilePhoneText: { color: Brand.orange, fontSize: 14, fontWeight: '600' },
});
