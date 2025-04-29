import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ThemedText';

export default function WelcomeScreen() {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    // Logo animasyonu
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // 2.5 saniye sonra giriş ekranına yönlendir
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.logo}
        />
        <ThemedText type="title" style={styles.appName}>
          Reactive
        </ThemedText>
        <ThemedText style={styles.tagline}>
          React Native Öğrenme Uygulaması
        </ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0066cc',
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
  },
});
