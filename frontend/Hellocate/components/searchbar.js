import React from 'react'
import i18n from 'i18n-js'

import { SearchBar } from 'react-native-elements'


export default function CustomSearchBar(props) {
    const updateSearch = (search) => {

    }
    return (
        <SearchBar placeholder={i18n.t('searchBar')} onChange={updateSearch} />
    )
}