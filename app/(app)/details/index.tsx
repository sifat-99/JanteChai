import NewsDetails from '@/components/NewsDetails';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
const Details = () => {
    console.log("This page ")
    const params = useLocalSearchParams();
    const article = params.article ? JSON.parse(params.article as string) : null;
    console.log(article)
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: article?.title || 'Details',
                    headerTitleStyle: {
                        color: 'white',
                        fontSize: 16,
                        fontFamily: 'Inter_700Bold',
                    },
                    headerStyle: {
                        backgroundColor: '#080B30',
                    },
                    headerTintColor: '#fff',
                    animation: 'slide_from_right',
                }} />
            <SafeAreaView style={styles.container}>
                <NewsDetails news={article} />
            </SafeAreaView>
        </>
    )
}

export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080B30',
    },
})
