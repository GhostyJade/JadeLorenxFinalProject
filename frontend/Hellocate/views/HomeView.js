import React, { Component } from "react"

import i18n from 'i18n-js'

import { Text, View, FlatList } from 'react-native'

import { HomeViewStyles } from '../configs/styles'

import { SearchBar, FloatingActionButton } from '../components/index'

export default class HomeView extends Component {
    render() {
        return (
            <View style={HomeViewStyles.container}>
                <SearchBar />
                <Text style={HomeViewStyles.homeText}>{i18n.t('home')}</Text>
                <FlatList>

                </FlatList>
                <FloatingActionButton />
            </View>
        )
    }
}