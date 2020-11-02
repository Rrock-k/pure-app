import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import ShopHeader from './ShopHeader'
import ShopNav from './ShopNav'
import ShopItems from './ShopItems'
import { useProductsContext } from './ProductsContext'

import './styles/Shop.css'

const HEADER_HIDDEN = false

export default function Shop({ isAdmin }) {
  const [sortingFunc, setSortingFunc] = useState()
  const [filterFunc, setFilterFunc] = useState()
  const { whatToShow } = useParams()
  const { getProducts } = useProductsContext()

  let items = getProducts({ whatToShow })
    .filter(filterFunc || (() => true))
    .sort(sortingFunc)

  if (typeof whatToShow === 'undefined') {
    console.log('whatToShow is undefined')
    items = getProducts({ whatToShow: null })
  }
  if (!isAdmin) items = items.filter(item => item.isPublished)

  return (
    <div className='shop-container'>
      {/* NEED TO ADD SEARCH QUERY STRING */}
      {!HEADER_HIDDEN && <ShopHeader {...{ setSortingFunc, setFilterFunc }} />}
      <div className='shop-main-area'>
        <ShopNav activeUrl={whatToShow} {...{ isAdmin }} />
        <ShopItems {...{ isAdmin, items }} />
      </div>
    </div>
  )
}
