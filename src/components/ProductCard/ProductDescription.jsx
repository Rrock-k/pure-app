import React, { useState } from 'react'
import { contexts } from '../../config/setup'
import PriceElement from '../../pure-common/components/PriceElement'
import Variation from './Variation'

const { useLanguageContext, useCartContext } = contexts

export default function ProductDesctiption({ product }) {
  const { language } = useLanguageContext()
  const cart = useCartContext()

  const [quantity, setQuantity] = useState(1)
  const [selected0, setSelected0] = useState(
    product.variations?.length && product.variations[0].options?.length > 1 ? null : 0
  )
  const [selected1, setSelected1] = useState(
    product.variations?.length > 1 && product.variations[1].options?.length > 1 ? null : 0
  )

  const selected = [selected0, selected1]
  const setSelected = [setSelected0, setSelected1]

  const variationChosen = []

  if (product.variations?.length) {
    const var0 = product.variations[0]
    const var1 = product.variations[1]

    if (var0 && selected0 != null)
      variationChosen.push({ variation: var0, indexOfSelected: selected0 })
    if (var1 && selected1 != null)
      variationChosen.push({ variation: var1, indexOfSelected: selected1 })
  }

  const quantityVary = product.variations?.reduce(
    (acc, variation) => acc || variation.quantityVary,
    false
  )
  const numberInStock = quantityVary
    ? product.quantityVariations
        ?.reduce((acc, row) => [...acc, ...row])
        .map(el => el ?? product.quantity)
        .reduce((acc, value) => acc + value)
    : product.quantity

  function handleQuantityChange({ target: { value } }) {
    if (value > 0) setQuantity(value)
    else if (value === '') setQuantity(value)
  }

  function handleAddToCart() {
    const cartItem = { productId: product._id, variationChosen, quantity }
    cart.add(cartItem)
  }

  const handleBlur = ({ target: { value } }) => !value && setQuantity(1)

  const increment = () => setQuantity(prev => parseInt(prev) + 1)
  const decrement = () => setQuantity(prev => (prev - 1 > 0 ? parseInt(prev - 1) : prev))

  if (product.priceRubVariations.length && selected0 != null && selected1 != null) {
    var priceRub = product.priceRubVariations[selected0][selected1]
    var priceUsd = product.priceUsdVariations[selected0][selected1]
  }
  const { discountRub, discountUsd } = product

  const propsPriceElement =
    priceRub && priceUsd ? { priceRub, priceUsd, discountRub, discountUsd } : { ...product }

  return (
    <div className='product-info'>
      <h3 className='product-info-label'>{language === 'ru' ? product.name : product.nameEn}</h3>
      {numberInStock ? (
        <li>в наличии</li>
      ) : product.flagPreorder ? (
        <li>предзаказ</li>
      ) : (
        <li>нет в наличии</li>
      )}
      <PriceElement {...propsPriceElement} />
      <details>
        <summary className='product-info-shipping'>
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
        <button
          className='product-info-add-to-cart-btn'
          type='button'
          onClick={handleAddToCart}
          disabled={variationChosen.length !== product.variations.length}
        >
          ДОБАВИТЬ В КОРЗИНУ
        </button>
        {variationChosen.length !== product.variations.length && (
          <span className='product-info-choose-variations-alert'>
            прежде чем добавить в корзину, необходимо выбрать вариации
          </span>
        )}
      </div>

      {product.variations.map((variation, i) => (
        <Variation
          key={variation.nameEn}
          product={product}
          index={i}
          selected={selected[i]}
          setSelected={setSelected[i]}
        />
      ))}

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
