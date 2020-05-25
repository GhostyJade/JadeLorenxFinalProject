import React from 'react'

import { useTracked } from '../configs/global_state'

import { View, Text, TextInput } from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'

import i18n from 'i18n-js'

import * as Configs from '../configs/index'

export default function NewAmbientView() {
    const [state, dispatch] = useTracked()

    const [ambient, setAmbient] = React.useState({ name: '' })
    const [snackbar, setSnackbar] = React.useState({ active: false, message: '' })

    const goBack = () => {
        dispatch({ type: 'hideAmbientView' })
    }

    const dismissSnackbar = () => {
        setSnackbar({ ...snackbar, active: !snackbar.active })
    }
    /**
     * Send data to the backend
     */
    const createAmbient = async () => {
        if (ambient.name === '') {
            setSnackbar({ active: true, message: 'snackbar_missingAmbientName' })
            return;
        }
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
                if (e.success) { //TODO Check if ambient already exists, display error
                    goBack()
                } else {
                    setSnackbar({ active: true, message: 'snackbar_Error' })
                }
            }
        )
    }

    return (
        <View style={Configs.Styles.NewAmbientView.container}>
            <Appbar.Header style={Configs.Styles.NewAmbientView.header}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content title="Hellocate" />
                <Appbar.Action icon="floppy" onPress={createAmbient} />
            </Appbar.Header>
            <View style={Configs.Styles.NewAmbientView.inputContainer}>
                <Text style={Configs.Styles.NewAmbientView.nameText}>{i18n.t('new_ambient_name_text')}</Text>
                <TextInput placeholder={i18n.t('new_ambient_placeholder')} onChangeText={text => { setAmbient({ name: text }); }} style={Configs.Styles.NewAmbientView.inputField}></TextInput>
            </View>
            <Snackbar visible={snackbar.active} onDismiss={dismissSnackbar} action={{ label: i18n.t('dismiss_snackbar'), onPress: dismissSnackbar }}>{i18n.t(snackbar.message)}</Snackbar>
        </View >
    )
}