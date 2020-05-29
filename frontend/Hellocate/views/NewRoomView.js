import React from 'react'

import { View, Text, TextInput } from 'react-native'

import { Appbar, Snackbar } from 'react-native-paper'

import DropDownPicker from "react-native-dropdown-picker";

import * as Config from '../configs/index'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux';

import { useTracked } from '../configs/global_state'

import i18n from 'i18n-js'

export default function NewRoomView(props) {

    const [state, dispatch] = useTracked()

    const [room, setRoom] = React.useState({ name: '', icon: 'fridge' })
    const [snackbar, setSnackbar] = React.useState({ active: false, message: '' })

    const dismissSnackbar = () => {
        setSnackbar({ ...snackbar, active: !snackbar.active })
    }

    const registerNewRoom = () => {
        if (room.name === '' || room.icon === '') {
            setSnackbar({ active: true, message: 'snackbar_allFieldsRequired' })
            return
        }

        fetch(`${Config.Network.serverURI}/${Config.Network.apiPath}rooms/${state.user.username}`, {
            method: 'POST',
            headers: {
                'x-access-token': state.user.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    data: {
                        key: props.data.key,
                        room: {
                            name: room.name, icon: room.icon
                        }
                    }
                }
            )
        }).then(response => response.json()).then(result => {
            if (result.success) {
                props.fetchData()
                Actions.pop()
            } else {
                setSnackbar({ active: true, message: 'snackbar_Error' })
            }
        })
    }

    const dropdownItems = [
        { label: <Text><Icon name="fridge" /> Fridge</Text>, value: 'fridge' },
        { label: <Text><Icon name="hotel" /> Bed</Text>, value: 'bed' },
        { label: <Text><Icon name="television" /> Tv</Text>, value: 'Tv' },
        { label: <Text><Icon name="water" /> Wc</Text>, value: 'Wc' },
        { label: <Text><Icon name="car" /> Car</Text>, value: 'Car' },
        { label: <Text><Icon name="briefcase" /> Suitcase</Text>, value: 'Suitcase' }
    ]

    return (
        <View style={Config.Styles.NewRoomViewStyles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={Actions.pop} />
                <Appbar.Content title="New Room" />
                <Appbar.Action icon="floppy" onPress={registerNewRoom} />
            </Appbar.Header>
            <View style={Config.Styles.NewRoomViewStyles.itemsWrapper}>
                <Text style={Config.Styles.NewRoomViewStyles.guideText}>Room name:</Text>
                <TextInput style={Config.Styles.NewRoomViewStyles.inputField} onChangeText={e => setRoom({ ...room, name: e })} placeholder="Room name" />
            </View>
            <View style={Config.Styles.NewRoomViewStyles.itemsWrapper}>
                <Text style={Config.Styles.NewRoomViewStyles.guideText}>Icon: </Text>
                <DropDownPicker items={
                    dropdownItems
                }
                    itemStyle={{ alignItems: 'center' }}
                    defaultIndex={0}
                    containerStyle={{ width: 200, height: 35 }}
                    onChangeItem={item => setRoom({ ...room, icon: item.value })}
                />
            </View>
            <Snackbar visible={snackbar.active} onDismiss={dismissSnackbar} action={{ label: i18n.t('dismiss_snackbar'), onPress: dismissSnackbar }}>{i18n.t(snackbar.message)}</Snackbar>
        </View>
    )
}