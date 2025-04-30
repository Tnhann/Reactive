// Firebase yapılandırması
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyCvTgt05OUOaeBenPBvrniFXeColgA7PkU",
  authDomain: "reactive-3695f.firebaseapp.com",
  projectId: "reactive-3695f",
  storageBucket: "reactive-3695f.appspot.com",
  messagingSenderId: "7645219320",
  appId: "1:7645219320:web:7fb9fef6ed70b42ca96e0d",
  measurementId: "G-5F8VZNX2Q0"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Firebase servislerini dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics'i sadece desteklenen ortamlarda başlat
let analytics = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(error => {
  console.log('Analytics desteklenmiyor:', error);
});
export { analytics };

export default app;
