import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, TextInput, Switch, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function ProfileScreen() {
  // Kullanıcı bilgileri (gerçek uygulamada bir veritabanından gelir)
  const [user, setUser] = useState({
    name: 'Kullanıcı Adı',
    email: 'kullanici@example.com',
    avatar: 'https://reactnative.dev/img/tiny_logo.png',
    bio: 'React Native öğrenmeye çalışan bir geliştirici.',
    notificationsEnabled: true,
    darkModeEnabled: false,
    language: 'Türkçe',
  });

  // Form durumları
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedBio, setEditedBio] = useState(user.bio);

  // Düzenleme modunu aç/kapat
  const toggleEditMode = () => {
    if (isEditing) {
      // Değişiklikleri kaydet
      setUser({
        ...user,
        name: editedName,
        bio: editedBio,
      });

      Alert.alert(
        'Başarılı',
        'Profil bilgileriniz güncellendi.',
        [{ text: 'Tamam' }]
      );
    } else {
      // Düzenleme modunu aç
      setEditedName(user.name);
      setEditedBio(user.bio);
    }

    setIsEditing(!isEditing);
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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0F0F0', dark: '#2D2D2D' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="person.fill"
          style={styles.headerImage}
        />
      }>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editAvatarButton}>
          <IconSymbol size={20} name="camera.fill" color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.profileContainer}>
        {isEditing ? (
          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Ad Soyad</ThemedText>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Ad Soyad"
            />
          </View>
        ) : (
          <ThemedText type="title" style={styles.userName}>{user.name}</ThemedText>
        )}

        <ThemedText style={styles.userEmail}>{user.email}</ThemedText>

        {isEditing ? (
          <View style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Hakkımda</ThemedText>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={editedBio}
              onChangeText={setEditedBio}
              placeholder="Kendiniz hakkında kısa bir bilgi"
              multiline
              numberOfLines={3}
            />
          </View>
        ) : (
          <ThemedText style={styles.userBio}>{user.bio}</ThemedText>
        )}

        <TouchableOpacity
          style={[styles.editButton, isEditing && styles.saveButton]}
          onPress={toggleEditMode}
        >
          <IconSymbol
            size={20}
            name={isEditing ? "checkmark" : "pencil"}
            color="#FFFFFF"
          />
          <ThemedText style={styles.editButtonText}>
            {isEditing ? "Kaydet" : "Düzenle"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.settingsContainer}>
        <ThemedText type="subtitle" style={styles.settingsTitle}>Ayarlar</ThemedText>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <IconSymbol size={24} name="bell.fill" color="#0066cc" />
            <ThemedText style={styles.settingLabel}>Bildirimler</ThemedText>
          </View>
          <Switch
            value={user.notificationsEnabled}
            onValueChange={(value) => setUser({ ...user, notificationsEnabled: value })}
            trackColor={{ false: '#767577', true: '#0066cc' }}
            thumbColor="#f4f3f4"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <IconSymbol size={24} name="moon.fill" color="#0066cc" />
            <ThemedText style={styles.settingLabel}>Karanlık Mod</ThemedText>
          </View>
          <Switch
            value={user.darkModeEnabled}
            onValueChange={(value) => setUser({ ...user, darkModeEnabled: value })}
            trackColor={{ false: '#767577', true: '#0066cc' }}
            thumbColor="#f4f3f4"
          />
        </View>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <IconSymbol size={24} name="globe" color="#0066cc" />
            <ThemedText style={styles.settingLabel}>Dil</ThemedText>
          </View>
          <View style={styles.settingValue}>
            <ThemedText style={styles.settingValueText}>{user.language}</ThemedText>
            <IconSymbol size={16} name="chevron.right" color="#999" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <IconSymbol size={24} name="lock.fill" color="#0066cc" />
            <ThemedText style={styles.settingLabel}>Şifre Değiştir</ThemedText>
          </View>
          <IconSymbol size={16} name="chevron.right" color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <IconSymbol size={24} name="questionmark.circle.fill" color="#0066cc" />
            <ThemedText style={styles.settingLabel}>Yardım ve Destek</ThemedText>
          </View>
          <IconSymbol size={16} name="chevron.right" color="#999" />
        </TouchableOpacity>
      </ThemedView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <IconSymbol size={20} name="rectangle.portrait.and.arrow.right" color="#FFFFFF" />
        <ThemedText style={styles.logoutButtonText}>Çıkış Yap</ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.versionText}>Reactive v1.0.0</ThemedText>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#0066cc',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
    textAlign: 'center',
  },
  userBio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bioInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsTitle: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValueText: {
    fontSize: 16,
    opacity: 0.7,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 30,
  },
});
