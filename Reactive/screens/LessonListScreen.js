import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

// Sample lesson data
const lessons = [
  {
    id: '1',
    title: 'React Native Temelleri',
    description: 'React Native\'in temel kavramları ve yapısı',
    duration: '30 dakika',
  },
  {
    id: '2',
    title: 'Bileşenler ve Props',
    description: 'React Native bileşenleri ve özellikleri',
    duration: '25 dakika',
  },
  {
    id: '3',
    title: 'State Yönetimi',
    description: 'React Native\'de durum yönetimi',
    duration: '35 dakika',
  },
  {
    id: '4',
    title: 'Stil ve Tasarım',
    description: 'React Native uygulamalarında stil ve tasarım',
    duration: '40 dakika',
  },
  {
    id: '5',
    title: 'Navigasyon',
    description: 'React Native uygulamalarında ekranlar arası geçiş',
    duration: '30 dakika',
  },
];

export default function LessonListScreen({ navigation }) {
  const colorScheme = useColorScheme();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => navigation.navigate('LessonDetail', {
        id: item.id,
        title: item.title,
        description: item.description,
        duration: item.duration
      })}
    >
      <ThemedView style={styles.lessonContent}>
        <ThemedText style={styles.lessonTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.lessonDescription}>{item.description}</ThemedText>
        <ThemedText style={styles.lessonDuration}>Süre: {item.duration}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>React Native Dersleri</ThemedText>
      <FlatList
        data={lessons}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
  },
  listContainer: {
    padding: 16,
  },
  lessonItem: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  lessonContent: {
    padding: 16,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  lessonDuration: {
    fontSize: 12,
    opacity: 0.6,
  },
});
