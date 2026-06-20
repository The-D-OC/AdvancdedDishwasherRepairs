import './global.css';

import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Brand } from '@/constants/theme';

export default function RootLayout() {
  return (
    <View style={styles.root}>
      <Header />
      <View style={styles.main}>
        <Slot />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Brand.bg,
    flexDirection: 'column',
    minHeight: '100vh' as any,
  },
  main: {
    flexGrow: 1,
  },
});
