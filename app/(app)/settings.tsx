import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings Screen</Text>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#080B30',
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
    },
});
