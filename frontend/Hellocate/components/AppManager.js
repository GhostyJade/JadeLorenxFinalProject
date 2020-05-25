import React from 'react'

import { useTracked } from '../configs/global_state'

import { Router, Stack, Scene } from "react-native-router-flux"

import * as Views from '../views/index'

export default function AppManager() {

    const [state, dispatch] = useTracked()

    return (
        <Router >
            <Stack >
                <Scene hideNavBar key="home" component={Views.RegistrationView} />
                <Scene hideNavBar key="login" component={Views.LoginView} />
                <Scene hideNavBar key="ambient" component={Views.NewAmbientView} />
            </Stack>
        </Router>
    )
}