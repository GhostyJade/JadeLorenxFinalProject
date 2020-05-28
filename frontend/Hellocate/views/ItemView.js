import React, { useEffect } from 'react'

import { Actions } from 'react-native-router-flux'

import { View, Text } from 'react-native'

import { Appbar, FAB } from 'react-native-paper'

import * as Config from '../configs/index'
import { useTracked } from '../configs/global_state'

import { List } from 'react-native-paper';

export default function ItemView(props) {

    const [state, dispatch] = useTracked()
    const [itemList, setItemList] = React.useState([])

    useEffect(() => {
        getItems()
    }, [])

    const getItems = () => {
        fetch(`${Config.Network.serverURI}/${Config.Network.apiPath}items/${state.user.username}/list`, {
            method: 'POST',
            headers: {
                'x-access-token': state.user.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    ambientKey: props.data.ambientKey, roomKey: props.data.roomKey
                }
            })
        }).then(response => response.json()).then(result => {
            if (result.success) {
                setItemList(result.items)
            }
        })
    }

    const mapItems = itemList.map((data, index) => {
        return (
            <List.Item
                title={data.name}
                description={data.description}
                left={() => <List.Icon color={data.color} icon="checkbox-blank-circle" />}
                key={index}
            />
        )
    })


    return (
        <View style={Config.Styles.ItemViewStyles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={Actions.pop} />
                <Appbar.Content title={props.data.name} />
            </Appbar.Header>
            <List.Section >
                {mapItems}
            </List.Section>
            <FAB icon="plus" style={Config.Styles.FloatingActionButtonStyles.fab} onPress={Actions.newItem} />
        </View>
    )
}