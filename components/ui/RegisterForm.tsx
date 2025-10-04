import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterForm({ onRegister }: { onRegister?: (user: any) => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'user' | 'reporter'>('user');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:3000/register', { name, email, password, role });
            if (res.data.success) {
                // Store user data (except password) in localStorage
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem('user', JSON.stringify({ name, email, role }));
                }
                if (onRegister) onRegister(res.data.user);
            } else {
                setError(res.data.error || 'Registration failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
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
            <View style={styles.roleContainer}>
                <TouchableOpacity
                    style={[styles.roleButton, role === 'user' && styles.roleSelected]}
                    onPress={() => setRole('user')}
                >
                    <Text style={styles.roleText}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.roleButton, role === 'reporter' && styles.roleSelected]}
                    onPress={() => setRole('reporter')}
                >
                    <Text style={styles.roleText}>Reporter</Text>
                </TouchableOpacity>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
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
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
        gap: 10,
    },
    roleButton: {
        backgroundColor: '#1F2349',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    roleSelected: {
        backgroundColor: '#90D5FF',
    },
    roleText: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
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
