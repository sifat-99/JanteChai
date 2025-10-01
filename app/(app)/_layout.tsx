import FontAwesome from '@expo/vector-icons/FontAwesome';
import { usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Helper to set header title based on the active tab
const getHeaderTitle = (pathname: string) => {
    // The segments "(app)" and "(tabs)" are ignored in the pathname.
    if (pathname === '/categories') return 'Categories';
    if (pathname === '/saved') return 'Saved Articles';
    if (pathname === '/profile') return 'Profile';
    // The root of the (tabs) group is an empty path segment relative to the group, but the full path is '/'
    if (pathname === '/') return ' Home';
    return 'Home'; // Default for '/'
};

const DrawerLayout = () => {
    const pathname = usePathname();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={({ navigation }) => ({
                    headerShown: true,
                    drawerType: 'front',
                    drawerStyle: {
                        backgroundColor: '#080B30',
                        width: 250,
                    },
                    drawerActiveTintColor: '#90D5FF',
                    drawerInactiveTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#080B30',
                        shadowColor: 'transparent', // Hides the header shadow on iOS
                        elevation: 0, // Hides the header shadow on Android
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Inter_700Bold',
                    },
                    headerLeft: () => (
                        <FontAwesome name="bars" size={24} color="white" style={{ marginLeft: 15 }} onPress={navigation.toggleDrawer} />
                    ),
                })}
            >
                <Drawer.Screen name="(tabs)" options={{ title: getHeaderTitle(pathname), drawerIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} /> }} />
                <Drawer.Screen name="settings" options={{ title: "Settings", drawerIcon: ({ color, size }) => <FontAwesome name="cog" color={color} size={size} /> }} />
            </Drawer>
        </GestureHandlerRootView>
    );
};

export default DrawerLayout;
