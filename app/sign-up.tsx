import RegisterForm from '@/components/ui/RegisterForm';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function SignUpScreen() {

    return (
        <View style={styles.container}>
            <RegisterForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#080B30',
        padding: 20,
    },
    title: {
        color: '#90D5FF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        maxWidth: 300,
        backgroundColor: '#1F2349',
        color: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    error: {
        color: '#FF6B6B',
        marginBottom: 10,
    },
});
