import React, { createContext, useContext, useEffect, useState } from 'react'
import _ from 'lodash'

const Context = createContext({})

export function CartContext({ children }) {
  const [items, setItems] = useState(() => getCartFromLocalStorage())
  saveCartItemsInLocalStorage(items)

  useEffect(() => {
    const interval = setInterval(() => setItems(getCartFromLocalStorage()), 1500)
    return () => clearInterval(interval)
  }, [])

  const add = ({ productId, variationChosen, quantity = 1 }) => {
    quantity = parseInt(quantity)
    if (typeof quantity !== 'number') throw new Error('cannot set quantity to non-number value')
    if (quantity < 0) quantity = 1

    let found
    const newItems = items.map(({ ...item }) => {
      if (item.productId === productId && _.isEqual(variationChosen, item.variationChosen)) {
        found = true
        item.quantity += quantity
      }
      return item
    })
    if (!found) newItems.push({ productId, variationChosen, quantity, additionDate: new Date() })

    setItems(newItems)
  }

  // const remove = productId => setItems(items => items.filter(item => item.productId !== productId))

  const incrementQuantity = (productId, variationChosen, payload) => {
    setItems(items =>
      items
        .map(item =>
          item.productId === productId && _.isEqual(variationChosen, item.variationChosen)
            ? { ...item, quantity: item.quantity + (parseInt(payload) || 1) }
            : item
        )
        .filter(item => item.quantity >= 0)
    )
  }

  const setQuantity = (productId, variationChosen, payload) => {
    setItems(items => {
      const newQty = parseInt(payload) || 1
      return items
        .map(item =>
          item.productId === productId && _.isEqual(variationChosen, item.variationChosen)
            ? { ...item, quantity: newQty }
            : item
        )
        .filter(item => item.quantity >= 0)
    })
  }

  return (
    <Context.Provider value={{ items, add, setQuantity, incrementQuantity, validate }}>
      {children}
    </Context.Provider>
  )
}

export const useCartContext = () => useContext(Context)

const getCartFromLocalStorage = () => validate(JSON.parse(localStorage.getItem('cart')))
const saveCartItemsInLocalStorage = items => localStorage.setItem('cart', JSON.stringify(items))

function validate(itemsArr) {
  let valid = true
  try {
    const notValidIndexes = []
    itemsArr.forEach(({ productId, quantity }, i) => {
      if (!quantity || typeof quantity !== 'number' || !productId) notValidIndexes.push(i)
    })

    notValidIndexes.forEach(i => itemsArr.splice(i, 1))
  } catch (err) {
    valid = false
  }
  if (valid) return itemsArr
  return []
}
