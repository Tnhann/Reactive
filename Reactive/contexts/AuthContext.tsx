import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

// Kullanıcı tipi tanımı
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  bio?: string;
  notificationsEnabled?: boolean;
  darkModeEnabled?: boolean;
  language?: string;
};

// Context için tip tanımı
type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
};

// Context oluşturma
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context provider bileşeni
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Firebase kullanıcısından User tipine dönüştürme
  const formatUser = (firebaseUser: FirebaseUser): User => {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    };
  };

  // Kullanıcı verilerini Firestore'dan alma
  const getUserData = async (uid: string) => {
    try {
      console.log('Firestore\'dan kullanıcı verileri alınıyor:', uid);
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        console.log('Kullanıcı verileri bulundu:', userDoc.data());
        return userDoc.data() as Omit<User, 'uid' | 'email' | 'displayName' | 'photoURL'>;
      } else {
        console.log('Kullanıcı verileri bulunamadı, Firestore belgesi mevcut değil');
        return null;
      }
    } catch (error: any) {
      console.error('Kullanıcı verileri alınamadı:', error.message, error.code);
      // Firestore hatası olduğunda varsayılan değerler döndür
      return {
        bio: 'React Native öğrenmeye çalışan bir geliştirici.',
        notificationsEnabled: true,
        darkModeEnabled: true,
        language: 'Türkçe'
      };
    }
  };

  // Kullanıcı oturum durumunu izleme
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Kullanıcı oturum açmış
        const formattedUser = formatUser(firebaseUser);

        // Firestore'dan ek kullanıcı verilerini al
        const userData = await getUserData(firebaseUser.uid);

        // Kullanıcı verilerini birleştir
        setUser({
          ...formattedUser,
          ...userData
        });
      } else {
        // Kullanıcı oturum açmamış
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup fonksiyonu
    return () => unsubscribe();
  }, []);

  // Kayıt işlemi
  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      console.log('Kayıt işlemi başlatılıyor...');

      // Firebase Authentication ile kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Kullanıcı Authentication ile oluşturuldu:', userCredential.user.uid);

      // Kullanıcı profilini güncelle
      await updateProfile(userCredential.user, {
        displayName: name
      });
      console.log('Kullanıcı profili güncellendi');

      try {
        // Firestore'a kullanıcı verilerini kaydet
        const userData = {
          bio: `React Native öğrenmeye çalışan bir geliştirici.`,
          notificationsEnabled: true,
          darkModeEnabled: true,
          language: 'Türkçe',
          createdAt: new Date().toISOString()
        };

        console.log('Firestore\'a veri yazılıyor:', userCredential.user.uid);
        const userRef = doc(db, 'users', userCredential.user.uid);
        await setDoc(userRef, userData);
        console.log('Firestore\'a veri yazıldı');

        // Kullanıcı nesnesini güncelle
        const formattedUser = formatUser(userCredential.user);
        setUser({
          ...formattedUser,
          ...userData
        });
      } catch (firestoreError: any) {
        console.error('Firestore veri yazma hatası:', firestoreError);
        // Firestore hatası olsa bile Authentication başarılı olduğu için devam ediyoruz
        // Kullanıcı nesnesini sadece Authentication bilgileriyle güncelle
        const formattedUser = formatUser(userCredential.user);
        setUser(formattedUser);
      }

      return userCredential.user;
    } catch (error: any) {
      console.error('Kayıt hatası:', error.message, error.code);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Giriş işlemi
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('AuthContext: Giriş işlemi başlatılıyor...');

      // Firebase Authentication ile giriş yap
      console.log('AuthContext: Authentication ile giriş yapılıyor:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('AuthContext: Authentication ile giriş başarılı:', userCredential.user.uid);

      try {
        // Firestore'dan ek kullanıcı verilerini al
        const userData = await getUserData(userCredential.user.uid);

        // Kullanıcı verileri bulunamadıysa, varsayılan değerler oluştur ve Firestore'a kaydet
        if (!userData) {
          console.log('Kullanıcı verileri bulunamadı, varsayılan değerler oluşturuluyor...');
          const defaultUserData = {
            bio: `React Native öğrenmeye çalışan bir geliştirici.`,
            notificationsEnabled: true,
            darkModeEnabled: true,
            language: 'Türkçe',
            createdAt: new Date().toISOString()
          };

          try {
            // Firestore'a varsayılan kullanıcı verilerini kaydet
            console.log('Firestore\'a varsayılan veriler yazılıyor:', userCredential.user.uid);
            const userRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userRef, defaultUserData);
            console.log('Firestore\'a varsayılan veriler yazıldı');

            // Kullanıcı nesnesini güncelle
            const formattedUser = formatUser(userCredential.user);
            setUser({
              ...formattedUser,
              ...defaultUserData
            });
          } catch (writeError) {
            console.error('Varsayılan veri yazma hatası:', writeError);
            // Firestore hatası olsa bile Authentication başarılı olduğu için devam ediyoruz
            const formattedUser = formatUser(userCredential.user);
            setUser(formattedUser);
          }
        } else {
          // Kullanıcı verileri bulundu, kullanıcı nesnesini güncelle
          const formattedUser = formatUser(userCredential.user);
          setUser({
            ...formattedUser,
            ...userData
          });
        }
      } catch (firestoreError: any) {
        console.error('Firestore veri okuma hatası:', firestoreError);
        // Firestore hatası olsa bile Authentication başarılı olduğu için devam ediyoruz
        // Kullanıcı nesnesini sadece Authentication bilgileriyle güncelle
        const formattedUser = formatUser(userCredential.user);
        setUser(formattedUser);
      }
    } catch (error: any) {
      console.error('Giriş hatası:', error.message, error.code);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Çıkış işlemi
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Çıkış hatası:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı profilini güncelleme
  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return;

    try {
      setLoading(true);

      // Firebase Authentication profilini güncelle (sadece displayName ve photoURL)
      if (data.displayName || data.photoURL) {
        await updateProfile(auth.currentUser!, {
          displayName: data.displayName || user.displayName,
          photoURL: data.photoURL || user.photoURL
        });
      }

      // Firestore'daki kullanıcı verilerini güncelle
      const userRef = doc(db, 'users', user.uid);
      const updateData: Partial<User> = {};

      // Sadece değişen alanları güncelle
      if (data.bio !== undefined) updateData.bio = data.bio;
      if (data.notificationsEnabled !== undefined) updateData.notificationsEnabled = data.notificationsEnabled;
      if (data.darkModeEnabled !== undefined) updateData.darkModeEnabled = data.darkModeEnabled;
      if (data.language !== undefined) updateData.language = data.language;

      if (Object.keys(updateData).length > 0) {
        await setDoc(userRef, updateData, { merge: true });
      }

      // Kullanıcı nesnesini güncelle
      setUser(prev => prev ? { ...prev, ...data } : null);
    } catch (error: any) {
      console.error('Profil güncelleme hatası:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Context değerlerini sağla
  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
