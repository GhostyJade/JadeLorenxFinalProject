import React from "react";

import { View, TextInput, Button } from 'react-native'

import { useTracked } from '../configs/global_state'


export default function RegistrationView() {

    const [state, dispatch] = useTracked()

    return (
        <View>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" secureTextEntry />
            <Button title="Register" />
        </View>
    )

}