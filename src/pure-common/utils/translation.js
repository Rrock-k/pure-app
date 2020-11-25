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

  query = '' + query
  const [firstQueryPart, ...queryParts] = query.split('.').map(part => part.toLowerCase())

  let result = options.map[firstQueryPart]

  try {
    if (queryParts.length) {
      queryParts.forEach(key => {
        result = result[key]
      })
    }
    if (result[currentLanguage] == '#key') return query.slice(query.lastIndexOf('.'))
    else result = result[currentLanguage]
  } catch (err) {
    console.error(
      `Locale for ${query} not found:

    ${err.stack}`
    )
  }
  if (typeof result === 'string') return result
  return query.slice(query.lastIndexOf('.'))
}
