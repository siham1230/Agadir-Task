import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import useRegister from '../hooks/useRegister';
import { COLORS } from '../utils/theme';


export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, loading, error } = useRegister();


    const handleRegister = async () => {
        const res = await register({ name, email, password });
        if (res.success) navigation.navigate('Auth');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create account</Text>
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: COLORS.sand
    },
    title: {
        fontSize: 20,
        color: COLORS.agadirBlue,
        alignSelf: 'center',
        marginBottom: 10
    },
    input: {
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 8,
        marginBottom: 12
    },
    button: {
        backgroundColor: COLORS.agadirBlue,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: COLORS.white
    },
    error: {
        color: COLORS.danger,
        textAlign: 'center',
        marginTop: 8
    }
});