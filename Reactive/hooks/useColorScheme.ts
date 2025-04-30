import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { useEffect, useState } from 'react';

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');

  // Varsayılan olarak 'dark' temasını kullan
  useEffect(() => {
    setColorScheme('dark');
  }, []);

  return colorScheme;

  // Cihaz temasını kullanmak isterseniz, aşağıdaki satırı açıp yukarıdaki kodu yorum satırı yapabilirsiniz
  // return useDeviceColorScheme();
}
