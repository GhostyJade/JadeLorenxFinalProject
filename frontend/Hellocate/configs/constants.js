import { Dimensions, StatusBar, Platform } from 'react-native'

export const TopOffset = Platform.OS === 'android' ? StatusBar.currentHeight : 0
export const HeaderBarHeight = Platform.OS === 'ios' ? 64 : 56

const bottomBarHeight = 50 //the bottom bar is 50px high

export const RawScreenHeight = Math.round(Dimensions.get('window').height)
export const ScreenWidth = Math.round(Dimensions.get('window').width)
export const ScreenHeight = RawScreenHeight - TopOffset// - bottomBarHeight - TopOffset