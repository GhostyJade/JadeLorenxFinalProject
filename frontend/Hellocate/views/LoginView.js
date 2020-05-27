import React from 'react'

import { View, Button, TextInput, Text } from 'react-native'

import * as Config from '../configs/index'

import { Actions } from 'react-native-router-flux'
import { Snackbar } from 'react-native-paper'
import { t } from 'i18n-js'

import { useTracked } from '../configs/global_state'

export default function LoginView() {

    const [state, dispatch] = useTracked()

    const [snackbar, setSnackbar] = React.useState({ active: false, message: '' })//it's time to make a custom component, don't it? // TODO create a custom snackbar component
    const [userData, setUserData] = React.useState({ username: '', password: '' })

    const dismissSnackbar = () => {
        setSnackbar({ ...snackbar, active: false })
    }

    const performLogin = () => {
        if (userData.username === '' || userData.password === '') {
            setSnackbar({ active: true, message: 'snackbar_allFieldsRequired' })
            return
        }

        fetch(`${Config.Network.serverURI}/${Config.Network.apiPath}users/${userData.username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: userData.password
            })
        }).then(response => response.json()).then(result => {
            if (result.authenticated) {
                const { token } = result
                const { username } = userData

                dispatch({ type: 'updateUserData', userdata: { username, token } })

                Actions.replace('home')
                //Config.StorageWrapper.AddData('token', token).then(Config.StorageWrapper.AddData('username', username)).then(() => { Actions.replace('home') }) //TODO add login time and check if user have already signed in before. if so, try to get the previous stored data and, if it's not valid anymore, do a new login
            } else {
                setSnackbar({ active: true, message: 'snackbar_login_wrongData' })
            }
        })
    }

    const changeUsername = (e) => {
        setUserData({ ...userData, username: e })
    }


    const changePassword = (e) => {
        setUserData({ ...userData, password: e })
    }

    return (
        <View style={Config.Styles.LoginViewStyles.container}>
            <Text>{t('login_welcome')}</Text>
            <TextInput placeholder={t('registration_txtUsername')} style={Config.Styles.LoginViewStyles.inputField} onChangeText={changeUsername} />
            <TextInput placeholder="Password" secureTextEntry style={Config.Styles.LoginViewStyles.inputField} onChangeText={changePassword} />
            <View style={Config.Styles.LoginViewStyles.buttonGroup}>
                <View style={Config.Styles.LoginViewStyles.buttonWrapper}>
                    <Button onPress={() => { Actions.replace('registration') }} title="Register" />
                </View>
                <View style={Config.Styles.LoginViewStyles.buttonWrapper}>
                    <Button onPress={performLogin} title="Login" />
                </View>
            </View>
            <Snackbar visible={snackbar.active} onDismiss={dismissSnackbar} action={{ label: t('dismiss_snackbar'), onPress: dismissSnackbar }}>{t(snackbar.message)}</Snackbar>
        </View>
    )

}