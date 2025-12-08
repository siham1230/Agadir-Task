import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import useTasks from '../hooks/useTasks';
import { COLORS } from '../utils/theme';


export default function AddTaskScreen({ navigation }) {
    const { createTask } = useTasks();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');


    const onSave = async () => {
        await createTask({ title, description, due_date: dueDate });
        navigation.goBack();
    };


    return (
        <View style={styles.container}>
            <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input, { height: 120 }]} multiline />
            <TextInput placeholder="Due date (YYYY-MM-DD)" value={dueDate} onChangeText={setDueDate} style={styles.input} />
            <TouchableOpacity style={styles.button} onPress={onSave}><Text style={{ color: COLORS.white }}>Save</Text></TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.sand
    },
    input: {
        backgroundColor: COLORS.white,
        padding: 12, borderRadius: 8,
        marginBottom: 12
    },
    button: {
        backgroundColor: COLORS.agadirBlue,
        padding: 14,
        borderRadius: 10,
        alignItems: 'center'
    }
});