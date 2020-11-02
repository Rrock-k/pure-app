import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import * as apiQueries from './utils/apiQueries'
import { mapToQuery } from './utils/mapToQuery'

const Context = createContext()

export function ProductsContext({ children }) {
  const [products, setProducts] = useState([])

  console.log('ProductsContext component is rendering')
  console.log(products)

  const getProducts = ({ whatToShow }) => {
    console.log(whatToShow)
    if (!products) return []
    const query = mapToQuery(whatToShow)

    // if query is empty object
    if (Object.keys(query).length === 0 && query.constructor === Object) return products

    return products.filter(product => {
      for (const key in query) {
        if (Array.isArray(product[key])) return product[key].includes(query[key])
        return query[key] === product[key]
      }
    })
  }

  useEffect(() => {
    let products
    apiQueries.getProducts().then(res => {
      products = res.data
      setProducts(products)
    })
  }, [])

  return (
    <Context.Provider value={{ products, setProducts, getProducts }}>{children}</Context.Provider>
  )
}

export function useProductsContext() {
  return useContext(Context)
}
