import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

// İlerleme verileri (gerçek bir uygulamada bu veriler bir veritabanından gelir)
const progressData = {
  completedLessons: 3,
  totalLessons: 5,
  completedProjects: 1,
  totalProjects: 5,
  lastActivity: '2 saat önce',
  streak: 3, // Günlük çalışma serisi
  totalTimeSpent: '5 saat 30 dakika',
  badges: [
    { id: '1', name: 'Başlangıç', icon: 'star.fill', earned: true },
    { id: '2', name: 'Kod Ustası', icon: 'keyboard', earned: false },
    { id: '3', name: '3 Gün Serisi', icon: 'flame.fill', earned: true },
    { id: '4', name: 'Proje Tamamlayıcı', icon: 'checkmark.seal.fill', earned: true },
    { id: '5', name: 'React Guru', icon: 'atom', earned: false },
  ],
  recentActivities: [
    { id: '1', type: 'lesson', name: 'React Native Temelleri', date: '2 saat önce' },
    { id: '2', type: 'project', name: 'Todo Uygulaması', date: 'Dün' },
    { id: '3', type: 'lesson', name: 'Bileşenler ve Props', date: '2 gün önce' },
  ],
};

// İlerleme çubuğu komponenti
const ProgressBar = ({ progress, color = '#0066cc' }) => {
  return (
    <View style={styles.progressBarContainer}>
      <View
        style={[
          styles.progressBar,
          { width: `${progress * 100}%`, backgroundColor: color }
        ]}
      />
    </View>
  );
};

export default function DashboardScreen() {
  const lessonProgress = progressData.completedLessons / progressData.totalLessons;
  const projectProgress = progressData.completedProjects / progressData.totalProjects;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F5F5F5', dark: '#2D2D2D' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="chart.bar.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">İlerleme Takibi</ThemedText>
      </ThemedView>

      <ThemedView style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <IconSymbol size={24} name="book.fill" color="#0066cc" />
            <ThemedText style={styles.summaryValue}>{progressData.completedLessons}/{progressData.totalLessons}</ThemedText>
            <ThemedText style={styles.summaryLabel}>Tamamlanan Dersler</ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <IconSymbol size={24} name="folder.fill" color="#0066cc" />
            <ThemedText style={styles.summaryValue}>{progressData.completedProjects}/{progressData.totalProjects}</ThemedText>
            <ThemedText style={styles.summaryLabel}>Tamamlanan Projeler</ThemedText>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <IconSymbol size={24} name="flame.fill" color="#FF9500" />
            <ThemedText style={styles.summaryValue}>{progressData.streak} Gün</ThemedText>
            <ThemedText style={styles.summaryLabel}>Çalışma Serisi</ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <IconSymbol size={24} name="clock.fill" color="#0066cc" />
            <ThemedText style={styles.summaryValue}>{progressData.totalTimeSpent}</ThemedText>
            <ThemedText style={styles.summaryLabel}>Toplam Süre</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.progressSection}>
        <ThemedText style={styles.sectionTitle}>Genel İlerleme</ThemedText>

        <View style={styles.progressItem}>
          <View style={styles.progressHeader}>
            <ThemedText style={styles.progressLabel}>Dersler</ThemedText>
            <ThemedText style={styles.progressValue}>{Math.round(lessonProgress * 100)}%</ThemedText>
          </View>
          <ProgressBar progress={lessonProgress} color="#0066cc" />
        </View>

        <View style={styles.progressItem}>
          <View style={styles.progressHeader}>
            <ThemedText style={styles.progressLabel}>Projeler</ThemedText>
            <ThemedText style={styles.progressValue}>{Math.round(projectProgress * 100)}%</ThemedText>
          </View>
          <ProgressBar progress={projectProgress} color="#FF9500" />
        </View>
      </ThemedView>

      <ThemedView style={styles.badgesSection}>
        <ThemedText style={styles.sectionTitle}>Rozetler</ThemedText>

        <View style={styles.badgesContainer}>
          {progressData.badges.map((badge) => (
            <View
              key={badge.id}
              style={[
                styles.badgeItem,
                !badge.earned && styles.badgeItemLocked
              ]}
            >
              <IconSymbol
                size={32}
                name={badge.icon}
                color={badge.earned ? '#0066cc' : '#CCCCCC'}
              />
              <ThemedText
                style={[
                  styles.badgeName,
                  !badge.earned && styles.badgeNameLocked
                ]}
              >
                {badge.name}
              </ThemedText>
              {!badge.earned && (
                <View style={styles.badgeLock}>
                  <IconSymbol size={16} name="lock.fill" color="#FFFFFF" />
                </View>
              )}
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.activitiesSection}>
        <ThemedText style={styles.sectionTitle}>Son Aktiviteler</ThemedText>

        {progressData.recentActivities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <IconSymbol
                size={20}
                name={activity.type === 'lesson' ? 'book.fill' : 'folder.fill'}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityName}>{activity.name}</ThemedText>
              <ThemedText style={styles.activityDate}>{activity.date}</ThemedText>
            </View>
          </View>
        ))}
      </ThemedView>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol size={20} name="arrow.clockwise" color="#FFFFFF" />
          <ThemedText style={styles.actionButtonText}>Günlük Hedefler</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol size={20} name="person.fill" color="#FFFFFF" />
          <ThemedText style={styles.actionButtonText}>Profil Ayarları</ThemedText>
        </TouchableOpacity>
      </View>
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
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
    width: '48%',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  progressSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  badgesSection: {
    marginBottom: 24,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  badgeItemLocked: {
    opacity: 0.7,
  },
  badgeName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  badgeNameLocked: {
    color: '#999',
  },
  badgeLock: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#999',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activitiesSection: {
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0066cc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '48%',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
