import translationMap from './translationMap'
import localeTranslationMap from './localeTranslationMap'

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

export function getLocale(filename, key, language) {
  let foundKey

  const translationMap = localeTranslationMap[filename]
  if (!translationMap) {
    registerNoMatch(filename, key, language)
    return null
  }

  try {
    foundKey = translationMap[key][language]
  } catch (err) {
    console.log('ERROR')
    registerNoMatch(filename, key, language)
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
