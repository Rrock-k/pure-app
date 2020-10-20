import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getShopItems, PHOTOS_URL, getProductsUrl } from '../../utils/apiQueries'
import { mapCategoryToQuery } from '../../utils/mapCategoryToQuery'

export default function ShopItems({ category, isAdmin = false }) {
  const [shopItemRows, setShopItemRows] = useState([])

  useEffect(() => {
    let queries = mapCategoryToQuery(category)

    if (!queries.length) queries = [queries]

    console.log('CATEGORY QUERY IS EXECUTING')

    console.log('for: ' + category)
    console.log(queries)

    Promise.all(queries.map(query => getShopItems(query))).then(responses => {
      let responsesArray = []
      responses.forEach(res => (responsesArray = [...responsesArray, ...res.data]))

      if (responsesArray.length === 0) return setShopItemRows([])
      let resultArray = []
      responsesArray.forEach((item, index) => {
        if (index % 2 === 0) resultArray.push([item])
        else resultArray[Math.floor(index / 2)].push(item)
      })

      const lastItemRow = resultArray[resultArray.length - 1]
      const secondChildIsBlank = !lastItemRow[1]
      if (secondChildIsBlank) lastItemRow.push(null)

      setShopItemRows(resultArray)
    })
  }, [category])

  return (
    <div className='shop-items'>
      {shopItemRows.map(([product1, product2]) => (
        <div className='shop-item-row'>
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
        .map(() => (
          <div className='shop-item-row'></div>
        ))}
    </div>
  )
}

function ShopItem({ _id, mainPhotoUrl, secondPhotoUrl, name, priceRub, isAdmin }) {
  return (
    <div className='shop-item'>
      <div className='shop-item-image-div'>
        {secondPhotoUrl && (
          <img className='shop-item-image-second' src={PHOTOS_URL + secondPhotoUrl} alt={name} />
        )}
        <img className='shop-item-image-first' src={PHOTOS_URL + mainPhotoUrl} alt={name} />
      </div>
      <div className='shop-item-text'>
        <p>{name}</p>
        <p>{priceRub} р.</p>
      </div>
      <div className='shop-item-link-container'>
        {isAdmin && (
          <Link to={'/product/' + _id} className='btn btn-dark btn-sm'>
            Изменить
          </Link>
        )}
      </div>
    </div>
  )
}
