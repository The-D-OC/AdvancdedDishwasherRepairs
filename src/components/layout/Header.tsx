import { Image } from 'expo-image';
import { Link, usePathname } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, ContentWidth, Spacing } from '@/constants/theme';
import { useBreakpoint } from '@/hooks/useBreakpoint';

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
  const { isMobile, isTablet } = useBreakpoint();
  const showHamburger = isMobile || isTablet;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Link href="/" style={styles.logoLink} onPress={() => setMenuOpen(false)}>
          <Image
            source={require('@/assets/images/logo.jpg')}
            style={styles.logoImg}
            contentFit="contain"
          />
        </Link>

        {!showHamburger && (
          <View style={styles.nav}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href} style={styles.navLinkWrap}>
                  <Text style={[styles.navLink, active && styles.navLinkActive]}>{link.label}</Text>
                </Link>
              );
            })}
          </View>
        )}

        <View style={styles.actions}>
          {!showHamburger && (
            <Link href="/booking">
              <View style={styles.bookBtn}>
                <Text style={styles.bookBtnText}>Book Repair</Text>
              </View>
            </Link>
          )}
          {showHamburger && (
            <Pressable onPress={() => setMenuOpen(!menuOpen)} style={styles.menuBtn} hitSlop={8}>
              <View style={styles.hamburger}>
                <View style={[styles.bar, menuOpen && styles.barTopOpen]} />
                <View style={[styles.bar, menuOpen && styles.barMidOpen]} />
                <View style={[styles.bar, menuOpen && styles.barBotOpen]} />
              </View>
            </Pressable>
          )}
        </View>
      </View>

      {menuOpen && showHamburger && (
        <View style={styles.mobileMenu}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} onPress={() => setMenuOpen(false)}>
                <View style={[styles.mobileItem, active && styles.mobileItemActive]}>
                  <Text style={[styles.mobileLink, active && styles.mobileLinkActive]}>{link.label}</Text>
                </View>
              </Link>
            );
          })}
          <Link href="/booking" onPress={() => setMenuOpen(false)}>
            <View style={styles.mobileBookBtn}>
              <Text style={styles.mobileBookBtnText}>Book Repair</Text>
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
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: Brand.border,
    zIndex: 100,
    position: 'sticky' as any,
    top: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: 10,
    maxWidth: ContentWidth,
    marginHorizontal: 'auto' as any,
    width: '100%',
    gap: Spacing.three,
  },
  logoLink: { textDecorationLine: 'none' },
  logoImg: { width: 140, height: 52 },
  nav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
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
  actions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginLeft: 'auto' as any },
  bookBtn: {
    backgroundColor: Brand.orange,
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    borderRadius: 6,
  },
  bookBtnText: { color: '#000', fontSize: 13, fontWeight: '800' },
  menuBtn: { padding: 4 },
  hamburger: { gap: 5, padding: 4 },
  bar: { width: 22, height: 2, backgroundColor: Brand.white, borderRadius: 2 },
  barTopOpen: { transform: [{ rotate: '45deg' }, { translateY: 7 }] },
  barMidOpen: { opacity: 0 },
  barBotOpen: { transform: [{ rotate: '-45deg' }, { translateY: -7 }] },
  mobileMenu: {
    backgroundColor: '#0A0A0A',
    borderTopWidth: 1,
    borderTopColor: Brand.border,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    gap: 2,
  },
  mobileItem: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: Brand.border,
  },
  mobileItemActive: {
    borderBottomColor: Brand.orange,
  },
  mobileLink: { color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: '500' },
  mobileLinkActive: { color: Brand.white, fontWeight: '700' },
  mobileBookBtn: {
    backgroundColor: Brand.orange,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: Spacing.three,
  },
  mobileBookBtnText: { color: '#000', fontSize: 15, fontWeight: '800' },
  mobilePhone: { alignItems: 'center', paddingTop: Spacing.two },
  mobilePhoneText: { color: Brand.textSecondary, fontSize: 13 },
});
