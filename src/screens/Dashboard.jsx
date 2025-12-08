import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import useTasks from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import { COLORS } from '../utils/theme';


export default function DashboardScreen({ navigation }) {
    const { tasks, loading, fetchTasks } = useTasks();
    const [filter, setFilter] = useState('all');


    const filtered = tasks.filter(t => filter === 'all' ? true : (filter === 'pending' ? t.status === 'pending' : t.status === 'done'));


    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>My Tasks</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddTask')}>
                    <Text style={{ color: COLORS.white }}>+ Add</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.filters}>
                {['all', 'pending', 'done'].map(f => (
                    <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.filterBtn, filter === f && { backgroundColor: COLORS.agadirBlue }]}>
                        <Text style={{ color: filter === f ? COLORS.white : COLORS.text }}>{f === 'all' ? 'All' : f === 'pending' ? 'Pending' : 'Completed'}</Text>
                    </TouchableOpacity>
                ))}
            </View>


            <FlatList
                data={filtered}
                keyExtractor={item => String(item.id)}
                refreshing={loading}
                onRefresh={fetchTasks}
                renderItem={({ item }) => (
                    <TaskCard task={item} onPress={() => navigation.navigate('TaskDetails', { task: item })} />
                )}
                ListEmptyComponent={() => <Text style={{ textAlign: 'center', marginTop: 40 }}>No tasks yet.</Text>}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: COLORS.sand },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    title: { fontSize: 22, fontWeight: '700', color: COLORS.agadirBlue },
    addBtn: { backgroundColor: COLORS.agadirBlue, padding: 10, borderRadius: 8 },
    filters: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
    filterBtn: { padding: 8, borderRadius: 8, backgroundColor: COLORS.white }
});