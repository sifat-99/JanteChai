import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();
const BACKEND_URL = 'http://localhost:3000/'; // TODO: Replace with your backend endpoint

const GOOGLE_CLIENT_ID = '215204248213-3g5qbhriopj01hbdfgukahlnuq6dfhnt.apps.googleusercontent.com'; // TODO: Replace with your Google OAuth client ID

export default function SignInScreen() {
    const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    };

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: GOOGLE_CLIENT_ID,
            redirectUri: AuthSession.makeRedirectUri({}),
            scopes: ['profile', 'email'],
            responseType: 'token',
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { access_token } = response.params;
            fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: { Authorization: `Bearer ${access_token}` },
            })
                .then(res => res.json())
                .then(user => {
                    // Send user data to backend for MongoDB storage
                    fetch(BACKEND_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user),
                    })
                        .then(res => res.json())
                        .then(data => {
                            Alert.alert('Sign In Success', `Welcome, ${user.name || user.email}`);
                        })
                        .catch(() => Alert.alert('Error', 'Failed to save user data.'));
                })
                .catch(() => Alert.alert('Error', 'Failed to fetch user info.'));
        }
    }, [response]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <Button
                title="Sign in with Google"
                onPress={() => promptAsync()}
                disabled={!request}
                color="#90D5FF"
            />
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
