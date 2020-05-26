import { useReducer } from 'react'

import { createContainer } from 'react-tracked'

const useValue = ({ reducer, initialState }) => useReducer(reducer, initialState)
const { Provider, useTracked } = createContainer(useValue)

const initialState = {
    authenticated: false,
    isFirstUpdate: true,
    ambientList: [],
    credits: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'hasLoggedIn': return { ...state, authenticated: true }
        case 'hasLoggedOut': return { ...state, authenticated: false }

        case 'disableFirstUpdate': return { ...state, showNewAmbientView: false }
        case 'enableFirstUpdate': return { ...state, showNewAmbientView: true }

        case 'updateAmbientList': return { ...state, ambientList: action.list }

        case 'showCredits': return { ...state, credits: true }
        case 'hideCredits': return { ...state, credits: false }
    }
}

export {
    reducer, initialState,
    Provider, useTracked //TODO useTracked if is called from the global config instance is undefined
}
