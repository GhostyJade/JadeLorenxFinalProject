import 'react-native-gesture-handler'
import React from 'react'

import * as Config from './configs/index'

import { Provider, reducer, initialState } from './configs/global_state'
import AppManager from './components/AppManager'

Config.Language.LanguageInit()

export default function App() {
    return (
        <Provider reducer={reducer} initialState={initialState}>
            <AppManager /> 
        </Provider>
    )
}
