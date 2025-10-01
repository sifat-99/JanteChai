import NewsCard from '@/components/NewsCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

const HomeScreen = () => {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('http://localhost:3000/articles')
            .then(res => {
                console.log(res?.data?.articles)
                setData(res?.data?.articles)
                setLoading(false)
            })
            .catch(err => {
                console.error('API fetch error:', err)
                setLoading(false)
            })
    }, [])
    return (
        <ScrollView style={styles.container}>
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="#90D5FF" />
                </View>
            ) : (
                data?.map((item, i) => (
                    <NewsCard key={i} article={item} />
                ))
            )}
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080B30',
        minHeight: '100%',

    },
    text: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 300
    },
})
