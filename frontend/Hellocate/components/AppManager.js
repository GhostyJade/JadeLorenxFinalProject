import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { HomeView } from '../views/index'
import { Text } from 'react-native'

import { useTracked } from '../configs/global_state'

import { NavigationContainer } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RegistrationView from '../views/RegistrationView'
import NewAmbientView from '../views/NewAmbientView'


import * as Config from '../configs/index'

const Tab = createBottomTabNavigator()

const UserLoggedInView = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    if (route.name === 'Home')
                        iconName = focused ? 'home' : 'home-outline'
                    return <Icon name={iconName} style={Config.Styles.AppNavigatorStyles.tabNavigatorIcon} />
                },
                tabBarLabel: ({ focused, color }) => {
                    return <Text style={Config.Styles.AppNavigatorStyles.tabNavigatorText}>{route.name}</Text>
                }
            })} >
                <Tab.Screen name="Home" component={HomeView} key="home"></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer >
    )
}

export default function AppManager() {

    const [state, dispatch] = useTracked()

    return (
        <>
            {state.authenticated ? (state.showNewAmbientView ? <NewAmbientView /> : <UserLoggedInView />) : <RegistrationView />}
        </>
    )
}