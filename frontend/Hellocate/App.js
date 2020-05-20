import 'react-native-gesture-handler'
import React from 'react'

import { HomeView } from './views/index'

import * as Config from './configs/index'

import { Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

Config.Language.LanguageInit()

export default function App() {
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
        <Tab.Screen name="Home" component={HomeView} ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer >
  )
}
