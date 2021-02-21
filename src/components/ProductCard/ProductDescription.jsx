import React, { useState } from 'react'
import classNames from 'classnames'

import { contexts } from 'config/contexts'
import PriceElement from 'pure-common/components/PriceElement'
import Variation from './Variation'

const addingStage = {
  INITIAL: 'INITIAL',
  ADDING: 'ADDING',
  JUST_ADDED: 'JUST_ADDED',
}

const addToCartButtonParams = {
  text: {
    INITIAL: 'ДОБАВИТЬ В КОРЗИНУ',
    ADDING: 'ДОБАВЛЕНИЕ...',
    JUST_ADDED: 'ДОБАВЛЕНО',
  },
  className: {
    INITIAL: '',
    ADDING: 'adding',
    JUST_ADDED: 'just-added',
  },
}

export default function ProductDesctiption({ product }) {
  const { language } = contexts.useLanguageContext()
  const cart = contexts.useCartContext()

  const [addingToCartStage, setAddingToCartStage] = useState(addingStage.INITIAL)

  const [disabledAddToCartClicked, setDisabledAddToCartClicked] = useState(false)
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

  const disabledAddToCart = variationChosen.length !== product.variations.length

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
    setDisabledAddToCartClicked(false)
    setAddingToCartStage(addingStage.ADDING)

    const cartItem = { productId: product._id, variationChosen, quantity }
    cart.add(cartItem)

    const addingToCartUXDelay = 1500
    const justAddedToCartUXDelay = 750
    setTimeout(() => {
      setAddingToCartStage(addingStage.JUST_ADDED)
      setTimeout(() => {
        setAddingToCartStage(addingStage.INITIAL)
      }, justAddedToCartUXDelay)
    }, addingToCartUXDelay)
  }

  function handleClick() {
    if (disabledAddToCart) return setDisabledAddToCartClicked(true)
    handleAddToCart()
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
      {
        <li>
          {numberInStock ? (
            <span>в наличии</span>
          ) : product.flagPreorder ? (
            <span>предзаказ</span>
          ) : (
            <span>нет в наличии</span>
          )}
        </li>
      }
      <PriceElement {...propsPriceElement} />
      <details>
        <summary className='product-info-shipping'>
          <span>бесплатная доставка [узнать больше]</span>
        </summary>
        <p>Здесь нужно написать текст про то, сколько стоит доставка и от чего это зависит</p>
      </details>
      <div className='add-to-cart-form-wrapper'>
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
            className={classNames(
              'product-info-add-to-cart-btn',
              addToCartButtonParams.className[addingToCartStage]
            )}
            type='button'
            onClick={handleClick}
            disabled={addingToCartStage !== addingStage.INITIAL}
          >
            {addToCartButtonParams.text[addingToCartStage]}
          </button>
        </div>
        {disabledAddToCartClicked && (
          <p className='product-info-choose-variations-alert'>
            прежде чем добавить в корзину, необходимо выбрать вариации
          </p>
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
      
      {(language === 'ru' ? product.description : product.descriptionEn).split('\n').map(str => {
        return <p className='product-description-p'>
          {str}
        </p>
      })}
    </div>
  )
}
