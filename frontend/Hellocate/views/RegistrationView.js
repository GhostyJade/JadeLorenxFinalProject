import React from "react"

import { View, TextInput, Button, Text } from 'react-native'

import { useTracked } from '../configs/global_state'

import * as Config from '../configs/index'

import i18n from 'i18n-js'

export default function RegistrationView() {

    const [registrationData, setRegistrationData] = React.useState({ username: '', password: '', confirmPassword: '' })

    const [state, dispatch] = useTracked()

    const performRegistration = () => {
        fetch(Config.Network.serverURI + '/users/', {
            method: 'POST',
            body: {

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
                <TextInput style={Config.Styles.RegistrationViewStyles.inputField} placeholder="Username" key="username" value={registrationData.username} onChangeText={updateUsernameText} />
                <TextInput style={Config.Styles.RegistrationViewStyles.inputField} placeholder="Password" secureTextEntry key="password" value={registrationData.password} onChangeText={updatePasswordText} />
                <TextInput style={Config.Styles.RegistrationViewStyles.inputField} placeholder="Confirm password" secureTextEntry key="confirmPassword" value={registrationData.confirmPassword} onChangeText={updateConfirmPasswordText} />
                <View style={Config.Styles.RegistrationViewStyles.confirmButton}>
                    <Button color="#a800ff" title="Register" />
                </View>
        </View>
    )

}