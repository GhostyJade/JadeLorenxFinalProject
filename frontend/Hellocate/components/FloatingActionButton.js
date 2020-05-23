import React from 'react'

import { TouchableOpacity } from 'react-native'

import { FloatingActionButtonStyles } from '../configs/styles'

import { useTracked } from '../configs/global_state'

import Icon from 'react-native-vector-icons/FontAwesome5'

export default function FloatingActionButton(props) {

    const [state, dispatch] = useTracked()

    return (
        <TouchableOpacity style={FloatingActionButtonStyles.fab} onPress={() => dispatch({ type: 'showAmbientView' })}><Icon name="plus" style={FloatingActionButtonStyles.plusIcon}></Icon></TouchableOpacity>
    )
}

//asyncstorage reactnative