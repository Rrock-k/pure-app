import React from 'react'

export default function ShopItem({ mainPhotoSrc, secondPhotoSrc, name, priceRub }) {
  return (
    <div className='shop-item'>
      <div className='shop-item-image-div'>
        {secondPhotoSrc && (
          <img className='shop-item-image-second' src={secondPhotoSrc} alt={name} />
        )}
        <img className='shop-item-image-first' src={mainPhotoSrc} alt={name} />
      </div>
      <div className='shop-item-text'>
        <p>{name}</p>
        {priceRub && <p>{priceRub} р.</p>}
      </div>
    </div>
  )
}
