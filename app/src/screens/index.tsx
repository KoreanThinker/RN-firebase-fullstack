import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/AntDesign'


import HomeScreen from './HomeScreen'

import SettingScreen from './SettingScreen'

const MainTab = createBottomTabNavigator(
    {
        HomeScreen,
        SettingScreen
    },
    {
        initialRouteName: 'HomeScreen',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName: string = '';
                let size = 24;
                if (routeName === 'HomeScreen') {
                    iconName = 'home'
                } else if (routeName === 'SettingScreen') {
                    iconName = 'setting'
                }
                return <Icon name={iconName} size={size} color={focused ? '#000' : '#00000080'} />;
            },
        }),
        tabBarOptions: {
            showLabel: false,
            style: {
                backgroundColor: 'white',
                height: 50,
                borderTopColor: '#dbdbdb',
                borderTopWidth: 0.5,
            }
        },
    }
);

const MainStack = createStackNavigator(
    {
        MainTab
    },
    {
        initialRouteName: 'MainTab',
        defaultNavigationOptions: {
            headerShown: false
        }
    }
)

export default createAppContainer(MainStack)