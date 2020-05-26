import { AsyncStorage } from 'react-native'

const AddData = async (key, value) => {
    await AsyncStorage.setItem(key, value)
}

const GetData = async (key) => {
    await AsyncStorage.getItem(key)
}

export {
    AddData, GetData
}