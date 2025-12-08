import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../utils/theme';
import dayjs from 'dayjs';


export default function TaskCard({ task, onPress }) {
    return (
        <TouchableOpacity style={[styles.card]} onPress={onPress}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{task.title}</Text>
                <Text numberOfLines={2} style={styles.desc}>{task.description}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: task.status === 'done' ? COLORS.success : COLORS.agadirBlue }}>{task.status}</Text>
                <Text style={styles.date}>{dayjs(task.due_date).format('DD/MM/YYYY')}</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    title: {
        fontWeight: '700',
        marginBottom: 6
    },
    desc: {
        color: '#334155'
    },
    date: {
        marginTop: 8,
        fontSize: 12,
        color: '#334155'
    }
});