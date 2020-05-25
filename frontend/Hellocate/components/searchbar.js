import React, { Component } from 'react'
import i18n from 'i18n-js'

import { Searchbar } from 'react-native-paper'

export default class CustomSearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = { search: '' }
    }

    onUpdateSearch = (e) => {
        this.setState({ search: e })
    }

    render() {
        return (
            <Searchbar placeholder={i18n.t('searchBar')} onChangeText={this.onUpdateSearch} value={this.state.search} />
        )
    }
}