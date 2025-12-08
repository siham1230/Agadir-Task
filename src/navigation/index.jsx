import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/Dashboard';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetaillScreen';
import { AuthContext } from '../api/auth/AuthProvider';


const Stack = createNativeStackNavigator();


export default function AppNavigator() {
    const { user, loading } = useContext(AuthContext);


    if (loading) return null;


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <>
                        <Stack.Screen name="Dashboard" component={DashboardScreen} />
                        <Stack.Screen name="AddTask" component={AddTaskScreen} />
                        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Auth" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}