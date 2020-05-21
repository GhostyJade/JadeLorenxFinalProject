import { useReducer } from 'react'

import { createContainer } from 'react-tracked'

const useValue = ({ reducer, initialState }) => useReducer(reducer, initialState)
const { Provider, useTracked } = createContainer(useValue)

const initialState = {
    authenticated: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'hasLoggedIn': return { ...state, authenticated: true }
        case 'hasLoggedOut': return { ...state, authenticated: false }
    }
}


export {
    reducer, initialState,
    Provider, useTracked
}
