import * as Localization from 'expo-localization'

import i18n from 'i18n-js'

export function LanguageInit() {
    i18n.translations = {
        'en-US': { home: 'Home', searchBar: 'What are you looking for?' },
        'it-IT': { home: 'Home', searchBar: 'Cosa stai cercando?' }
    }

    i18n.locale = Localization.locale

}