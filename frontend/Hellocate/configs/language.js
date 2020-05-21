import * as Localization from 'expo-localization'

import i18n from 'i18n-js'

import it_IT from '../languages/it_IT.json'
import en_US from '../languages/en_US.json'

export function LanguageInit() {
    console.log(it_IT)
    i18n.translations = {
        'en-US': en_US,
        'it-IT': it_IT
    }

    i18n.locale = Localization.locale

}