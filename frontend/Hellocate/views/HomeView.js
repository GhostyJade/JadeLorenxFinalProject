import React, { useEffect } from "react"

import i18n from 'i18n-js'

import { Text, View, FlatList, TouchableOpacity } from 'react-native'

import { SearchBar, FloatingActionButton } from '../components/index'

import * as Config from '../configs/index'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import SensorUtils from "../utils/SensorUtils"
import { Actions } from "react-native-router-flux"

import { useTracked } from '../configs/global_state'

export default function HomeView() {

    const [state, dispatch] = useTracked()

    useEffect(() => {
        getAmbients()
        /*SensorUtils.addListener(() => {
            if (!state.credits) {
                dispatch({ type: 'showCredits' })
                Actions.credits()
            }
        })*/

    }, [])

    const getAmbients = () => {
        fetch(`${Config.Network.serverURI}/api/v1/rooms/${state.user.username}`, {
            headers: {
                'x-access-token': state.user.token
            }
        }).then(
            response => response.json()
        ).then(e => {
            if (e.success) {
                dispatch({ type: 'updateAmbientList', list: e.ambients })
            } //handle failed to get ambients
        })
    }

    const GetAmbientIcon = ({ icnName }) => {
        let icon
        switch (icnName) {
            case 'fridge': icon = 'fridge-outline'; break
            case 'bed': icon = 'bed'; break
            default: icon = 'cancel'
        }
        return <Icon style={Config.Styles.HomeViewStyles.icon} name={icon} />
    }

    const Rooms = ({ id, data }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    Actions.showItems({ data: { ambientKey: id, roomKey: data[0], name: data[1].name } })
                }}>
                    <GetAmbientIcon icnName={data[1].icon} />
                    <Text style={Config.Styles.HomeViewStyles.roomText}>{data[1].name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const RoomsList = ({ id, data }) => {
        if (data.rooms === undefined)
            return null
        return (
            <FlatList horizontal
                data={Object.entries(data.rooms)}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Rooms id={id} data={item} />}
            />
        )
    }

    const Ambient = ({ data }) => {
        return (
            <View style={Config.Styles.HomeViewStyles.ambientContainer}>
                <View style={Config.Styles.HomeViewStyles.headerContainer}>
                    <Text style={Config.Styles.HomeViewStyles.ambientText}>{data.name}</Text>
                    <Text onPress={() => Actions.items({ data: { key: data.id }, fetchData: getAmbients })} style={Config.Styles.HomeViewStyles.roomAdd}>
                        <Icon style={Config.Styles.HomeViewStyles.roomAddIcon} name="plus" />
                    </Text>
                </View>
                <RoomsList id={data.id} data={data} />
            </View>
        )
    }

    return (
        <View style={Config.Styles.HomeViewStyles.container}>
            <SearchBar />
            <Text style={Config.Styles.HomeViewStyles.homeText}>{i18n.t('home')}</Text>
            <FlatList
                data={state.ambientList}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Ambient data={item} />}
            />
            <FloatingActionButton fetchData={getAmbients} />
        </View>
    )
}