import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.duration}>Süre: {duration}</Text>
      </View>

      <View style={styles.content}>
        {lessonContent.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tamamlandı Olarak İşaretle</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    color: '#888',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
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
