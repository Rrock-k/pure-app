import translationMap from './translationMap'
import localeTranslationMap from './localeTranslationMap'
import { currentLanguage } from '../components/contexts/LanguageContext'

export const noTranslationAvailable = new Set()
export const noLocalisationList = {}

export function translate(phrase, lang) {
  if (lang === 'ru') {
    return phrase
  }

  const try1 = phrase.toLowerCase().trim()
  const try2 = phrase.toLowerCase()
  const try3 = phrase.trim()

  let result =
    translationMap[phrase] || translationMap[try1] || translationMap[try2] || translationMap[try3]

  if (!result) noTranslationAvailable.add(phrase)
  if (result) result = result[lang] || result

  return result
}

export function getLocale(component, key, language) {
  let foundKey

  const translationMap = localeTranslationMap[component]
  if (!translationMap) {
    registerNoMatch(component, key, language)
    return null
  }

  try {
    foundKey = translationMap[key][language]
  } catch (err) {
    console.log('ERROR')
    registerNoMatch(component, key, language)
    return null
  }

  return foundKey
}

function registerNoMatch(filename, key, language) {
  function addKey() {
    noLocalisationList[filename][key] = new Set([language])
  }

  if (!noLocalisationList[filename]) {
    noLocalisationList[filename] = {}
    addKey()
    return
  }
  if (!noLocalisationList[filename][key]) addKey()
  else noLocalisationList[filename][key].add(language)
}

export function t(query) {
  query = query.toLowerCase()
  const [firstQueryPart, ...queryParts] = query.split('.')

  let result = localeTranslationMap[firstQueryPart]
  try {
    if (queryParts.length) {
      queryParts.forEach(key => {
        result = result[key]
      })
    }
    result = result[currentLanguage]
  } catch (err) {
    console.error(
      `Locale for ${query} not found:

    ${err.stack}`
    )
  }
  if (typeof result === 'string') return result
  return query
}
