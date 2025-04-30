import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const { register } = useAuth();

  const validateName = (name: string) => {
    if (!name) {
      setNameError('Ad Soyad gerekli');
      return false;
    } else if (name.length < 3) {
      setNameError('Ad Soyad en az 3 karakter olmalıdır');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('E-posta adresi gerekli');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Geçerli bir e-posta adresi girin');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Şifre gerekli');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Şifre en az 6 karakter olmalıdır');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setConfirmPasswordError('Şifre tekrarı gerekli');
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Şifreler eşleşmiyor');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleRegister = async () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('Kayıt işlemi başlatılıyor...');
      // Firebase Authentication ile kayıt ol
      await register(email, password, name);
      console.log('Kayıt işlemi başarılı');

      // Başarılı kayıt
      Alert.alert(
        'Kayıt Başarılı',
        'Hesabınız başarıyla oluşturuldu. Şimdi giriş yapabilirsiniz.',
        [
          {
            text: 'Giriş Yap',
            onPress: () => router.replace('/auth/login')
          }
        ]
      );
    } catch (error: any) {
      console.error('Kayıt hatası:', error);

      // Hata mesajını kullanıcıya göster
      let errorMessage = 'Kayıt yapılırken bir hata oluştu. Lütfen tekrar deneyin.';
      let errorDetails = error.message || '';

      // Firebase hata kodlarına göre özelleştirilmiş mesajlar
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Bu e-posta adresi zaten kullanılıyor.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Şifre çok zayıf. Daha güçlü bir şifre seçin.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'E-posta/şifre girişi etkinleştirilmemiş. Firebase konsolundan etkinleştirin.';
      } else if (error.code === 'auth/internal-error') {
        errorMessage = 'Firebase servisinde bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
      } else if (error.code === 'firestore/permission-denied') {
        errorMessage = 'Firestore veritabanına erişim izni yok. Güvenlik kurallarını kontrol edin.';
      }

      // Hata detaylarını ekle
      const fullErrorMessage = errorDetails ? `${errorMessage}\n\nHata detayı: ${errorDetails}` : errorMessage;

      Alert.alert('Kayıt Başarısız', fullErrorMessage, [{ text: 'Tamam' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            style={styles.logo}
          />
          <ThemedText type="title" style={styles.appName}>Reactive</ThemedText>
          <ThemedText style={styles.tagline}>React Native Öğrenme Uygulaması</ThemedText>
        </View>

        <ThemedView style={styles.formContainer}>
          <ThemedText type="subtitle" style={styles.formTitle}>Hesap Oluştur</ThemedText>

          <View style={styles.inputContainer}>
            <IconSymbol size={20} name="person.fill" color="#0066cc" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={name}
              onChangeText={setName}
              onBlur={() => validateName(name)}
            />
          </View>
          {nameError ? <ThemedText style={styles.errorText}>{nameError}</ThemedText> : null}

          <View style={styles.inputContainer}>
            <IconSymbol size={20} name="envelope.fill" color="#0066cc" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-posta Adresi"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              onBlur={() => validateEmail(email)}
            />
          </View>
          {emailError ? <ThemedText style={styles.errorText}>{emailError}</ThemedText> : null}

          <View style={styles.inputContainer}>
            <IconSymbol size={20} name="lock.fill" color="#0066cc" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Şifre"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onBlur={() => validatePassword(password)}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <IconSymbol
                size={20}
                name={showPassword ? "eye.slash.fill" : "eye.fill"}
                color="#0066cc"
              />
            </TouchableOpacity>
          </View>
          {passwordError ? <ThemedText style={styles.errorText}>{passwordError}</ThemedText> : null}

          <View style={styles.inputContainer}>
            <IconSymbol size={20} name="lock.fill" color="#0066cc" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Şifre Tekrarı"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              onBlur={() => validateConfirmPassword(confirmPassword)}
            />
          </View>
          {confirmPasswordError ? <ThemedText style={styles.errorText}>{confirmPasswordError}</ThemedText> : null}

          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ThemedText style={styles.registerButtonText}>Kayıt Yapılıyor...</ThemedText>
            ) : (
              <ThemedText style={styles.registerButtonText}>Kayıt Ol</ThemedText>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <ThemedText>Zaten hesabınız var mı? </ThemedText>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <ThemedText style={styles.loginLink}>Giriş Yap</ThemedText>
              </TouchableOpacity>
            </Link>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 16,
    borderRadius: 16,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    borderRadius: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0066cc',
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
  },
  formContainer: {
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 8,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginBottom: 8,
    marginTop: -8,
  },
  registerButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  registerButtonDisabled: {
    backgroundColor: '#0066cc80',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLink: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});
