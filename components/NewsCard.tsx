import { NewsArticle } from '@/constants/mock-data';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NewsCardProps {
    article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    const route = useRouter();
    return (
        <TouchableOpacity style={styles.card} onPress={() => { route.push({ pathname: '/details', params: { article: JSON.stringify(article) } }); }}>
            <Image source={{ uri: article.image_url }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.category}>{(article.category?.[0] || 'NEWS').toUpperCase()}</Text>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.snippet} numberOfLines={3}>{article.description}</Text>
                <View style={styles.footer}>
                    <Text style={styles.author}>
                        {article.creator?.[0] || 'Unknown Author'} • {article.pubDate?.split(' ')[0]}
                    </Text>
                    <FontAwesome name="bookmark-o" size={20} color="#90D5FF" />
                </View>
                
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1F2349',
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    content: {
        padding: 15,
    },
    category: {
        color: '#90D5FF',
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        marginBottom: 5,
    },
    title: {
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        marginBottom: 8,
    },
    snippet: {
        color: '#ccc',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    author: {
        color: '#888',
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
});

export default NewsCard;
