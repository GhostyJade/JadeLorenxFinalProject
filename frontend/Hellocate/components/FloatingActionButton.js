import React from 'react'

import { FAB } from 'react-native-paper'

import * as Config from '../configs/index'

export default function FloatingActionButton(props) {

    const [state, dispatch] = Config.GlobalState.useTracked()

    return (
       <FAB icon="plus" style={Config.Styles.FloatingActionButtonStyles.fab}  onPress={() => dispatch({ type: 'showAmbientView' })}/>
    )
}
