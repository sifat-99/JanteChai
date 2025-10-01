import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export type ReactionType = 'like' | 'love' | 'haha';

export type NestedComment = {
    id: number;
    user: string;
    comment: string;
    timestamp: string;
    reactions: { [K in ReactionType]?: number };
    userReaction?: ReactionType;
    replies: NestedComment[];
};

type Props = {
    comments: NestedComment[];
    setComments: React.Dispatch<React.SetStateAction<NestedComment[]>>;
    displayReply: Record<number, boolean>;
    setDisplayReply: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
    replyText: Record<number, string>;
    setReplyText: React.Dispatch<React.SetStateAction<Record<number, string>>>;
    handleAddReply?: (commentId: number, text: string) => void;
    handleAddReaction?: (commentId: number, reactionType: ReactionType) => void;
    depth?: number;
};

export const CommentList: React.FC<Props> = ({ comments, setComments, displayReply, setDisplayReply, replyText, setReplyText, handleAddReply, handleAddReaction, depth = 0 }) => {
    const updateComment = (arr: NestedComment[], id: number, updater: (c: NestedComment) => NestedComment): NestedComment[] => {
        return arr.map(c => {
            if (c.id === id) {
                return updater(c);
            } else if (c.replies && c.replies.length > 0) {
                return { ...c, replies: updateComment(c.replies, id, updater) };
            } else {
                return c;
            }
        });
    };

    return (
        <>
            {comments.map(comment => (
                <View key={comment.id} style={{ marginBottom: 15, marginLeft: depth * 25 }}>
                    <Text style={{ color: depth === 0 ? '#90D5FF' : '#FFD580', fontWeight: 'bold', fontFamily: 'Inter_700Bold' }}>{comment.user}</Text>
                    <Text style={{ color: '#ccc', fontFamily: 'Inter_400Regular' }}>{comment.comment}</Text>
                    <Text style={{ color: '#555', fontSize: 12, fontFamily: 'Inter_400Regular' }}>{comment.timestamp}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 5 }}>
                        {(['like', 'love', 'haha'] as ReactionType[]).map(type => (
                            <TouchableOpacity
                                key={type}
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}
                                onPress={() => {
                                    if (handleAddReaction) {
                                        handleAddReaction(comment.id, type);
                                    } else {
                                        setComments(prev => updateComment(prev, comment.id, c => {
                                            const prevCount = c.reactions[type] || 0;
                                            let userReaction = c.userReaction === type ? undefined : type;
                                            let reactions = { ...c.reactions };
                                            if (c.userReaction && c.userReaction !== type) {
                                                reactions[c.userReaction] = (reactions[c.userReaction] || 1) - 1;
                                            }
                                            if (c.userReaction === type) {
                                                reactions[type] = prevCount - 1;
                                            } else {
                                                reactions[type] = prevCount + 1;
                                            }
                                            return { ...c, reactions, userReaction };
                                        }));
                                    }
                                }}
                            >
                                <Ionicons name={type === 'haha' ? 'happy-outline' : 'heart-outline'} size={20} color={comment.userReaction === type ? '#E74C3C' : '#fff'} />
                                <Text style={{ color: '#fff', marginLeft: 4, fontFamily: 'Inter_400Regular' }}>{comment.reactions[type] || 0}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => {
                            setDisplayReply(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))
                        }} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                            <Feather name="message-circle" size={20} color="#fff" />
                            <Text style={{ color: '#fff', marginLeft: 6, fontFamily: 'Inter_400Regular' }}>Reply</Text>
                        </TouchableOpacity>
                        {displayReply[comment.id] && (
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={{ height: 30, borderColor: 'gray', borderWidth: 1, flex: 1, paddingHorizontal: 10, color: '#fff', fontFamily: 'Inter_400Regular', borderRadius: 12 }}
                                    placeholder="Reply..."
                                    placeholderTextColor="#888"
                                    value={replyText[comment.id] || ''}
                                    onChangeText={text => setReplyText(prev => ({ ...prev, [comment.id]: text }))}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        if ((replyText[comment.id] || '').trim() === '') return;
                                        if (handleAddReply) {
                                            handleAddReply(comment.id, replyText[comment.id]);
                                        } else {
                                            setComments(prev => updateComment(prev, comment.id, c => ({
                                                ...c,
                                                replies: [
                                                    ...c.replies,
                                                    {
                                                        id: Date.now(),
                                                        user: 'You',
                                                        comment: replyText[comment.id],
                                                        timestamp: 'now',
                                                        reactions: {},
                                                        userReaction: undefined,
                                                        replies: []
                                                    }
                                                ]
                                            })));
                                        }
                                        setReplyText(prev => ({ ...prev, [comment.id]: '' }));
                                    }}
                                    style={{ marginLeft: 8, backgroundColor: '#90D5FF', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 }}
                                >
                                    <Text style={{ color: '#222', fontFamily: 'Inter_700Bold' }}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    {comment.replies && comment.replies.length > 0 && (
                        <CommentList
                            comments={comment.replies}
                            setComments={setComments}
                            displayReply={displayReply}
                            setDisplayReply={setDisplayReply}
                            replyText={replyText}
                            setReplyText={setReplyText}
                            handleAddReply={handleAddReply}
                            handleAddReaction={handleAddReaction}
                            depth={depth + 1}
                        />
                    )}
                </View>
            ))}
        </>
    );
};
