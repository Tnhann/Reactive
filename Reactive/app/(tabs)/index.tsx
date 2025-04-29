import { Image, StyleSheet, TouchableOpacity, View, Animated, Alert } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRef, useEffect } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const navigateTo = (route: string) => {
    router.push(route);
  };

  // Animasyon değerleri
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Kullanıcı bilgileri (gerçek uygulamada bir veritabanından gelir)
  const user = {
    name: 'Kullanıcı',
    completedLessons: 3,
    totalLessons: 5,
    lastActivity: '2 saat önce',
  };

  // Çıkış işlemi
  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: () => router.replace('/auth/login')
        }
      ]
    );
  };

  useEffect(() => {
    // Giriş animasyonu
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      {/* Üst Bilgi Alanı */}
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.welcomeText}>Hoş Geldin,</ThemedText>
          <ThemedText style={styles.userName}>{user.name}</ThemedText>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <IconSymbol size={24} name="rectangle.portrait.and.arrow.right" color="#0066cc" />
        </TouchableOpacity>
      </View>

      {/* İlerleme Özeti */}
      <ThemedView style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <ThemedText style={styles.progressTitle}>İlerleme Durumu</ThemedText>
          <TouchableOpacity onPress={() => navigateTo('/dashboard')}>
            <ThemedText style={styles.viewAllText}>Tümünü Gör</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.progressInfo}>
          <View style={styles.progressItem}>
            <IconSymbol size={24} name="book.fill" color="#0066cc" />
            <ThemedText style={styles.progressValue}>{user.completedLessons}/{user.totalLessons}</ThemedText>
            <ThemedText style={styles.progressLabel}>Dersler</ThemedText>
          </View>

          <View style={styles.progressDivider} />

          <View style={styles.progressItem}>
            <IconSymbol size={24} name="clock.fill" color="#0066cc" />
            <ThemedText style={styles.progressValue}>{user.lastActivity}</ThemedText>
            <ThemedText style={styles.progressLabel}>Son Aktivite</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Ana Başlık */}
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ],
          }
        ]}
      >
        <ThemedText type="title" style={styles.title}>Reactive</ThemedText>
        <ThemedText style={styles.subtitle}>
          React Native Öğrenme Uygulaması
        </ThemedText>
        <ThemedText style={styles.description}>
          Bu uygulama ile React Native öğrenmeye başlayın ve mobil uygulama geliştirme becerilerinizi geliştirin.
        </ThemedText>
      </Animated.View>

      {/* Özellikler */}
      <ThemedView style={styles.featuresContainer}>
        <ThemedText type="subtitle" style={styles.featuresTitle}>Özellikler</ThemedText>

        <View style={styles.featureGrid}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigateTo('/explore')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 102, 204, 0.15)' }]}>
              <IconSymbol size={36} name="book.fill" color="#0066cc" />
            </View>
            <ThemedText style={styles.featureTitle}>Etkileşimli Dersler</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigateTo('/code-editor')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 102, 204, 0.15)' }]}>
              <IconSymbol size={36} name="chevron.left.forwardslash.chevron.right" color="#0066cc" />
            </View>
            <ThemedText style={styles.featureTitle}>Kod Editörü</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigateTo('/dashboard')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 102, 204, 0.15)' }]}>
              <IconSymbol size={36} name="chart.bar.fill" color="#0066cc" />
            </View>
            <ThemedText style={styles.featureTitle}>İlerleme</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.featureGrid}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigateTo('/projects')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 102, 204, 0.15)' }]}>
              <IconSymbol size={36} name="folder.fill" color="#0066cc" />
            </View>
            <ThemedText style={styles.featureTitle}>Projeler</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigateTo('/components')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 102, 204, 0.15)' }]}>
              <IconSymbol size={36} name="square.grid.2x2.fill" color="#0066cc" />
            </View>
            <ThemedText style={styles.featureTitle}>Komponentler</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigateTo('/profile')}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 102, 204, 0.15)' }]}>
              <IconSymbol size={36} name="person.fill" color="#0066cc" />
            </View>
            <ThemedText style={styles.featureTitle}>Profil</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Devam Et Butonu */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigateTo('/explore')}
      >
        <ThemedText style={styles.continueButtonText}>Öğrenmeye Devam Et</ThemedText>
        <IconSymbol size={20} name="arrow.right" color="#FFFFFF" />
      </TouchableOpacity>

      {/* Başlangıç Butonu */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo('/explore')}
      >
        <ThemedText style={styles.buttonText}>Hemen Başla</ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 14,
    opacity: 0.7,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
  },

  // Progress card styles
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    color: '#0066cc',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  progressDivider: {
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  // Title section styles
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0066cc',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
  },

  // Logo styles
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  // Features section styles
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 20,
    color: '#333333',
  },
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  featureDescription: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666666',
    lineHeight: 16,
  },

  // Button styles
  continueButton: {
    flexDirection: 'row',
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#333333',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
