import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import * as apiQueries from './utils/apiQueries'
import { mapToQuery } from './utils/mapToQuery'

const Context = createContext()

export function ProductsContext({ children }) {
  const [products, setProducts] = useState([])

  const getProducts = useCallback(
    ({ whatToShow }) => {
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
    },
    [products]
  )

  const getProductById = useCallback(
    id => {
      if (!products) return null
      const result = products.find(product => product._id === id)
      return result
    },
    [products]
  )

  useEffect(() => {
    let products
    apiQueries.getProducts().then(res => {
      products = res.data
      console.log('Products list is fetched from server')
      setProducts(products)
    })
  }, [])

  console.log('ProductsContext is rendering')
  return (
    <Context.Provider value={{ products, setProducts, getProducts, getProductById }}>
      {children}
    </Context.Provider>
  )
}

export function useProductsContext() {
  return useContext(Context)
}
