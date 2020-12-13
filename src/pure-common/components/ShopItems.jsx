import React, { useEffect, useState } from 'react'
import { ShopItem } from './ShopItem'

export default function ShopItems({ isAdmin = false, items }) {
  const [shopItemRows, setShopItemRows] = useState([])

  useEffect(() => {
    if (items.length === 0) return setShopItemRows([])
    let resultArray = []
    items.forEach((item, index) => {
      if (index % 2 === 0) resultArray.push([item])
      else resultArray[Math.floor(index / 2)].push(item)
    })

    const lastItemRow = resultArray[resultArray.length - 1]
    const secondChildIsBlank = !lastItemRow[1]
    if (secondChildIsBlank) lastItemRow.push(null)

    setShopItemRows(resultArray)
  }, [items])

  return (
    <div className='shop-items'>
      {shopItemRows.map(([product1, product2]) => (
        <div className='shop-item-row' key={`${product1?._id}${product2?._id}`}>
          <ShopItem {...product1} isAdmin={isAdmin} />
          {product2 ? (
            <ShopItem {...product2} isAdmin={isAdmin} />
          ) : (
            <div className='shop-item'></div>
          )}
        </div>
      ))}

      {Array(shopItemRows.length || 1 - 1) // blank divs to fill space and make flex work properly
        .fill()
        .map((_, i) => (
          <div className='shop-item-row' key={i} />
        ))}
    </div>
  )
}
