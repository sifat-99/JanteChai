import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!isLoaded) return;
        setLoading(true);
        setError('');
        try {
            await signUp.create({ emailAddress: email, password });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            // You may want to navigate to a verification screen here
            setActive({ session: signUp.createdSessionId });
        } catch (err: any) {
            setError(err.errors ? err.errors[0].message : 'Sign up failed');
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title={loading ? 'Signing Up...' : 'Sign Up'} onPress={handleSignUp} disabled={loading} />
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
