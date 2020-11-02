import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ShopHeader({ setSortingFunc, setFilterFunc }) {
  const [isDropdowned, setIsDropdowned] = useState(false)
  const [optionsIndex, setOptionsIndex] = useState(0)

  let dropdownClasses = 'shop-sort-dropdown '
  if (isDropdowned) dropdownClasses += 'opened'

  const options = [
    {
      name: 'рекомендуем',
      setterFunc: () => setSortingFunc(),
    },
    {
      name: 'цена по возрастанию',
      setterFunc: () => setSortingFunc(() => (p1, p2) => p1.priceRub - p2.priceRub),
    },
    {
      name: 'цена по убыванию',
      setterFunc: () => setSortingFunc(() => (p1, p2) => p2.priceRub - p1.priceRub),
    },
    {
      name: 'только новинки',
      setterFunc: () => setFilterFunc(() => p => p.flagNew),
    },
    {
      name: 'по скидке',
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
        onClick={e => {
          setIsDropdowned(() => !isDropdowned)
        }}
      >
        <button>
          Сортировка: {options[optionsIndex]['name']}
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
