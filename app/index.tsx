import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require('@/assets/images/image.png')}
                    style={styles.image}
                />
                <Text style={styles.title}>Jante Chai</Text>
                <Text style={styles.subtitle}>Your Daily Dose of News, Delivered.</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/(app)')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#080B30",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 30,
        tintColor: '#90D5FF',
    },
    title: {
        fontSize: 48,
        color: "#fff",
        fontFamily: 'Inter_700Bold',
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: "#90D5FF",
        textAlign: "center",
        marginTop: 10,
        fontFamily: 'Inter_400Regular',
    },
    button: {
        backgroundColor: '#90D5FF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#080B30',
        fontSize: 18,
        fontFamily: 'Inter_700Bold',
    }
});
