import React, { useEffect } from "react"

import i18n from 'i18n-js'

import { Text, View, FlatList, SectionList } from 'react-native'

import { SearchBar, FloatingActionButton } from '../components/index'

import * as Config from '../configs/index'

import { useTracked } from '../configs/global_state'


const data = [
    {
        "id": "-M7xpdXAKzE7Xb8WLiFA",
        "name": "Home",
        "rooms": [
            {
                "id": "1",
                "name": "a",
                "icon":"fridge"
            }
        ]
    },
    {
        "id": "-M7y18bsxlgcl-hHSOLu",
        "name": "Office",
        "rooms": [
            {
                "id": "2",
                "name": "b",
                "icon":"fridge"
            }
        ]
    },
    {
        "id": "-M80w9Ly-MiPn9URc-I9",
        "name": "Test",
        "rooms": [
            {
                "id": "3",
                "name": "c",
                "icon":"fridge"
            }
        ]
    }
]

export default function HomeView() {

    const [state, dispatch] = useTracked()

    const [ambientList, setAmbientList] = React.useState(data)

    // let ambientList = data.ambients

    useEffect(() => {
        //getAmbients()
    }, [])

    const getAmbients = () => {
        fetch(`${Config.Network.serverURI}/api/v1/ambients/Jade`).then(
            response => response.json()
        ).then(e => {
            if (e.success) {
                setAmbientList(e.ambients)
            } //handle failed to get ambients
        })
    }


    const Rooms = ({ data }) => (
        <Text>{data.name}</Text>
    )

    const Ambient = ({ data }) => (
        <View style={Config.Styles.HomeViewStyles.ambientContainer}>
            <Text style={Config.Styles.HomeViewStyles.ambientText}>{data.name}</Text>
            <FlatList horizontal
                data={data.rooms}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Rooms data={item} />}
            />
        </View>
    )

    return (
        <View style={Config.Styles.HomeViewStyles.container}>
            <SearchBar />
            <Text style={Config.Styles.HomeViewStyles.homeText}>{i18n.t('home')}</Text>

            <FlatList
                data={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Ambient data={item} />}
            />

            <FloatingActionButton />
        </View>
    )
}/*
            <SectionList style={{ height: 500, backgroundColor: 'ff0000' }}>
                {ambientList.map(function (item, index) {
                    return <Text key={index} id={item.id}>{item.name}</Text>
                })}
            </SectionList>*/