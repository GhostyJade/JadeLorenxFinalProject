import React, { useEffect } from "react"

import i18n from 'i18n-js'

import { Text, View, FlatList, SectionList } from 'react-native'

import { SearchBar, FloatingActionButton } from '../components/index'

import * as Config from '../configs/index'

import { useTracked } from '../configs/global_state'

export default function HomeView() {

    const [state, dispatch] = useTracked()

    useEffect(() => {
        if (state.isFirstUpdate)
            getAmbients()
    }, [])

    const getAmbients = () => {
        fetch(`${Config.Network.serverURI}/api/v1/rooms/Jade`).then(
            response => response.json()
        ).then(e => {
            if (e.success) {
                dispatch({ type: 'updateAmbientList', list: e.ambients })
            } //handle failed to get ambients
        }).then(dispatch({ type: 'disableFirstUpdate' }))
    }

    const getAmbientIconName = (icnName) => {

    }

    const Rooms = ({ data }) => (
        <View>

            <Text>{data.name}</Text>
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

    const Ambient = ({ data }) => (
        <View style={Config.Styles.HomeViewStyles.ambientContainer}>
            <Text style={Config.Styles.HomeViewStyles.ambientText}>{data.name}</Text>
            <RoomsList data={data} />
        </View>
    )

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