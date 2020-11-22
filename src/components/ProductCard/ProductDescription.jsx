import React, { useState } from 'react'
import { contexts } from '../../config/setup'
import PriceElement from '../../pure-common/PriceElement'

const { useLanguageContext } = contexts

export default function ProductDesctiption({ product }) {
  const [quantity, setQuantity] = useState(1)
  const { language } = useLanguageContext()

  function handleQuantityChange({ target: { value } }) {
    if (value > 0) setQuantity(value)
    else if (value === '') setQuantity(value)
  }

  const handleBlur = ({ target: { value } }) => !value && setQuantity(1)

  const increment = () => setQuantity(prev => parseInt(prev) + 1)
  const decrement = () => setQuantity(prev => (prev - 1 > 0 ? parseInt(prev - 1) : prev))

  return (
    <div className='product-info'>
      <h3 className='product-info-label'>{language === 'ru' ? product.name : product.nameEn}</h3>
      {product.flagPreorder ? <li>предзаказ</li> : <li>в наличии</li>}
      <PriceElement {...product} />
      <details>
        <summary className='product-info-delivery'>
          <span>бесплатная доставка [узнать больше]</span>
        </summary>
        <p>Здесь нужно написать текст про то, сколько стоит доставка и от чего это зависит</p>
      </details>
      <div className='add-to-cart-form'>
        <button onClick={decrement} className='product-info-plus-btn' type='button'>
          -
        </button>
        <input
          className='product-info-quantity-input'
          min={0}
          value={quantity}
          onChange={handleQuantityChange}
          onBlur={handleBlur}
        />
        <button onClick={increment} className='product-info-minus-btn' type='button'>
          +
        </button>
        <button className='product-info-add-to-cart-btn' type='button'>
          ДОБАВИТЬ В КОРЗИНУ
        </button>
      </div>
      <p className='product-info-size'>РАЗМЕР: единый размер от XS до XL </p>
      <details>
        <summary className='product-info-sizes-information'>
          <span>[подробнее о размерах]</span>
        </summary>
        <p>
          Epcot is a theme park at Walt Disney World Resort featuring exciting attractions,
          international pavilions, award-winning fireworks and seasonal special events.
        </p>
      </details>

      <hr />
      <h3 className='product-description-header'>Информация о товаре</h3>
      <p
        className={
          product.description.length < 100
            ? 'product-description-p short-description'
            : 'product-description-p'
        }
      >
        {product.description}
      </p>
    </div>
  )
}
