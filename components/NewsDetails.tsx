import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { NewsArticle } from '@/constants/mock-data';
import { Feather, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { CommentList } from './CommentList';
declare global {
    interface Window {
        currentUser?: {
            email: string; name: string
};
    }
}


type ReactionType = 'like' | 'love' | 'haha';

type NestedComment = {
    id: number;
    user: string;
    comment: string;
    timestamp: string;
    reactions: { [K in ReactionType]?: number };
    userReaction?: ReactionType;
    replies: NestedComment[];
};

const NewsDetails = ({ news }: { news: NewsArticle }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [displayReply, setDisplayReply] = useState<Record<number, boolean>>({});
    const [replyText, setReplyText] = useState<Record<number, string>>({});

    const [comments, setComments] = useState<NestedComment[]>(news.comments || []);


    // Get current user (replace with your auth logic)
    // Example: const currentUser = useUser() || { name: 'Guest' };
    const currentUser = typeof window !== 'undefined' && window.currentUser ? window.currentUser : { name: 'Guest' };

    // Add a new comment
    const handleAddComment = async (text: string) => {
        const newComment: NestedComment = {
            id: Date.now(),
            user: currentUser.name || 'Guest',
            comment: text,
            timestamp: 'now',
            reactions: {},
            userReaction: undefined,
            replies: []
        };
        try {
            await axios.post('http://localhost:3000/comments', {
                articleId: news.article_id,
                comment: newComment
            });
            setComments(prev => [...prev, newComment]);
        } catch (err) {
            console.error('Failed to add comment:', err);
        }
    };

    // Add a reply to a comment
    const handleAddReply = async (commentId: number, text: string) => {
        const reply: NestedComment = {
            id: Date.now(),
            user: currentUser.name || 'Guest',
            comment: text,
            timestamp: 'now',
            reactions: {},
            userReaction: undefined,
            replies: []
        };
        try {
            await axios.post('http://localhost:3000/replies', {
                articleId: news.article_id,
                commentId,
                reply
            });
            setComments(prev => prev.map(c =>
                c.id === commentId
                    ? { ...c, replies: [...c.replies, reply] }
                    : c
            ));
        } catch (err) {
            console.error('Failed to add reply:', err);
        }
    };

    // Add a reaction to a comment
    const handleAddReaction = async (commentId: number, reactionType: ReactionType) => {
        try {
            await axios.post('http://localhost:3000/reactions', {
                articleId: news.article_id,
                commentId,
                reactionType
            });
            setComments(prev => prev.map(c =>
                c.id === commentId
                    ? {
                        ...c,
                        reactions: {
                            ...c.reactions,
                            [reactionType]: (c.reactions[reactionType] || 0) + 1
                        },
                        userReaction: reactionType
                    }
                    : c
            ));
        } catch (err) {
            console.error('Failed to add reaction:', err);
        }
    };
    const [newCommentText, setNewCommentText] = useState('');

    return (
        <ScrollView>
            <Text style={styles.title}>{news.title}</Text>
            <Text style={styles.meta}>
                {news.author} • {news.pubDate}
            </Text>
            {news.image_url && <Image source={{ uri: news.image_url }} style={styles.image} />}
            <Text style={styles.description}>{news.description}</Text>
            <Text style={styles.content}>{news.content}</Text>

            {/* Main like/comment/share bar (not per user) */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 15 }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', marginRight: 25 }}
                    onPress={() => {
                        setLiked(!liked);
                        setLikeCount(prev => liked ? prev - 1 : prev + 1);
                    }}
                >
                    <Ionicons name={liked ? 'heart' : 'heart-outline'} size={22} color={liked ? '#E74C3C' : '#fff'} />
                    <Text style={{ color: '#fff', marginLeft: 6, fontFamily: 'Inter_400Regular' }}>{likeCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 25 }}>
                    <Feather name="message-circle" size={22} color="#fff" />
                    <Text style={{ color: '#fff', marginLeft: 6, fontFamily: 'Inter_400Regular' }}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="share-2" size={22} color="#fff" />
                    <Text style={{ color: '#fff', marginLeft: 6, fontFamily: 'Inter_400Regular' }}>Share</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 15 }}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, paddingHorizontal: 10, color: '#fff', fontFamily: 'Inter_400Regular', borderRadius: 12 }}
                    placeholder="Add a comment..."
                    placeholderTextColor="#888"
                    value={newCommentText}
                    onChangeText={setNewCommentText}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (newCommentText.trim() !== '') {
                            handleAddComment(newCommentText);
                            setNewCommentText('');
                        }
                    }}
                    style={{ marginLeft: 8, backgroundColor: '#90D5FF', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 }}
                >
                    <Text style={{ color: '#222', fontFamily: 'Inter_700Bold' }}>Send</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, marginBottom: 30 }}>
                <CommentList
                    comments={comments}
                    setComments={setComments}
                    displayReply={displayReply}
                    setDisplayReply={setDisplayReply}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    handleAddReply={handleAddReply}
                    handleAddReaction={handleAddReaction}
                />
            </View>
        </ScrollView>
    )
}

export default NewsDetails

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
        fontFamily: 'Inter_700Bold',
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    meta: {
        fontSize: 14,
        color: '#90D5FF',
        marginBottom: 15,
        fontFamily: 'Inter_400Regular',
        paddingHorizontal: 15,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 15,
        fontFamily: 'Inter_400Regular',
        paddingHorizontal: 15,
    },
    content: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 30,
        fontFamily: 'Inter_400Regular',
        paddingHorizontal: 15,
    },
})
