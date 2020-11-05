import React from 'react'
import { createRef } from 'react'
import { useState } from 'react'
import { contexts } from '../config/setup'
import { t } from './utils/translation'

const btnRef = createRef()

const { useLanguageContext } = contexts

const tThis = path => t('shop.header.' + path)

export default function ShopHeader({ setSortingFunc, setFilterFunc }) {
  const [isDropdowned, setIsDropdowned] = useState(false)
  const [optionsIndex, setOptionsIndex] = useState(0)
  const { language } = useLanguageContext()

  let dropdownClasses = 'shop-sort-dropdown '
  if (isDropdowned) dropdownClasses += 'opened'

  const options = [
    {
      name: tThis('options.recommend'),
      setterFunc: () => setSortingFunc(),
    },
    {
      name: tThis('options.price_asc'),
      setterFunc: () => setSortingFunc(() => (p1, p2) => p1.priceRub - p2.priceRub),
    },
    {
      name: tThis('options.price_desc'),
      setterFunc: () => setSortingFunc(() => (p1, p2) => p2.priceRub - p1.priceRub),
    },
    {
      name: tThis('options.new'),
      setterFunc: () => setFilterFunc(() => p => p.flagNew),
    },
    {
      name: tThis('options.discount'),
      setterFunc: () => setFilterFunc(() => p => p.flagDiscount),
    },
  ]

  const handleClick = (target, i, setterFunc) => {
    console.log(target)
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

  return (
    <div className='shop-header'>
      <div
        className='shop-sort-button-container'
        onClick={() => {
          setIsDropdowned(() => !isDropdowned)
          btnRef.current.blur()
        }}
      >
        <button ref={btnRef}>
          {tThis('sort_label')}
          {options[optionsIndex]['name']}
          <div className='shop-sort-arrow-box'>
            <span className='shop-sort-arrow'></span>
          </div>
        </button>
        <div className={dropdownClasses}>
          {options.map(({ name, setterFunc }, i) => (
            <button
              onClick={({ currentTarget }) =>
                handleClick(currentTarget.parentElement, i, setterFunc)
              }
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
