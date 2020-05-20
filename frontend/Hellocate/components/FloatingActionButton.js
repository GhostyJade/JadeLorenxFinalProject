import React from 'react'

import { StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

export default function FloatingActionButton() {
    return (
        <TouchableOpacity style={styles.fab} onPress={()=>console.log("pressed OwO")}><Icon name="plus" style={styles.plusIcon}></Icon></TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#343434',
        borderRadius: 30,
        elevation: 8
    },
    plusIcon: {
        color: 'white'
    }
})