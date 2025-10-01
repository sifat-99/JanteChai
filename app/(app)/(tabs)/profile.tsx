import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
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
