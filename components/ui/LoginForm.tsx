import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginForm({ onLogin }: { onLogin?: (user: any) => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:3000/login', { email, password });
            if (res.data.success) {
                if (onLogin) onLogin(res.data.user);
            } else {
                setError(res.data.error || 'Login failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#080B30',
        borderRadius: 12,
        alignItems: 'center',
    },
    title: {
        color: '#90D5FF',
        fontSize: 22,
        fontFamily: 'Inter_700Bold',
        marginBottom: 20,
    },
    input: {
        width: 250,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 10,
        fontFamily: 'Inter_400Regular',
    },
    button: {
        backgroundColor: '#90D5FF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#080B30',
        fontSize: 16,
        fontFamily: 'Inter_700Bold',
    },
    error: {
        color: '#E74C3C',
        marginBottom: 10,
    },
});
