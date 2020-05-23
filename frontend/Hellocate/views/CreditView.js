import React from 'react'

import { StyleSheet, Text, Button, View } from 'react-native'

export default function CreditView(props) {
    console.log(props.visibility)
    return (
        <View style={styles.creditOverlay}>
            <Text>App made by</Text>
            <Button title="Ok" onPress={props.close} />
        </View>
    )
}

const styles = StyleSheet.create({
    creditOverlay: {

    }
})