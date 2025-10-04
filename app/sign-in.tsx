import LoginForm from '@/components/ui/LoginForm';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// WebBrowser.maybeCompleteAuthSession();
// const BACKEND_URL = 'http://localhost:3000/'; // TODO: Replace with your backend endpoint

// const GOOGLE_CLIENT_ID = '215204248213-3g5qbhriopj01hbdfgukahlnuq6dfhnt.apps.googleusercontent.com'; // TODO: Replace with your Google OAuth client ID

export default function SignInScreen() {
    return (
        <View style={styles.container}>
            <LoginForm />
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
});
