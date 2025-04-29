// Firebase yapılandırması
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase yapılandırma bilgileri
// NOT: Bu bilgileri Firebase konsolundan almalısınız
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "reactive.firebaseapp.com",
  projectId: "reactive",
  storageBucket: "reactive.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firebase servislerini dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
