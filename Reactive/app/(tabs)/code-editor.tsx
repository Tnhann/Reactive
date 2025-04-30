import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const SAMPLE_CODE = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>
        Merhaba React Native!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});`;

export default function CodeEditorScreen() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [output, setOutput] = useState('Kodu çalıştırmak için "Çalıştır" butonuna basın.');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Kod çalıştırılıyor...');

    // Gerçek bir kod çalıştırma işlemi burada yapılabilir
    // Şimdilik sadece bir simülasyon yapıyoruz
    setTimeout(() => {
      setOutput('✅ Kod başarıyla çalıştırıldı!\n\nÇıktı:\nMerhaba React Native!');
      setIsRunning(false);
    }, 1500);
  };

  const resetCode = () => {
    setCode(SAMPLE_CODE);
    setOutput('Kod sıfırlandı. Çalıştırmak için "Çalıştır" butonuna basın.');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E0E0E0', dark: '#2D2D2D' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Kod Editörü</ThemedText>
      </ThemedView>

      <ThemedText style={styles.description}>
        Bu editörde React Native kodlarını yazabilir ve çalıştırabilirsiniz. Aşağıdaki örnek kodu düzenleyin veya kendi kodunuzu yazın.
      </ThemedText>

      <ThemedView style={styles.editorContainer}>
        <ThemedView style={styles.toolbar}>
          <ThemedText style={styles.toolbarTitle}>editor.js</ThemedText>
          <View style={styles.toolbarButtons}>
            <TouchableOpacity
              style={[styles.toolbarButton, isRunning && styles.disabledButton]}
              onPress={runCode}
              disabled={isRunning}
            >
              <IconSymbol size={18} name="play.fill" color="#fff" />
              <ThemedText style={styles.toolbarButtonText}>Çalıştır</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toolbarButton}
              onPress={resetCode}
            >
              <IconSymbol size={18} name="arrow.counterclockwise" color="#fff" />
              <ThemedText style={styles.toolbarButtonText}>Sıfırla</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        <ScrollView style={styles.codeContainer}>
          <TextInput
            style={styles.codeInput}
            value={code}
            onChangeText={setCode}
            multiline
            numberOfLines={20}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.outputContainer}>
        <ThemedText style={styles.outputTitle}>Konsol Çıktısı:</ThemedText>
        <ScrollView style={styles.outputContent}>
          <ThemedText style={styles.outputText}>{output}</ThemedText>
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.tipsContainer}>
        <ThemedText style={styles.tipsTitle}>İpuçları:</ThemedText>
        <ThemedText style={styles.tipText}>• Kod editöründe React Native komponentlerini deneyin</ThemedText>
        <ThemedText style={styles.tipText}>• Stil özelliklerini değiştirerek görünümü özelleştirin</ThemedText>
        <ThemedText style={styles.tipText}>• Yeni komponentler ekleyerek uygulamanızı genişletin</ThemedText>
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
  editorContainer: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#0066cc',
  },
  toolbarTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  toolbarButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  toolbarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066cc',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    gap: 6,
  },
  disabledButton: {
    opacity: 0.5,
  },
  toolbarButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  codeContainer: {
    maxHeight: 300,
  },
  codeInput: {
    fontFamily: 'SpaceMono',
    padding: 12,
    fontSize: 14,
    lineHeight: 20,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    color: '#FFFFFF', // Beyaz metin rengi
    minHeight: 300,
  },
  outputContainer: {
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  outputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  outputContent: {
    maxHeight: 150,
  },
  outputText: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
    lineHeight: 20,
  },
  tipsContainer: {
    marginBottom: 30,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipText: {
    marginBottom: 6,
    lineHeight: 20,
  },
});
