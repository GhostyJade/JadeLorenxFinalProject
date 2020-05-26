import React from "react"

import { View, TextInput, Button, Text } from 'react-native'

import { useTracked } from '../configs/global_state'

import * as Config from '../configs/index'

import i18n from 'i18n-js'
import { Snackbar } from "react-native-paper"
import { Actions } from 'react-native-router-flux'

export default function RegistrationView() {

    const [state, dispatch] = useTracked()

    const [registrationData, setRegistrationData] = React.useState({ username: '', password: '', confirmPassword: '' })
    const [snackbar, setSnackbar] = React.useState({ active: false, message: '' })

    const dismissSnackbar = () => {
        setSnackbar({ ...snackbar, active: !snackbar.active })
    }

    const performRegistration = () => {
        if (registrationData.username === '' || registrationData.password === '' || registrationData.confirmPassword === '') {
            setSnackbar({ active: true, message: 'snackbar_allFieldsRequired' })
            return;
        }
        if (registrationData.password !== registrationData.confirmPassword) {
            setSnackbar({ active: true, message: 'registration_passwordNotMatch' })
            return;
        }

        fetch(Config.Network.serverURI + "/" + Config.Network.apiPath + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    username: registrationData.username,
                    usrPassword: registrationData.password
                }
            })
        }).then(response => response.json()).then(result => {
            if (result.registered) {
                Actions.login()
            } else {
                setSnackbar({ active: true, message: 'registration_usernameTaken' })
                return;
            }
        })
    }

    const updateUsernameText = (e) => {
        setRegistrationData({ ...registrationData, username: e })
    }

    const updatePasswordText = (e) => {
        setRegistrationData({ ...registrationData, password: e })
    }

    const updateConfirmPasswordText = (e) => {
        setRegistrationData({ ...registrationData, confirmPassword: e })
    }

    return (
        <View style={Config.Styles.RegistrationViewStyles.container}>
            <Text style={Config.Styles.RegistrationViewStyles.welcome} >{i18n.t('registrationWelcome')}</Text>
            <TextInput style={Config.Styles.RegistrationViewStyles.inputField} placeholder={i18n.t('registration_txtUsername')} key="username" value={registrationData.username} onChangeText={updateUsernameText} />
            <TextInput style={Config.Styles.RegistrationViewStyles.inputField} placeholder="Password" secureTextEntry key="password" value={registrationData.password} onChangeText={updatePasswordText} />
            <TextInput style={Config.Styles.RegistrationViewStyles.inputField} placeholder={i18n.t('registration_txtConfirmPassword')} secureTextEntry key="confirmPassword" value={registrationData.confirmPassword} onChangeText={updateConfirmPasswordText} />
            <View style={Config.Styles.RegistrationViewStyles.buttonGroup}>
                <View style={Config.Styles.RegistrationViewStyles.buttonWrapper}>
                    <Button color="#a800ff" title={i18n.t('registration_btnRegister')} onPress={performRegistration} />
                </View>
                <View style={Config.Styles.RegistrationViewStyles.buttonWrapper}>
                    <Button color="#a800ff" title={i18n.t('registration_alreadyRegistered')} onPress={() => Actions.replace('login')} />
                </View>
            </View>
            <Snackbar onDismiss={dismissSnackbar} action={{ label: i18n.t('dismiss_snackbar'), onPress: dismissSnackbar }} visible={snackbar.active}>{i18n.t(snackbar.message)}</Snackbar>
        </View>
    )

}