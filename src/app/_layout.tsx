import { Stack } from 'expo-router';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Brand } from '@/constants/theme';

export default function RootLayout() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.root}>
        <Header />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.pageContent}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Brand.bg } }} />
          </View>
          <Footer />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Header />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.pageContent}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Brand.bg } }} />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Brand.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  pageContent: {
    flex: 1,
  },
});
