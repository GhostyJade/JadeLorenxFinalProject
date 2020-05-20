import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, StatusBar, Platform } from 'react-native';

import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import { SearchBar, FloatingActionButton } from './components/index'

const topOffset = Platform.OS === 'android' ? StatusBar.currentHeight : 0

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height) - topOffset

i18n.translations = {
  'en-US': { home: 'Home', searchBar: 'What are you looking for?' },
  'it-IT': { home: 'Home', searchBar: 'Cosa stai cercando?' }
}

i18n.locale = Localization.locale

export default function App() {

  return (
    <View style={styles.container}>
      <SearchBar />
      <Text style={styles.homeText}>{i18n.t('home')}</Text>
      <FlatList>

      </FlatList>
      <FloatingActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    top: topOffset,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  homeText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24
  },
});
