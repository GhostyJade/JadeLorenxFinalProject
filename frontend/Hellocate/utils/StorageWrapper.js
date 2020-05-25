import { AsyncStorage } from 'react-native'

export default class StorageWrapper {
    static async addData(key, value) {
        await AsyncStorage.setItem(key, value)
    }

    static async getData(key) {
        await AsyncStorage.getItem(key)
    }
}