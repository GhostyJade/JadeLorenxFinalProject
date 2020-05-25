import React from 'react'

import { useTracked } from '../configs/global_state'

import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Appbar } from 'react-native-paper'

import Icon from 'react-native-vector-icons/FontAwesome5'

import * as Configs from '../configs/index'

export default function NewAmbientView() {
    const [state, dispatch] = useTracked()

    const [ambient, setAmbient] = React.useState({ name: '' })

    const goBack = () => {
        dispatch({ type: 'hideAmbientView' })
    }

    const createAmbient = async () => {
        if (ambient === '') return
        await fetch(`${Configs.Network.serverURI}/api/v1/ambients/Jade`, { //TODO change username on auth
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    name: ambient.name
                }
            })
        }).then(response => response.json()).then(
            e => {
                if (e.success) {
                    goBack()
                }
            }
        )
    }

    return (
        <View style={Configs.Styles.NewAmbientView.container}>
            <Appbar.Header containerStyle={Configs.Styles.NewAmbientView.header}
                /*leftComponent={
                    <TouchableOpacity onPress={goBack}>
                        <Icon style={Configs.Styles.NewAmbientView.backIcon} name="arrow-left"></Icon>
                    </TouchableOpacity>
                }
                centerComponent={
                    <Text style={Configs.Styles.NewAmbientView.newText}>Hellocate</Text>
                }
                rightComponent={
                    <TouchableOpacity onPress={createAmbient}>
                        <Icon style={Configs.Styles.NewAmbientView.backIcon} name="save"></Icon>
                    </TouchableOpacity>
                }*/
            >
                <Appbar.BackAction onPress={goBack} />
            </Appbar.Header>
            <TextInput placeholder="Name" onChangeText={text => { setAmbient({ name: text }); }} style={Configs.Styles.NewAmbientView.inputField}></TextInput>
        </View >
    )
}