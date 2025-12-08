import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const COLORS = {
    AGADIR_BLUE: '#0077b6',
    SAND_COLOR: '#f6e7c1',
    TEXT_DARK: '#333333',
};

const HomeScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>

            <Image
                source={require('../images/clipboard.png')}
                style={styles.logo}
            />

            {/* --- Title --- */}
            <Text style={styles.title}>Agadir Task Manager 2025</Text>
            <Text style={styles.subtitle}>
                Manage your administrative and personal tasks daily.
            </Text>

            {/* --- Authentication Buttons --- */}
            <View style={styles.buttonContainer}>

                {/* Login Button */}
                <TouchableOpacity
                    style={[styles.authButton, { backgroundColor: COLORS.AGADIR_BLUE }]}
                    onPress={() => router.push('/login')}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                {/* Create Account Button */}
                <TouchableOpacity
                    style={[styles.authButton, styles.registerButton]}
                    onPress={() => router.push('/Register')}
                >
                    <Text style={[styles.buttonText, { color: COLORS.AGADIR_BLUE }]}>
                        Create an Account
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.SAND_COLOR,
        paddingHorizontal: 30,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 30,
        borderRadius: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.TEXT_DARK,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 50,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
    },
    authButton: {
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    registerButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.AGADIR_BLUE,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    }
});

export default HomeScreen;