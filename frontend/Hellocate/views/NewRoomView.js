import React from 'react'

import { View, Text, TextInput } from 'react-native'

import { Appbar } from 'react-native-paper'

import DropDownPicker from "react-native-dropdown-picker";

import * as Config from '../configs/index'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux';

export default function NewRoomView(props) {

    const [room, setRoom] = React.useState({ name: '', icon: 'fridge' })

    const registerNewRoom = () => {
        if (room.name === '' || room.icon === '') {
            //show snackbar
            return;
        }
        console.log(props.data)
        fetch(`${Config.Network.serverURI}/${Config.Network.apiPath}rooms/Jade`, {
            method: 'POST',
            headers: {
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
            if(result.success){
                Actions.pop()
                //update main view
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
        </View>
    )
}