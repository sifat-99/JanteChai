import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SavedScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Saved Articles Screen</Text>
        </View>
    );
};

export default SavedScreen;

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
