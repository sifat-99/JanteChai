import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ReporterDashboard() {
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = window.localStorage.getItem('user');
            if (!stored) {
                router.replace('/sign-in');
                return;
            }
            try {
                const user = JSON.parse(stored);
                if (user.role !== 'reporter') {
                    router.replace('/user-dashboard');
                }
            } catch {
                router.replace('/sign-in');
            }
        }
    }, [router]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reporter Dashboard</Text>
            <Text style={styles.item}>My Profile</Text>
            <Text style={styles.item}>Submit News</Text>
            <Text style={styles.item}>My Articles</Text>
            <Text style={styles.item}>Settings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080B30',
        padding: 20,
    },
    title: {
        color: '#90D5FF',
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
        marginBottom: 20,
    },
    item: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        marginBottom: 16,
    },
});
