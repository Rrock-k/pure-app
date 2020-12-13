import React, { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { contexts } from '../../config/setup'
import { t } from '../utils/translation'

const { useLanguageContext, useHoverContext } = contexts

const tThis = path => t('shop.header.' + path)

export default function ShopHeader({ setSortingFunc, setFilterFunc }) {
  const [isDropdowned, setIsDropdowned] = useState(false)
  const [optionsIndex, setOptionsIndex] = useState(0)
  const { language } = useLanguageContext()
  const hoverIsOn = useHoverContext()
  const { whatToShow } = useParams()
  const btnRef = useRef()

  let options = useMemo(
    () => [
      {
        name: tThis('options.recommend'),
        setterFunc: () => {},
      },
      {
        name: tThis('options.price_asc'),
        setterFunc: () =>
          setSortingFunc(() => (p1, p2) => {
            if (language === 'ru')
              return p1.priceRub - (p1.discountRub || 0) - (p2.priceRub - (p2.discountUsd || 0))
            else return p1.priceUsd - (p1.discountUsd || 0) - (p2.priceUsd - (p2.discountUsd || 0))
          }),
      },
      {
        name: tThis('options.price_desc'),
        setterFunc: () =>
          setSortingFunc(() => (p1, p2) => {
            if (language === 'ru')
              return p2.priceRub - (p2.discountRub || 0) - (p1.priceRub - (p1.discountRub || 0))
            else return p2.priceUsd - (p2.discountRub || 0) - (p1.priceUsd - (p1.discountRub || 0))
          }),
      },
      {
        name: tThis('options.new'),
        setterFunc: () => setFilterFunc(() => p => p.flagNew),
      },
      {
        name: tThis('options.discount'),
        setterFunc: () =>
          setFilterFunc(() => p => (language === 'ru' ? p.discountRub : p.discountUsd)),
      },
    ],
    [language, setSortingFunc, setFilterFunc]
  )

  useEffect(() => {
    options[optionsIndex].setterFunc()
  }, [options, optionsIndex])

  useEffect(() => {
    setOptionsIndex(0)
    setSortingFunc()
    setFilterFunc()
  }, [whatToShow, setOptionsIndex, setSortingFunc, setFilterFunc])

  let dropdownClasses = 'shop-sort-dropdown '
  if (isDropdowned) dropdownClasses += 'opened'

  const handleClick = (target, i, setterFunc) => {
    setOptionsIndex(i)
    target.style.height = '0px'
    setIsDropdowned(false)
    setFilterFunc()
    setSortingFunc()
    setterFunc()
    setTimeout(() => {
      target.style.height = null
    }, 500)
  }

  const onMouseEnterAndLeave = hoverIsOn
    ? {
        onMouseOver: () => setIsDropdowned(true),
        onMouseLeave: () => setIsDropdowned(false),
      }
    : {}

  return (
    <div className='shop-header'>
      <div
        className='shop-sort-button-container'
        onClick={() => {
          setIsDropdowned(() => !isDropdowned)
          btnRef.current.blur()
        }}
        {...onMouseEnterAndLeave}
      >
        <button ref={btnRef}>
          {tThis('sort_label')}
          {options[optionsIndex]['name']}
          <div className='shop-sort-arrow-box'>
            <span className='shop-sort-arrow'></span>
          </div>
        </button>
        {isDropdowned && (
          <div className={dropdownClasses}>
            {options.map(({ name, setterFunc }, i) => (
              <button
                onClick={({ currentTarget }) =>
                  handleClick(currentTarget.parentElement, i, setterFunc)
                }
                key={name}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
