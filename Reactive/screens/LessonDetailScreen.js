import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

// Sample lesson content based on lesson ID
const lessonContents = {
  '1': {
    title: 'React Native Temelleri',
    sections: [
      {
        title: 'React Native Nedir?',
        content: 'React Native, Facebook tarafından geliştirilen açık kaynaklı bir mobil uygulama geliştirme çerçevesidir. JavaScript ve React kullanarak iOS ve Android platformları için native mobil uygulamalar geliştirmenizi sağlar.'
      },
      {
        title: 'Neden React Native?',
        content: 'React Native ile tek bir kod tabanı kullanarak hem iOS hem de Android için uygulama geliştirebilirsiniz. Bu, geliştirme sürecini hızlandırır ve maliyetleri düşürür.'
      },
      {
        title: 'React Native\'in Çalışma Prensibi',
        content: 'React Native, JavaScript kodunuzu native bileşenlere dönüştürür. Bu sayede uygulamanız gerçek bir native uygulama gibi çalışır ve performans sunar.'
      }
    ]
  },
  '2': {
    title: 'Bileşenler ve Props',
    sections: [
      {
        title: 'React Native Bileşenleri',
        content: 'React Native\'de her şey bir bileşendir. Bileşenler, kullanıcı arayüzünün bağımsız ve yeniden kullanılabilir parçalarıdır.'
      },
      {
        title: 'Props Nedir?',
        content: 'Props (properties), React bileşenlerine veri aktarmanın bir yoludur. Bileşenler, props aracılığıyla aldıkları verilere göre render edilirler.'
      },
      {
        title: 'Temel Bileşenler',
        content: 'React Native, View, Text, Image gibi temel bileşenler sunar. Bu bileşenler, uygulamanızın kullanıcı arayüzünü oluşturmak için kullanılır.'
      }
    ]
  },
  '3': {
    title: 'State Yönetimi',
    sections: [
      {
        title: 'State Nedir?',
        content: 'State, bir bileşenin zaman içinde değişebilen verilerini temsil eder. Bir bileşenin state\'i değiştiğinde, bileşen yeniden render edilir.'
      },
      {
        title: 'useState Hook\'u',
        content: 'React Hooks ile birlikte gelen useState, fonksiyonel bileşenlerde state kullanmanızı sağlar. useState, bir state değişkeni ve bu değişkeni güncellemek için bir fonksiyon döndürür.'
      },
      {
        title: 'State vs Props',
        content: 'Props, bir bileşene dışarıdan aktarılan verilerdir ve bileşen içinde değiştirilemezler. State ise bileşenin kendi içinde yönettiği ve değiştirebileceği verilerdir.'
      }
    ]
  },
  '4': {
    title: 'Stil ve Tasarım',
    sections: [
      {
        title: 'StyleSheet API',
        content: 'React Native, CSS benzeri bir stil sistemi sunar. StyleSheet API, performans optimizasyonları sağlar ve stil tanımlarınızı organize etmenize yardımcı olur.'
      },
      {
        title: 'Flexbox Layout',
        content: 'React Native, bileşenleri düzenlemek için Flexbox layout sistemini kullanır. Flexbox, karmaşık düzenler oluşturmanızı kolaylaştırır.'
      },
      {
        title: 'Responsive Tasarım',
        content: 'React Native\'de Dimensions API kullanarak ekran boyutlarına göre responsive tasarımlar oluşturabilirsiniz.'
      }
    ]
  },
  '5': {
    title: 'Navigasyon',
    sections: [
      {
        title: 'React Navigation',
        content: 'React Navigation, React Native uygulamalarında ekranlar arası geçiş için en popüler kütüphanedir.'
      },
      {
        title: 'Stack Navigator',
        content: 'Stack Navigator, ekranları bir yığın (stack) olarak yönetir. Yeni bir ekrana gittiğinizde, bu ekran yığının üzerine eklenir.'
      },
      {
        title: 'Tab Navigator',
        content: 'Tab Navigator, alt sekmelere sahip bir navigasyon yapısı oluşturmanızı sağlar. Kullanıcılar, sekmeler arasında geçiş yaparak farklı ekranlara erişebilirler.'
      }
    ]
  }
};

export default function LessonDetailScreen({ route }) {
  const { id, title, description, duration } = route.params;
  const lessonContent = lessonContents[id] || { title: title, sections: [] };
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.description}>{description}</ThemedText>
          <ThemedText style={styles.duration}>Süre: {duration}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.content}>
          {lessonContent.sections.map((section, index) => (
            <ThemedView key={index} style={styles.section}>
              <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
              <ThemedText style={styles.sectionContent}>{section.content}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <ThemedText style={styles.buttonText}>Tamamlandı Olarak İşaretle</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    opacity: 0.6,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
    borderRadius: 8,
    padding: 16,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
