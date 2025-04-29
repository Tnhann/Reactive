import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Switch, Image } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Collapsible } from '@/components/Collapsible';

// Komponent kategorileri
const categories = [
  { id: 'basic', name: 'Temel Komponentler' },
  { id: 'layout', name: 'Düzen Komponentleri' },
  { id: 'input', name: 'Giriş Komponentleri' },
  { id: 'list', name: 'Liste Komponentleri' },
  { id: 'navigation', name: 'Navigasyon Komponentleri' },
];

// Örnek komponentler
const components = [
  {
    id: 'view',
    name: 'View',
    category: 'basic',
    description: 'Diğer komponentleri içeren bir konteyner. Flexbox, stil ve dokunma işleme özellikleri sunar.',
    code: `<View style={{ flex: 1, backgroundColor: 'dodgerblue', padding: 20 }}>
  <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
    <Text>İç içe View örneği</Text>
  </View>
</View>`,
  },
  {
    id: 'text',
    name: 'Text',
    category: 'basic',
    description: 'Metin görüntülemek için kullanılan komponent. İç içe Text komponentleri kullanılabilir.',
    code: `<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
  Ana metin
  <Text style={{ color: 'red' }}> ve renkli alt metin</Text>
</Text>`,
  },
  {
    id: 'image',
    name: 'Image',
    category: 'basic',
    description: 'Çeşitli kaynaklardan görüntüleri göstermek için kullanılır.',
    code: `<Image
  source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
  style={{ width: 100, height: 100 }}
/>`,
  },
  {
    id: 'scrollview',
    name: 'ScrollView',
    category: 'layout',
    description: 'İçeriği kaydırılabilir bir konteyner içinde gösterir.',
    code: `<ScrollView style={{ flex: 1 }}>
  <Text style={{ fontSize: 20 }}>Kaydırılabilir içerik</Text>
  {/* Daha fazla içerik */}
</ScrollView>`,
  },
  {
    id: 'flatlist',
    name: 'FlatList',
    category: 'list',
    description: 'Büyük veri listeleri için performans odaklı bir liste komponenti.',
    code: `<FlatList
  data={[
    { key: '1', text: 'Öğe 1' },
    { key: '2', text: 'Öğe 2' },
  ]}
  renderItem={({ item }) => <Text>{item.text}</Text>}
/>`,
  },
  {
    id: 'textinput',
    name: 'TextInput',
    category: 'input',
    description: 'Kullanıcıdan metin girişi almak için kullanılır.',
    code: `<TextInput
  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
  onChangeText={text => setText(text)}
  value={text}
  placeholder="Metin girin"
/>`,
  },
  {
    id: 'button',
    name: 'Button',
    category: 'input',
    description: 'Basit bir buton komponenti.',
    code: `<Button
  title="Bana Tıkla"
  onPress={() => alert('Butona tıklandı!')}
/>`,
  },
  {
    id: 'touchableopacity',
    name: 'TouchableOpacity',
    category: 'input',
    description: 'Tıklandığında opaklık animasyonu olan dokunulabilir komponent.',
    code: `<TouchableOpacity
  style={{ backgroundColor: 'blue', padding: 10 }}
  onPress={() => alert('Tıklandı!')}
>
  <Text style={{ color: 'white' }}>Bana Tıkla</Text>
</TouchableOpacity>`,
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'input',
    description: 'Boolean değeri değiştirmek için kullanılan toggle komponenti.',
    code: `<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
/>`,
  },
];

export default function ComponentsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('basic');
  const [isEnabled, setIsEnabled] = useState(false);

  const filteredComponents = components.filter(
    (component) => component.category === selectedCategory
  );

  // Örnek bir komponenti render etme
  const renderComponentExample = (componentId: string) => {
    switch (componentId) {
      case 'view':
        return (
          <View style={{ backgroundColor: 'dodgerblue', padding: 20, borderRadius: 8 }}>
            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
              <ThemedText>İç içe View örneği</ThemedText>
            </View>
          </View>
        );
      case 'text':
        return (
          <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>
            Ana metin
            <ThemedText style={{ color: 'red' }}> ve renkli alt metin</ThemedText>
          </ThemedText>
        );
      case 'image':
        return (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        );
      case 'scrollview':
        return (
          <ScrollView style={{ height: 100, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 8 }}>
            <ThemedText style={{ padding: 10 }}>Bu bir ScrollView örneğidir. İçerik ekran sığmadığında kaydırılabilir.</ThemedText>
            <View style={{ height: 200, backgroundColor: 'rgba(0,102,204,0.1)', margin: 10, borderRadius: 8 }} />
          </ScrollView>
        );
      case 'switch':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <ThemedText>Durum: {isEnabled ? 'Açık' : 'Kapalı'}</ThemedText>
            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
            />
          </View>
        );
      default:
        return <ThemedText>Bu komponentin canlı örneği mevcut değil.</ThemedText>;
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0F8FF', dark: '#1A2C38' }}
      headerImage={
        <IconSymbol
          size={200}
          color="#808080"
          name="square.grid.2x2.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Komponent Kütüphanesi</ThemedText>
      </ThemedView>

      <ThemedText style={styles.description}>
        React Native'in temel komponentlerini keşfedin. Her komponentin açıklaması, örnek kodu ve canlı demosu bulunmaktadır.
      </ThemedText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <ThemedText
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.componentsContainer}>
        {filteredComponents.map((component) => (
          <Collapsible
            key={component.id}
            title={component.name}
            initiallyExpanded={component.id === filteredComponents[0].id}
          >
            <ThemedText style={styles.componentDescription}>
              {component.description}
            </ThemedText>

            <ThemedView style={styles.exampleContainer}>
              <ThemedText style={styles.exampleTitle}>Canlı Örnek:</ThemedText>
              <View style={styles.liveExample}>
                {renderComponentExample(component.id)}
              </View>
            </ThemedView>

            <ThemedView style={styles.codeContainer}>
              <ThemedText style={styles.codeTitle}>Örnek Kod:</ThemedText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <ThemedText style={styles.codeText}>{component.code}</ThemedText>
              </ScrollView>
            </ThemedView>
          </Collapsible>
        ))}
      </View>

      <ThemedView style={styles.infoContainer}>
        <ThemedText style={styles.infoTitle}>Komponentler Hakkında</ThemedText>
        <ThemedText style={styles.infoText}>
          React Native, mobil uygulamalar geliştirmek için çeşitli yerleşik komponentler sunar.
          Bu komponentleri kullanarak iOS ve Android platformları için native görünümlü uygulamalar oluşturabilirsiniz.
        </ThemedText>
        <ThemedText style={styles.infoText}>
          Daha fazla komponent ve detaylı bilgi için React Native resmi dokümantasyonunu ziyaret edebilirsiniz.
        </ThemedText>
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
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#0066cc',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  componentsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  componentDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  exampleContainer: {
    marginBottom: 16,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  liveExample: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  codeContainer: {
    marginBottom: 16,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  codeText: {
    fontFamily: 'SpaceMono',
    fontSize: 14,
    lineHeight: 20,
    padding: 12,
    backgroundColor: '#F0F0F0',
    color: '#333333',
    borderRadius: 8,
  },
  infoContainer: {
    marginBottom: 30,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoText: {
    marginBottom: 8,
    lineHeight: 20,
  },
});
