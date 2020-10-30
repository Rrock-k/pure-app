import React, { useContext } from 'react'

import { LanguageContext, currentLanguage } from '../components/LanguageContextWrapper'
import { getLocale, noLocalisationList, translate } from './translation'

const modes = {
  PROD: 'prod',
  DEV: 'dev',
  TEST: 'test',
}
const MODE = modes.TEST

const createElementInitial = React.createElement

let previousFilePath = null
let filePath = null
let filename = null
const phrasesByFiles = {}

window.show = function () {
  for (const filename in phrasesByFiles) {
    if (!phrasesByFiles[filename].size) continue
    console.log('---------------')
    console.log(filename)
    console.log(Array.from(phrasesByFiles[filename]).join('\n'))
  }

  console.log('--------------------------')
  console.log('No localisation available:')
  console.log(noLocalisationList)
  for (const filename in noLocalisationList) {
    console.log('--------------------------')
    console.log(`In ${filename}:`)
    const keysInFile = noLocalisationList[filename]
    for (const key in keysInFile) {
      const languages = Array.from(keysInFile[key])
      languages.forEach(lang => console.log(lang, ': ', key))
    }
  }
}

React.createElement = (type, props, ...children) => {
  if (MODE !== 'test') {
    return createElementInitial(
      type,
      props,
      ...children.map(child => {
        if (typeof child === 'string') {
          return translate(child, currentLanguage) || child
        }
        return child
      })
    )
  } else return testCreateElement(type, props, ...children)
}

function testCreateElement(type, props, ...children) {
  const filePath = props?.__source?.fileName

  if (filePath && filePath !== previousFilePath) {
    filename = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.lastIndexOf('.'))

    if (!phrasesByFiles[filename]) phrasesByFiles[filename] = new Set()

    previousFilePath = filePath
    // console.log('Rendering file: ' + filename)
  }

  let isNotTranslated = false
  const translatedChildren = children.map(child => {
    if (typeof child !== 'string') return child
    // console.log('-----------')
    // console.log(filename, child)
    const locale = getLocale(filename, child, currentLanguage)
    if (locale) return locale
    const translation = translate(child, currentLanguage)
    if (translation === child) isNotTranslated = true
    if (translation) return translation
    return child
  })

  return createElementInitial(type, props, ...translatedChildren)
}

export function LanguageWrap(props) {
  const { children, source } = props

  const { language } = useContext(LanguageContext)

  return translate(children, language)
}

function TestElement(props) {
  const { children, source, coordinates } = props
  const { language } = useContext(LanguageContext)

  const translation = translate(children, language)

  if (translation === children && language !== 'ru')
    return createElementInitial(
      React.Fragment,
      null,
      children,
      createElementInitial(
        'button',
        {
          style: {
            visibility: 'hidden',
            position: 'absolute',
            fontSize: '10px',
            backgroundColor: 'red',
            margin: '0',
            padding: '0',
          },
          onClick: e => {
            e.stopPropagation()
            console.log(source)
          },
        },
        'ADD'
      )
    )

  return translation
}
