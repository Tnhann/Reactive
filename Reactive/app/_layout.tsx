import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, Text, ActivityIndicator } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootLayoutNavigation />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

// Navigasyon bileşeni
function RootLayoutNavigation() {
  const { user, loading } = useAuth();

  console.log('RootLayoutNavigation: Kullanıcı durumu:', user ? 'Giriş yapılmış' : 'Giriş yapılmamış');

  // Kimlik doğrulama yüklenirken yükleme ekranı göster
  if (loading) {
    console.log('RootLayoutNavigation: Yükleniyor...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  // Kullanıcı oturum açmışsa ana sayfaya, açmamışsa giriş sayfasına yönlendir
  const initialRoute = user ? '/(tabs)' : '/auth/login';
  console.log('RootLayoutNavigation: Başlangıç rotası:', initialRoute);

  // useEffect ile başlangıç rotasına yönlendirme
  useEffect(() => {
    if (user) {
      console.log('RootLayoutNavigation: Kullanıcı oturum açmış, ana sayfaya yönlendiriliyor...');
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 100);
    } else {
      console.log('RootLayoutNavigation: Kullanıcı oturum açmamış, giriş sayfasına yönlendiriliyor...');
      setTimeout(() => {
        router.replace('/auth/login');
      }, 100);
    }
  }, [user]);

  return (
    <Stack screenOptions={{ animation: 'fade_from_bottom' }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
