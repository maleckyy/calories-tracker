import { blackColor, mainColor, whiteColor } from '@/consts/colors/colors';
import { initDB } from '@/db/actions/meals/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';

export default function TabLayout() {
    useEffect(() => {
        initDB()
    }, [])

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: mainColor,
                headerStyle: {
                    backgroundColor: blackColor,
                },
                headerShadowVisible: false,
                headerTintColor: whiteColor,
                tabBarStyle: {
                    backgroundColor: blackColor,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="addMeal"
                options={{
                    title: 'Add Meal',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'fast-food' : 'fast-food-outline'} color={color} size={24} />
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
                    ),
                    headerShown: false
                }}
            />
        </Tabs>
    );
}
