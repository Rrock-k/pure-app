import { addOnLanguageChangeCallback } from 'contexts/contexts/LanguageContext'

import localeTranslationMap from 'data/localeTranslationMap.json'
import serverErrorMessagesTranslationMap from 'data/serverErrorMessagesTranslationMap.json'
import shopLocaleTranslationMap from 'pure-common/data/shopLocaleTranslationMap'
import navigationLocaleTranslationMap from 'pure-common/data/navigationLocaleTranslationMap'
import { changeTranslationMap, changeCurrentLanguage } from 'pure-common/utils/translation'

//setting up translation map for this app
changeTranslationMap({
  ...localeTranslationMap,
  ...shopLocaleTranslationMap,
  ...navigationLocaleTranslationMap,
  ...serverErrorMessagesTranslationMap,
})

addOnLanguageChangeCallback(lang => changeCurrentLanguage(lang))
