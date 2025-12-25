import AppLoading from "@/components/shared/AppLoading";
import { clearOldHydration } from "@/db/actions/hydration/clearOldHydration";
import { clearOldMeals } from "@/db/actions/meals/clearOldMeals";
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDB } from "../db/database";
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Onest-100': require('../assets/fonts/Onest-Thin.ttf'),
    'Onest-400': require('../assets/fonts/Onest-Medium.ttf'),
    'Onest-900': require('../assets/fonts/Onest-Bold.ttf'),
  })

  useEffect(() => {
    initDB()
    clearOldMeals()
    clearOldHydration()
  }, [])

  if (!fontsLoaded) return <AppLoading />
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit-meal"
        options={{
          presentation: 'modal',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="edit-user-data"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="all-meals"
        options={{
          presentation: 'modal',
          headerShown: false
        }}
      />
    </Stack>
  )
}
