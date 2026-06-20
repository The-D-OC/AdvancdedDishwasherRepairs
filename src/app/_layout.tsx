import { Stack } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Brand } from '@/constants/theme';

export default function RootLayout() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.root}>
        <Header />
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Brand.bg } }} />
        </View>
        <Footer />
      </View>
    );
  }

  return (
    <>
      <Header />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Brand.bg } }} />
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: '100vh' as any,
    backgroundColor: Brand.bg,
    display: 'flex' as any,
    flexDirection: 'column',
  },
  content: { flex: 1 },
});
