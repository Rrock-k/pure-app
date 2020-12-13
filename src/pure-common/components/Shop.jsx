import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import ShopHeader from './ShopHeader'
import ShopNav from './ShopNav'
import ShopItems from './ShopItems'
import { useProductsContext } from './ProductsContext'

import '../styles/Shop.css'

export default function Shop({ isAdmin }) {
  const [sortingFunc, setSortingFunc] = useState()
  const [filterFunc, setFilterFunc] = useState()
  const { whatToShow } = useParams()
  const { getProducts } = useProductsContext()

  let items
  if (typeof whatToShow === 'undefined') {
    console.log('whatToShow is undefined')
    items = getProducts({ whatToShow: null })
  } else {
    items = getProducts({ whatToShow })
  }

  items = items
    .filter(item => item.isPublished)
    .filter(filterFunc || (() => true))
    .sort(sortingFunc)

  return (
    <div className='shop-container'>
      {/* NEED TO ADD SEARCH QUERY INPUT */}
      <ShopHeader {...{ setSortingFunc, setFilterFunc }} />
      <div className='shop-main-area'>
        <ShopNav activeUrl={whatToShow} {...{ isAdmin }} />
        <ShopItems {...{ isAdmin, items }} />
      </div>
    </div>
  )
}
