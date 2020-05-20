import { StyleSheet } from 'react-native'

import * as Constants from './constants'

const FloatingActionButtonStyles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#343434',
        borderRadius: 30,
        elevation: 8
    },
    plusIcon: {
        color: 'white'
    }
})

const AppNavigatorStyles = StyleSheet.create({
    tabNavigatorText: {
        color: 'black',
        fontSize: 16
    },
    tabNavigatorIcon: {
        fontSize: 26
    }
})

const HomeViewStyles = StyleSheet.create({
    container: {
        width: Constants.ScreenWidth,
        height: Constants.ScreenHeight,
        top: Constants.TopOffset,
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    homeText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24
    },
})

export {
    AppNavigatorStyles,
    FloatingActionButtonStyles,
    HomeViewStyles
}