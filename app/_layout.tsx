import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
<<<<<<< Updated upstream
import { SQLiteProvider } from 'expo-sqlite';
=======
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
>>>>>>> Stashed changes
import { initDb } from './database/initDb';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
<<<<<<< Updated upstream
    <SQLiteProvider databaseName="InitDb.db" onInit={initDb}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
=======
    <SQLiteProvider databaseName='data.db' onInit={initDb}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
>>>>>>> Stashed changes
      <Stack>
        <Stack.Screen name="index"/>
        <Stack.Screen name="cadastro"/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
    </SQLiteProvider>
<<<<<<< Updated upstream
    
=======
>>>>>>> Stashed changes
  );
}

