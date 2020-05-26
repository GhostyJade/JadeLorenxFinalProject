import React from 'react'

import { Router, Stack, Scene } from "react-native-router-flux"

import * as Views from '../views/index'

export default function AppManager() {

    return (
        <Router >
            <Stack >
                <Scene hideNavBar key="login" component={Views.LoginView} />
                <Scene hideNavBar key="registration" component={Views.RegistrationView} />
                <Scene hideNavBar key="home" component={Views.HomeView} />
                <Scene hideNavBar key="ambient" component={Views.NewAmbientView} />
                <Scene hideNavBar key="credits" component={Views.CreditView} />
            </Stack>
        </Router>
    )
}