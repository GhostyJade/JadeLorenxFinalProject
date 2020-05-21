import React from "react"

import { View, TextInput, Button } from 'react-native'

import { useTracked } from '../configs/global_state'

import * as Config from '../configs/index'

export default function RegistrationView() {

    const [state, dispatch] = useTracked()

    const performRegistration = () => {
        fetch(Config.Network.serverURI + '/users/', {
            method: 'POST',
            body: {
                
            }
        })
    }

    return (
        <View>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" secureTextEntry />
            <TextInput placeholder="Confirm password" secureTextEntry />
            <Button title="Register" />
        </View>
    )

}