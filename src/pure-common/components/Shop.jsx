import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ShopHeader from './ShopHeader'
import ShopNav from './ShopNav'
import ShopItems from './ShopItems'
import { getProducts } from '../utils/apiQueries'

import '../styles/Shop.css'
import { mapToQuery } from '../utils/mapToQuery'

export default function Shop({ isAdmin }) {
  const [sortingFunc, setSortingFunc] = useState()
  const [filterFunc, setFilterFunc] = useState()
  const { whatToShow } = useParams()
  const [items, setItems] = useState([])

  useEffect(() => {
    const query = mapToQuery(whatToShow)
    console.log('query: ')
    console.log(query)
    getProducts(query).then(({ data }) => setItems(data))
  }, [whatToShow])

  const itemsToShow = items
    .filter(item => item.isPublished)
    .filter(filterFunc || (() => true))
    .sort(sortingFunc)

  return (
    <div className='shop-container'>
      {/* NEED TO ADD SEARCH QUERY INPUT */}
      <ShopHeader {...{ setSortingFunc, setFilterFunc }} />
      <div className='shop-main-area'>
        <ShopNav activeUrl={whatToShow} {...{ isAdmin }} />
        <ShopItems {...{ isAdmin, items: itemsToShow }} />
      </div>
    </div>
  )
}
