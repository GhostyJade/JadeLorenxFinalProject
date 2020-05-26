import React from 'react'

import * as Linking from 'expo-linking'

import { Text, Button, View } from 'react-native'
import { Actions } from 'react-native-router-flux'

import * as Config from '../configs/'

import { useTracked } from '../configs/global_state'

export default function CreditView() {

    const [state, dispatch] = useTracked()

    return (
        <View style={Config.Styles.CreditViewStyles.creditOverlay}>
            <View style={Config.Styles.CreditViewStyles.textContainer}>
                <Text style={Config.Styles.CreditViewStyles.text}>App made by GhostyJade</Text>
                <Text style={Config.Styles.CreditViewStyles.text}>Original idea by Lorenx</Text>
                <Text style={Config.Styles.CreditViewStyles.text} onPress={() => Linking.openURL('https://patreon.com/GhostyJade')}>Support me on Patreon</Text>
            </View>
            <View style={Config.Styles.CreditViewStyles.buttonContainer}>
                <Button title="Ok" onPress={() => { dispatch({ type: 'hideCredits' }); Actions.pop() }} />
            </View>
        </View>
    )
}

