const options = {
  currentLanguage: null,
  map: [],
}

export function changeCurrentLanguage(lang) {
  options.currentLanguage = lang
}

export function changeTranslationMap(map) {
  options.map = map
}

export function t(query) {
  const currentLanguage = options.currentLanguage || 'en'

  query = query.toLowerCase()
  const [firstQueryPart, ...queryParts] = query.split('.')

  let result = options.map[firstQueryPart]

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
