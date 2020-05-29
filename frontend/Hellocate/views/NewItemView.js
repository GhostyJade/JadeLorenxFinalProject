import React from 'react'

import { View, TextInput } from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'

import { TriangleColorPicker, fromHsv } from 'react-native-color-picker'

import { useTracked } from '../configs/global_state'
import { Actions } from 'react-native-router-flux'

import * as Config from '../configs/index'

import i18n from 'i18n-js'

export default function NewItemView(props) {

    const [state, dispatch] = useTracked()
    const [snackbar, setSnackbar] = React.useState({ active: false, message: '' })

    const [itemData, setItemData] = React.useState({ name: '', description: '', color: '#ff0000' })

    const dismissSnackbar = () => {
        setSnackbar({ ...snackbar, active: !snackbar.active })
    }

    const createItem = () => {
        if (itemData.name === '' || itemData.description === '' || itemData.color === '') {
            setSnackbar({ active: true, message: 'snackbar_allFieldsRequired' })
            return
        }
        fetch(`${Config.Network.serverURI}/${Config.Network.apiPath}items/${state.user.username}`, {
            method: 'POST',
            headers: {
                'x-access-token': state.user.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    ambientKey: props.data.ambientKey,
                    roomKey: props.data.roomKey,
                    item: {
                        name: itemData.name,
                        description: itemData.description,
                        color: itemData.color
                    }
                }
            })
        }).then(response => response.json()).then(result => {
            if (result.success) {
                props.fetchData()
                Actions.pop()
            } else {
                setSnackbar({ active: true, message: 'snackbar_Error' })
            }
        })
    }

    return (
        <View style={Config.Styles.NewItemViewStyle.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={Actions.pop} />
                <Appbar.Content title="New Item" />
                <Appbar.Action icon="floppy" onPress={createItem} />
            </Appbar.Header>
            <TextInput style={Config.Styles.NewItemViewStyle.inputField} placeholder="Item Name" onChangeText={text => setItemData({ ...itemData, name: text })} />
            <TextInput style={Config.Styles.NewItemViewStyle.inputField} placeholder="Item Description" onChangeText={text => setItemData({ ...itemData, description: text })} />
            <TriangleColorPicker style={Config.Styles.NewItemViewStyle.colorPicker}
                defaultColor={itemData.color}
                onColorChange={color => setItemData({ ...itemData, color: fromHsv(color) })}
                hideSliders
            />
            <Snackbar visible={snackbar.active} onDismiss={dismissSnackbar} action={{ label: i18n.t('dismiss_snackbar'), onPress: dismissSnackbar }}>{i18n.t(snackbar.message)}</Snackbar>
        </View>
    )
}