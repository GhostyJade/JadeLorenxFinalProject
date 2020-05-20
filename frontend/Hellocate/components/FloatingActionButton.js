import React from 'react'

import { TouchableOpacity } from 'react-native'

import { FloatingActionButtonStyles } from '../configs/styles'

import Icon from 'react-native-vector-icons/FontAwesome5'

export default function FloatingActionButton() {
    return (
        <TouchableOpacity style={FloatingActionButtonStyles.fab} onPress={() => console.log("pressed OwO")}><Icon name="plus" style={FloatingActionButtonStyles.plusIcon}></Icon></TouchableOpacity>
    )
}