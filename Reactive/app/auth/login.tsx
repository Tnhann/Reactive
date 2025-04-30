import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';

// Demo kullanıcı (kolay giriş için)
const DEMO_USER = { email: 'demo@example.com', password: 'password123' };

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();

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

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('Login sayfası: Giriş işlemi başlatılıyor...');
      // Firebase Authentication ile giriş yap
      await login(email, password);
      console.log('Login sayfası: Giriş başarılı, yönlendiriliyor...');

      // Başarılı giriş - setTimeout ile yönlendirmeyi geciktir
      setTimeout(() => {
        console.log('Login sayfası: Yönlendirme yapılıyor...');
        router.replace('/(tabs)');
      }, 500);
    } catch (error: any) {
      console.error('Login sayfası: Giriş hatası:', error);

      // Hata mesajını kullanıcıya göster
      let errorMessage = 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.';
      let errorDetails = error.message || '';

      // Firebase hata kodlarına göre özelleştirilmiş mesajlar
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Geçersiz kimlik bilgileri. Lütfen e-posta ve şifrenizi kontrol edin.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz e-posta adresi formatı.';
      }

      // Hata detaylarını ekle
      const fullErrorMessage = errorDetails ? `${errorMessage}\n\nHata detayı: ${errorDetails}` : errorMessage;

      Alert.alert('Giriş Başarısız', fullErrorMessage, [{ text: 'Tamam' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail(DEMO_USER.email);
    setPassword(DEMO_USER.password);
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
          <ThemedText type="subtitle" style={styles.formTitle}>Giriş Yap</ThemedText>

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

          <TouchableOpacity style={styles.forgotPassword}>
            <ThemedText style={styles.forgotPasswordText}>Şifremi Unuttum</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ThemedText style={styles.loginButtonText}>Giriş Yapılıyor...</ThemedText>
            ) : (
              <ThemedText style={styles.loginButtonText}>Giriş Yap</ThemedText>
            )}
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <ThemedText style={styles.orText}>veya</ThemedText>
            <View style={styles.orLine} />
          </View>

          <TouchableOpacity style={styles.demoButton} onPress={handleDemoLogin}>
            <IconSymbol size={20} name="person.fill" color="#FFFFFF" />
            <ThemedText style={styles.demoButtonText}>Demo Hesabı ile Giriş</ThemedText>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <ThemedText>Hesabınız yok mu? </ThemedText>
            <Link href="/auth/register" asChild>
              <TouchableOpacity>
                <ThemedText style={styles.registerLink}>Kayıt Ol</ThemedText>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#0066cc',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    backgroundColor: '#0066cc80',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    opacity: 0.5,
  },
  demoButton: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  demoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerLink: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});
