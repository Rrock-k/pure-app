import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ShopHeader() {
  const [isDropdowned, setIsDropdowned] = useState(false)

  let dropdownClasses = 'shop-sort-dropdown '
  if (isDropdowned) dropdownClasses += 'opened'

  return (
    <div className='shop-header'>
      <p onClick={() => setIsDropdowned(() => !isDropdowned)}>
        Сортировка: рекомендуем
        <div className='shop-sort-arrow-box'>
          <span className='shop-sort-arrow'></span>
        </div>
        <div className={dropdownClasses}>
          <Link> рекомендуем </Link>
          <Link> цена по убыванию </Link>
          <Link> цена по возрастанию </Link>
          <Link> новинки </Link>
          <Link> по скидке </Link>
        </div>
      </p>
    </div>
  )
}
