/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {
  HomeIcon,
  BanknotesIcon,
  PlusCircleIcon,
} from 'react-native-heroicons/outline';
import CategoryScreen from './src/components/category/CategoryScreen';
import DashboardStackNavigator from './src/components/dashboard/DashboardStackNavigator';
import TransactionScreen from './src/components/transaction/TransactionScreen';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function getTabBarStyle(route: any): any {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  if (routeName === 'AddTransactions') {
    return {display: 'none'};
  }
  return {};
}

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#808080',
          }}>
          <Tab.Screen
            options={({route}) => ({
              tabBarIcon: ({focused}) => (
                <HomeIcon color={focused ? '#000' : '#808080'} />
              ),
              tabBarStyle: getTabBarStyle(route),
            })}
            component={DashboardStackNavigator}
            name="Dashboard"
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => (
                <PlusCircleIcon color={focused ? '#000' : '#808080'} />
              ),
            }}
            component={CategoryScreen}
            name="Add Category"
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => (
                <BanknotesIcon color={focused ? '#000' : '#808080'} />
              ),
            }}
            component={TransactionScreen}
            name="All Transactions"
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
