import { useState, useCallback } from 'react';
import axiosInstance from '../api/axios';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- R (Retrieve) ---
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get('/tasks');
            setTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // --- C (Create) ---
    const createTask = async (title, description, due_date) => {
        try {
            const response = await axiosInstance.post('/tasks', { title, description, due_date });
            // Add the new task to the local state and refresh
            setTasks(prevTasks => [...prevTasks, response.data]);
            return true;
        } catch (err) {
            setError('Failed to create task.');
            return false;
        }
    };

    // --- U (Update/Patch) ---
    const markTaskAsDone = async (taskId) => {
        try {
            await axiosInstance.patch(`/tasks/${taskId}/done`);
            // Update local state without re-fetching all tasks
            setTasks(prevTasks => prevTasks.map(task =>
                task.id === taskId ? { ...task, status: 'done' } : task
            ));
            return true;
        } catch (err) {
            setError('Failed to update task status.');
            return false;
        }
    };

    // --- D (Delete) ---
    const deleteTask = async (taskId) => {
        try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            // Remove the task from the local state
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            return true;
        } catch (err) {
            setError('Failed to delete task.');
            return false;
        }
    };

    return { tasks, loading, error, fetchTasks, createTask, markTaskAsDone, deleteTask };
};