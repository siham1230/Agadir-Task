import React, { useState, useContext } from 'react';
import { useRouter } from 'expo-router';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert
} from 'react-native';
import { AuthContext } from '../api/auth/AuthContext'; // Import the Auth Context

// --- Theme Constants (Mirroring HomeScreen style) ---
const COLORS = {
    AGADIR_BLUE: '#0077b6',
    SAND_COLOR: '#f6e7c1',
    TEXT_DARK: '#333333',
    ERROR_RED: '#c0392b',
    INPUT_BG: '#FFFFFF',
};

const LoginScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Get login function from context
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);

        // Attempt to log in using the function from AuthContext
        const success = await login(email, password);

        setLoading(false);

        if (success) {
            // AuthContext handles setting the token, which automatically redirects the user
            // via the conditional rendering in App.js (Router).
            console.log("Login successful! Redirecting to Dashboard.");
        } else {
            // The login hook (useLogin) handles the API call error, but we show a generic alert here
            Alert.alert("Login Failed", "Invalid credentials or network error. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome Back to Agadir!</Text>
            <Text style={styles.subHeader}>Sign in to manage your tasks.</Text>

            {/* --- Email Input --- */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {/* --- Password Input --- */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* --- Login Button --- */}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Log In</Text>
                )}
            </TouchableOpacity>

            {/* --- Switch to Register --- */}
            <TouchableOpacity
                style={styles.registerLink}
                onPress={() => router.push('Register')}
            >
                <Text style={styles.registerText}>
                    Don't have an account? <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.SAND_COLOR,
        padding: 30,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.TEXT_DARK,
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        maxWidth: 350,
        height: 50,
        backgroundColor: COLORS.INPUT_BG,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    loginButton: {
        width: '100%',
        maxWidth: 350,
        height: 50,
        backgroundColor: COLORS.AGADIR_BLUE,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    registerLink: {
        marginTop: 20,
        padding: 10,
    },
    registerText: {
        color: COLORS.TEXT_DARK,
        fontSize: 14,
    }
});

export default LoginScreen;