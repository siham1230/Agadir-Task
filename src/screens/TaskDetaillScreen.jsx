import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import useTasks from '../hooks/useTasks';
import { COLORS } from '../utils/theme';


export default function TaskDetailsScreen({ route, navigation }) {
    const { task } = route.params;
    const { deleteTask, markDone } = useTasks();


    const onDelete = async () => {
        Alert.alert('Confirm', 'Delete this task?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: async () => { await deleteTask(task.id); navigation.goBack(); } }
        ]);
    };


    const onFinish = async () => {
        await markDone(task.id);
        navigation.goBack();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.desc}>{task.description}</Text>
            <Text style={styles.meta}>Due: {task.due_date}</Text>


            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.success }]} onPress={onFinish}>
                    <Text style={{ color: 'white' }}>Finish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.danger }]} onPress={onDelete}>
                    <Text style={{ color: 'white' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.sand
    },
    title: {
        fontSize: 22,
        color: COLORS.agadirBlue,
        fontWeight: '700'
    },
    desc: {
        marginTop: 12,
        color: '#1f2937'
    },
    meta: {
        marginTop: 8,
        color: '#475569'
    },
    btn: {
        padding: 12,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center'
    }
});