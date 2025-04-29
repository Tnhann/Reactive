import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Reactive</Text>
      <Text style={styles.subtitle}>React Native Öğrenme Uygulaması</Text>
      
      <Image 
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.logo}
      />
      
      <Text style={styles.description}>
        Bu uygulama ile React Native öğrenmeye başlayın ve mobil uygulama geliştirme becerilerinizi geliştirin.
      </Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('LessonList')}
      >
        <Text style={styles.buttonText}>Derslere Başla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0066cc',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#444',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#555',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
