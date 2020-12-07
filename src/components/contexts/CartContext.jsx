import React, { createContext, useContext, useState } from 'react'

const Context = createContext({})

export function CartContext({ children }) {
  const [items, setItems] = useState(() => validate(getCartFromLocalStorage()))
  saveCartItemsInLocalStorage(items)

  const add = (productId, quantity = 1) => {
    quantity = parseInt(quantity)
    if (typeof quantity !== 'number') throw new Error('cannot set quantity to non-number value')
    if (quantity <= 0) quantity = 1

    let found
    const newItems = items.map(item => {
      if (item.productId === productId) {
        found = true
        item.quantity += quantity
      }
      return item
    })
    if (!found) newItems.push({ productId, quantity, additionDate: new Date() })

    setItems(newItems)
  }

  const remove = productId => setItems(items => items.filter(item => item.productId !== productId))

  const incrementQuantity = (productId, payload) => {
    setItems(items =>
      items
        .map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + (parseInt(payload) || 1) }
            : item
        )
        .filter(item => item.quantity >= 0)
    )
  }

  const setQuantity = (productId, payload) => {
    setItems(items => {
      const newQty = parseInt(payload) || 1
      return items
        .map(item => (item.productId === productId ? { ...item, quantity: newQty } : item))
        .filter(item => item.quantity >= 0)
    })
  }

  console.log('CartContext code executed')

  return (
    <Context.Provider value={{ items, add, remove, setQuantity, incrementQuantity, validate }}>
      {children}
    </Context.Provider>
  )
}

export function useCartContext() {
  return useContext(Context)
}

const getCartFromLocalStorage = () => JSON.parse(localStorage.getItem('cart'))
const saveCartItemsInLocalStorage = items => localStorage.setItem('cart', JSON.stringify(items))

function validate(itemsArr) {
  let valid = true
  try {
    const notValidIndexes = []
    itemsArr.forEach(({ productId, quantity }, i) => {
      if (!quantity || typeof quantity !== 'number' || !productId) notValidIndexes.push(i)
    })

    notValidIndexes.forEach(i => itemsArr.splice(i))
  } catch (err) {
    valid = false
  }
  if (valid) return itemsArr
  return []
}
