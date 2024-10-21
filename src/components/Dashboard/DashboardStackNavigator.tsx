import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from './DashboardScreen';
import AddTransactions from './AddTransactions';

export default function DashboardStackNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={DashboardScreen} name="DashboardScreen" />
      <Stack.Screen component={AddTransactions} name="AddTransactions" />
    </Stack.Navigator>
  );
}
