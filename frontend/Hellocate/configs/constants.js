import { Dimensions, StatusBar, Platform } from 'react-native'

export const TopOffset = Platform.OS === 'android' ? StatusBar.currentHeight : 0

const bottomBarHeight = 50 //the bottom bar is 50px high

export const ScreenWidth = Math.round(Dimensions.get('window').width)
export const ScreenHeight = Math.round(Dimensions.get('window').height) - TopOffset - bottomBarHeight