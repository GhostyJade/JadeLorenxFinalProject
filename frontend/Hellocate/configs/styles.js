import { StyleSheet } from 'react-native'

import * as Constants from './constants'

const FloatingActionButtonStyles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#343434',
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
        marginTop: Constants.TopOffset,
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    homeText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24
    },
    ambientContainer: {
        height: 64,
        margin: 24
    },
    ambientText: {
        fontWeight: 'bold'
    }
})

const RegistrationViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputField: {
        width: 350,
        height: 55,
        margin: 10,
        padding: 8,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    confirmButton: {
        borderRadius: 14,
        width: 150
    },
    welcome: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

const NewAmbientView = StyleSheet.create({
    container: {
        width: Constants.ScreenWidth,
        height: Constants.RawScreenHeight,
    },
    header: {
        backgroundColor: '#fff'
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputContainer: {
        margin: 24,
        alignItems: 'center'
    },
    inputField: {
        width: 370,
        height: 55,
        marginTop: 10,
        padding: 8,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        fontSize: 18,
        fontWeight: '500',
    },
    backIcon: {
        color: '#fff',
        fontSize: 16
    }
})

export {
    AppNavigatorStyles,
    FloatingActionButtonStyles,
    HomeViewStyles,
    RegistrationViewStyles,
    NewAmbientView
}