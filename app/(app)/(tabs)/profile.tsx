import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = window.localStorage.getItem('user');
            if (stored) {
                setUser(JSON.parse(stored));
            }
        }
    }, []);

    useEffect(() => {
        if (user?.role === 'reporter') {
            router.replace('/reporter-dashboard');
        } else if (user?.role === 'user') {
            router.replace('/user-dashboard');
        }
    }, [user, router]);

    return (
        <View style={styles.container}>
            {!user && (
                <>
                    <Text style={[styles.buttonText, { marginBottom: 20 }]}>Please login to view your profile details.</Text>
                    <Link href="/sign-in" asChild>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/sign-up" asChild>
                        <TouchableOpacity>
                            <View style={styles.button}><Text style={styles.buttonText}>Sign Up</Text></View>
                        </TouchableOpacity>
                    </Link>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#080B30',
        gap: 20,
    },
    button: {
        backgroundColor: '#90D5FF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    buttonText: {
        color: '#080B30',
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
    },
});
