import React from 'react'

import { FAB } from 'react-native-paper'

import * as Config from '../configs/index'
import { Actions } from 'react-native-router-flux'

export default function FloatingActionButton(props) {

    return (
       <FAB icon="plus" style={Config.Styles.FloatingActionButtonStyles.fab}  onPress={() => Actions.ambient()}/>
    )
}
