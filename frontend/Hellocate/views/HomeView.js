import React, { useEffect } from "react"

import i18n from 'i18n-js'

import { Text, View, FlatList } from 'react-native'

import { SearchBar, FloatingActionButton } from '../components/index'

import * as Config from '../configs/index'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SensorUtils from "../utils/SensorUtils"
import { Actions } from "react-native-router-flux"

import { useTracked } from '../configs/global_state'

export default function HomeView() {

    const [state, dispatch] = useTracked()

    useEffect(() => {
        if (state.isFirstUpdate) {
            getAmbients()
            SensorUtils.addListener(() => {
                if (!state.credits) {
                    dispatch({ type: 'showCredits' })
                    Actions.credits()
                }
            })
        }
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
        }).then(dispatch({ type: 'disableFirstUpdate' }))
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

    const Rooms = ({ data }) => (
        <View>
            <GetAmbientIcon icnName={data.icon} />
            <Text style={Config.Styles.HomeViewStyles.roomText}>{data.name}</Text>
        </View>
    )

    const RoomsList = ({ data }) => {
        if (data.rooms === undefined)
            return null
        return (
            <FlatList horizontal
                data={Object.values(data.rooms)}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Rooms data={item} />}
            />
        )
    }

    const Ambient = ({ data }) => {
        return (
            <View style={Config.Styles.HomeViewStyles.ambientContainer}>
                <View style={Config.Styles.HomeViewStyles.headerContainer}>
                    <Text style={Config.Styles.HomeViewStyles.ambientText}>{data.name}</Text>
                    <Text onPress={() => Actions.items({ data: { key: data.id } })} style={Config.Styles.HomeViewStyles.roomAdd}>
                        <Icon style={Config.Styles.HomeViewStyles.roomAddIcon} name="plus" />
                    </Text>
                </View>
                <RoomsList data={data} />
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
            <FloatingActionButton />
        </View>
    )
}