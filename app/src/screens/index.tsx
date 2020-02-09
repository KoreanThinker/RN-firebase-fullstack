import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/AntDesign'
import { color1 } from '../components/styles';
import { fromRight } from 'react-navigation-transitions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';

import {
    SignInScreen,
    PolicyScreen,
    ForgotPwScreen,
    PolicyDetailScreen,
    SignUpScreen
} from './Sign'

import {
    HomeScreen,
    SettingScreen
} from './Tab'

import {
    PostScreen,
    ImageScreen,
    OpenSourceScreen
} from './Stack'



const MainTab = createBottomTabNavigator(
    {
        HomeScreen,
        // ChatScreen,
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
                } else if (routeName === 'ChatScreen') {
                    iconName = 'wechat'
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
            },
            keyboardHidesTabBar: true,
        },
        navigationOptions: {
            headerShown: false,
        }
    }
);

const MainStack = createStackNavigator(
    {
        MainTab,
        PostScreen,
        ImageScreen,
        OpenSourceScreen
    },
    {
        initialRouteName: 'MainTab',
        headerMode: 'screen',
        defaultNavigationOptions: ({ navigation, navigationOptions }) => ({
            header: ({ scene }) => {
                const { options } = scene.descriptor;
                const title =
                    options.headerTitle !== undefined
                        ? options.headerTitle
                        : options.title !== undefined
                            ? options.title
                            : scene.route.routeName;
                return <View style={{ flexDirection: 'row', height: 50, width: '100%', backgroundColor: color1, alignItems: 'center' }}>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.goBack()}
                        style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Icon name='arrowleft' color='#fff' size={26} />
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 1 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#fff' }} >{title}</Text>
                    </View>
                    <View style={{ width: 50, height: 50 }}>
                        {options.headerRight}
                    </View>
                </View>
            }
        }),
        transitionConfig: () => fromRight()
    }
)

const SignStack = createStackNavigator(
    {
        SignInScreen,
        PolicyScreen,
        ForgotPwScreen,
        PolicyDetailScreen,
        SignUpScreen
    },
    {
        initialRouteName: 'SignInScreen',
        headerMode: 'screen',
        defaultNavigationOptions: ({ navigation }) => ({
            header: ({ scene }) => {
                const { options } = scene.descriptor;
                const title =
                    options.headerTitle !== undefined
                        ? options.headerTitle
                        : options.title !== undefined
                            ? options.title
                            : scene.route.routeName;
                return <View style={{ flexDirection: 'row', height: 50, width: '100%', backgroundColor: color1, alignItems: 'center' }}>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.goBack()}
                        style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Icon name='arrowleft' color='#fff' size={26} />
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 1, paddingRight: 50 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: '#fff' }} >{title}</Text>
                    </View>
                </View>
            }
        }),
        transitionConfig: () => fromRight()
    }
)

const SignSwitch = createSwitchNavigator(
    {
        MainStack,
        SignStack
    },
    {
        initialRouteName: 'MainStack',
    }
)

export default createAppContainer(SignSwitch)