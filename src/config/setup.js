import {
  LanguageContext,
  useLanguageContext,
  addOnLanguageChangeCallback,
} from '../components/contexts/LanguageContext'
import { HoverContext, useHoverContext } from '../pure-common/HoverContext'
import { ProductsContext, useProductsContext } from '../pure-common/ProductsContext'
import { MobileMenuAndContext, useMobileMenuContext } from '../pure-common/MobileMenuAndContext'

import localeTranslationMap from '../data/localeTranslationMap.json'
import shopLocaleTranslationMap from '../pure-common/data/shopLocaleTranslationMap'
import navigationLocaleTranslationMap from '../pure-common/data/navigationLocaleTranslationMap'
import { changeTranslationMap, changeCurrentLanguage } from '../pure-common/utils/translation'

//setting up translation map for this app
changeTranslationMap({
  ...localeTranslationMap,
  ...shopLocaleTranslationMap,
  ...navigationLocaleTranslationMap,
})

addOnLanguageChangeCallback(lang => changeCurrentLanguage(lang))

export const contexts = {
  LanguageContext,
  useLanguageContext,

  HoverContext,
  useHoverContext,

  ProductsContext,
  useProductsContext,

  MobileMenuAndContext,
  useMobileMenuContext,
}

export const translation = {}
