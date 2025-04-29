import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Ders verileri
const lessons = [
  {
    id: '1',
    title: 'React Native Temelleri',
    description: 'React Native\'in temel kavramları ve yapısı',
    duration: '30 dakika',
    level: 'Başlangıç',
    progress: 1, // 0: başlanmadı, 0.5: devam ediyor, 1: tamamlandı
    topics: [
      'React Native Nedir?',
      'React Native vs Native Geliştirme',
      'Geliştirme Ortamının Kurulumu',
      'İlk Uygulamanızı Oluşturma',
      'Temel Komponentler'
    ],
    image: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: '2',
    title: 'Bileşenler ve Props',
    description: 'React Native bileşenleri ve özellikleri',
    duration: '25 dakika',
    level: 'Başlangıç',
    progress: 1,
    topics: [
      'Bileşen Kavramı',
      'Fonksiyonel ve Sınıf Bileşenleri',
      'Props ile Veri Aktarımı',
      'Özel Bileşenler Oluşturma',
      'Bileşen Yaşam Döngüsü'
    ],
    image: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: '3',
    title: 'State Yönetimi',
    description: 'React Native\'de durum yönetimi',
    duration: '35 dakika',
    level: 'Orta',
    progress: 0.5,
    topics: [
      'State Kavramı',
      'useState Hook\'u',
      'useEffect Hook\'u',
      'Context API',
      'Redux ile State Yönetimi'
    ],
    image: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: '4',
    title: 'Stil ve Tasarım',
    description: 'React Native uygulamalarında stil ve tasarım',
    duration: '40 dakika',
    level: 'Orta',
    progress: 0,
    topics: [
      'StyleSheet API',
      'Flexbox Layout',
      'Responsive Tasarım',
      'Tema Oluşturma',
      'UI Kütüphaneleri'
    ],
    image: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: '5',
    title: 'Navigasyon',
    description: 'React Native uygulamalarında ekranlar arası geçiş',
    duration: '30 dakika',
    level: 'İleri',
    progress: 0,
    topics: [
      'React Navigation',
      'Stack Navigator',
      'Tab Navigator',
      'Drawer Navigator',
      'Parametre Aktarımı'
    ],
    image: 'https://reactnative.dev/img/tiny_logo.png'
  },
];

export default function LessonListScreen() {
  const [filter, setFilter] = useState('all'); // 'all', 'beginner', 'intermediate', 'advanced'

  // Filtreleme fonksiyonu
  const getFilteredLessons = () => {
    if (filter === 'all') return lessons;

    const filterMap = {
      'beginner': 'Başlangıç',
      'intermediate': 'Orta',
      'advanced': 'İleri'
    };

    return lessons.filter(lesson => lesson.level === filterMap[filter]);
  };

  // İlerleme durumuna göre renk belirleme
  const getProgressColor = (progress) => {
    if (progress === 1) return '#4CAF50'; // tamamlandı
    if (progress > 0) return '#FF9800'; // devam ediyor
    return '#CCCCCC'; // başlanmadı
  };

  // İlerleme durumuna göre metin belirleme
  const getProgressText = (progress) => {
    if (progress === 1) return 'Tamamlandı';
    if (progress > 0) return 'Devam Ediyor';
    return 'Başlanmadı';
  };

  const filteredLessons = getFilteredLessons();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8F4F8', dark: '#1A3741' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="book.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">React Native Dersleri</ThemedText>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Etkileşimli derslerle React Native öğrenmeye başlayın. Adım adım ilerleyerek mobil uygulama geliştirme becerilerinizi geliştirin.
      </ThemedText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <ThemedText style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
            Tümü
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'beginner' && styles.activeFilter]}
          onPress={() => setFilter('beginner')}
        >
          <ThemedText style={[styles.filterText, filter === 'beginner' && styles.activeFilterText]}>
            Başlangıç
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'intermediate' && styles.activeFilter]}
          onPress={() => setFilter('intermediate')}
        >
          <ThemedText style={[styles.filterText, filter === 'intermediate' && styles.activeFilterText]}>
            Orta
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, filter === 'advanced' && styles.activeFilter]}
          onPress={() => setFilter('advanced')}
        >
          <ThemedText style={[styles.filterText, filter === 'advanced' && styles.activeFilterText]}>
            İleri
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.lessonsContainer}>
        {filteredLessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.lessonCard}
            onPress={() => {
              // Normalde burada ders detay sayfasına yönlendirme yapılır
              alert(`${lesson.title} dersini seçtiniz!`);
            }}
          >
            <View style={styles.lessonHeader}>
              <Image source={{ uri: lesson.image }} style={styles.lessonImage} />
              <View style={styles.lessonTitleContainer}>
                <ThemedText style={styles.lessonTitle}>{lesson.title}</ThemedText>
                <View style={styles.lessonMeta}>
                  <View style={styles.levelBadge}>
                    <ThemedText style={styles.levelText}>{lesson.level}</ThemedText>
                  </View>
                  <ThemedText style={styles.durationText}>{lesson.duration}</ThemedText>
                </View>
              </View>
            </View>

            <ThemedText style={styles.lessonDescription}>
              {lesson.description}
            </ThemedText>

            <View style={styles.topicsContainer}>
              <ThemedText style={styles.topicsTitle}>İçerik:</ThemedText>
              {lesson.topics.map((topic, index) => (
                <View key={index} style={styles.topicItem}>
                  <IconSymbol size={16} name="circle.fill" color="#0066cc" style={styles.topicIcon} />
                  <ThemedText style={styles.topicText}>{topic}</ThemedText>
                </View>
              ))}
            </View>

            <View style={styles.lessonFooter}>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${lesson.progress * 100}%`, backgroundColor: getProgressColor(lesson.progress) }
                  ]}
                />
              </View>
              <ThemedText style={[styles.progressText, { color: getProgressColor(lesson.progress) }]}>
                {getProgressText(lesson.progress)}
              </ThemedText>
            </View>

            <TouchableOpacity
              style={[
                styles.lessonButton,
                lesson.progress === 1 && styles.completedButton
              ]}
            >
              <ThemedText style={styles.lessonButtonText}>
                {lesson.progress === 0 ? 'Derse Başla' :
                 lesson.progress === 1 ? 'Tekrar Et' : 'Devam Et'}
              </ThemedText>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/')}
      >
        <ThemedText style={styles.buttonText}>Ana Sayfaya Dön</ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -50,
    right: -20,
    position: 'absolute',
    opacity: 0.3,
  },
  titleContainer: {
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 22,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: '#0066cc',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  lessonsContainer: {
    gap: 20,
    marginBottom: 20,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  lessonHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  lessonImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  lessonTitleContainer: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '500',
  },
  durationText: {
    fontSize: 12,
    opacity: 0.7,
  },
  lessonDescription: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
  },
  topicsContainer: {
    marginBottom: 16,
  },
  topicsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  topicIcon: {
    marginRight: 8,
    opacity: 0.7,
  },
  topicText: {
    fontSize: 14,
  },
  lessonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  lessonButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  lessonButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
