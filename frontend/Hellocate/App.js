import 'react-native-gesture-handler'
import React from 'react'

import { HomeView } from './views/index'

import * as Config from './configs/index'

import { Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RegistrationView from './views/Registration'

import { Provider, reducer, initialState } from './configs/global_state'

const Tab = createBottomTabNavigator()

Config.Language.LanguageInit()

export default function App() {
  return (
    <Provider reducer={reducer} initialState={initialState}>
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
          <Tab.Screen name="Register" component={RegistrationView} ></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer >
    </Provider>
  )
}
