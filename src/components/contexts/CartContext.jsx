import React, { createContext, useContext, useState } from 'react'

const Context = createContext({})

export function CartContext({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart')) || [])

  localStorage.setItem('cart', JSON.stringify(items))

  const add = (productId, quantity = 1) => {
    if (typeof quantity !== 'number') throw new Error('cannot set quantity to non-number value')
    if (quantity <= 0) quantity = 1
    let item = items.find(item => item.productId === productId)
    console.log(item)
    if (item) item.quantity += quantity
    else item = { productId, quantity, additionDate: new Date() }

    setItems(items => [...items, item])
  }

  const remove = productId => setItems(items => items.filter(item => item.productId !== productId))

  const incrementQuantity = (productId, payload) => {
    setItems(items =>
      items.map(item => {
        const newQty = item.quantity + (parseInt(payload) || 1)
        if (newQty <= 0) remove(productId)
        if (item.productId === productId) return { ...item, quantity: newQty }
      })
    )
  }

  const setQuantity = (productId, payload) => {
    setItems(items =>
      items.map(item => {
        const newQty = parseInt(payload) || 1
        if (newQty <= 0) remove(productId)
        if (item.productId === productId) return { ...item, quantity: newQty }
      })
    )
  }

  console.log('CartContext code executed')

  return (
    <Context.Provider value={{ items, add, remove, setQuantity, incrementQuantity }}>
      {children}
    </Context.Provider>
  )
}

export function useCartContext() {
  return useContext(Context)
}
