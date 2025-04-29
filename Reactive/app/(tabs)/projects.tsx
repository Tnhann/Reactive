import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Collapsible } from '@/components/Collapsible';

// Örnek projeler
const projects = [
  {
    id: '1',
    title: 'Basit Todo Uygulaması',
    description: 'Temel React Native kavramlarını kullanarak bir todo listesi uygulaması oluşturun.',
    level: 'Başlangıç',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    tags: ['useState', 'FlatList', 'TextInput'],
  },
  {
    id: '2',
    title: 'Hava Durumu Uygulaması',
    description: 'API kullanarak hava durumu verilerini çeken bir uygulama geliştirin.',
    level: 'Orta',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    tags: ['API', 'fetch', 'useEffect'],
  },
  {
    id: '3',
    title: 'Alışveriş Uygulaması',
    description: 'Ürünleri listeleyen ve sepete ekleyebilen bir e-ticaret uygulaması.',
    level: 'Orta',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    tags: ['Navigation', 'Context API', 'FlatList'],
  },
  {
    id: '4',
    title: 'Sosyal Medya Uygulaması',
    description: 'Kullanıcıların post paylaşabildiği ve etkileşimde bulunabildiği bir uygulama.',
    level: 'İleri',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    tags: ['Firebase', 'Authentication', 'Cloud Storage'],
  },
  {
    id: '5',
    title: 'Müzik Çalar Uygulaması',
    description: 'Cihazdan müzik dosyalarını çalabilen bir müzik uygulaması.',
    level: 'İleri',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    tags: ['Expo AV', 'AsyncStorage', 'Animations'],
  },
];

// Zorluk seviyesine göre renk belirleme
const getLevelColor = (level: string) => {
  switch (level) {
    case 'Başlangıç':
      return '#4CAF50';
    case 'Orta':
      return '#FF9800';
    case 'İleri':
      return '#F44336';
    default:
      return '#0066cc';
  }
};

export default function ProjectsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8F4F8', dark: '#1A3741' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="folder.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Örnek Projeler</ThemedText>
      </ThemedView>
      
      <ThemedText style={styles.description}>
        Aşağıdaki örnek projeleri inceleyerek React Native becerilerinizi geliştirebilirsiniz. 
        Her proje, farklı zorluk seviyelerine ve özelliklere sahiptir.
      </ThemedText>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <ThemedText style={styles.filterButtonText}>Tümü</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <ThemedText style={styles.filterButtonText}>Başlangıç</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <ThemedText style={styles.filterButtonText}>Orta</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <ThemedText style={styles.filterButtonText}>İleri</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.projectsContainer}>
        {projects.map((project) => (
          <TouchableOpacity key={project.id} style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <Image 
                source={{ uri: project.image }} 
                style={styles.projectImage} 
              />
              <View style={styles.projectTitleContainer}>
                <ThemedText style={styles.projectTitle}>{project.title}</ThemedText>
                <View 
                  style={[
                    styles.levelBadge, 
                    { backgroundColor: getLevelColor(project.level) }
                  ]}
                >
                  <ThemedText style={styles.levelText}>{project.level}</ThemedText>
                </View>
              </View>
            </View>
            
            <ThemedText style={styles.projectDescription}>
              {project.description}
            </ThemedText>
            
            <View style={styles.tagsContainer}>
              {project.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <ThemedText style={styles.tagText}>{tag}</ThemedText>
                </View>
              ))}
            </View>
            
            <TouchableOpacity style={styles.projectButton}>
              <ThemedText style={styles.projectButtonText}>Projeyi Görüntüle</ThemedText>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <ThemedView style={styles.infoContainer}>
        <Collapsible title="Projeleri Nasıl Kullanmalıyım?">
          <ThemedText style={styles.infoText}>
            Her proje, adım adım talimatlar ve başlangıç kodu içerir. Projeyi görüntüle butonuna tıklayarak detaylı bilgilere ulaşabilirsiniz.
          </ThemedText>
        </Collapsible>
        
        <Collapsible title="Kendi Projemi Nasıl Oluşturabilirim?">
          <ThemedText style={styles.infoText}>
            Örnek projeleri tamamladıktan sonra, öğrendiğiniz kavramları kullanarak kendi projelerinizi oluşturabilirsiniz. Kod editörü bölümünü kullanarak fikirlerinizi test edebilirsiniz.
          </ThemedText>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -50,
    right: -20,
    position: 'absolute',
    opacity: 0.3,
  },
  titleContainer: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 20,
    lineHeight: 22,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#0066cc',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  projectsContainer: {
    gap: 16,
    marginBottom: 20,
  },
  projectCard: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  projectHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  projectImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  projectTitleContainer: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectDescription: {
    marginBottom: 12,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
  },
  projectButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  projectButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginBottom: 30,
    gap: 12,
  },
  infoText: {
    lineHeight: 20,
  },
});
