import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const TabBarIcon = ({ name, color }: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) => {
    return (
        <View style={styles.tabIconContainer}>
            <FontAwesome size={24} name={name} color={color} />
        </View>
    );
};

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // Handled by Drawer layout
                tabBarStyle: {
                    backgroundColor: '#080B30',
                    height: 80,
                    borderTopWidth: 1,
                    borderTopColor: '#1F2349',
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: '#90D5FF',
                tabBarInactiveTintColor: '#fff',
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: ' Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: 'Categories',
                    tabBarIcon: ({ color }) => <TabBarIcon name="th-large" color={color} />,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    tabBarIcon: ({ color }) => <TabBarIcon name="bookmark" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;

const styles = StyleSheet.create({
    tabIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 5,
    },
});
