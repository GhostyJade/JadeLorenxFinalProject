import React, {Component} from 'react'

import SensorUtils from '../utils/SensorUtils'

export default class GlobalState extends Component {

    constructor(props) {
        super(props)
        this.state = { special: false }
    }
    
    componentDidMount() {
        SensorUtils.addListener(() => {
            this.setState({ special: true })
        })
    }

    componentWillUnmount() {
        SensorUtils.removeListener()
    }

    render() {
        return (
            <HomeView creditVisibility={this.state.special} />
        )
    }
}