import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

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
      <View style={styles.lessonContent}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonDescription}>{item.description}</Text>
        <Text style={styles.lessonDuration}>Süre: {item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native Dersleri</Text>
      <FlatList
        data={lessons}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#fff',
    color: '#0066cc',
  },
  listContainer: {
    padding: 16,
  },
  lessonItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
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
    color: '#0066cc',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  lessonDuration: {
    fontSize: 12,
    color: '#888',
  },
});
