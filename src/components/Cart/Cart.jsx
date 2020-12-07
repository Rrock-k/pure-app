import React from 'react'
import { contexts } from '../../config/setup'
import styles from './Cart.module.css'

import { Link } from 'react-router-dom'
import { PHOTOS_URL } from '../../pure-common/utils/apiQueries'
import { t } from '../../pure-common/utils/translation'

const tThis = query => t('cart.' + query)

function mapCartToProductsList(cart, products) {
  const productIds = cart.items.map(item => item.productId)
  const quantities = cart.items.map(item => item.quantity)

  return products
    .filter(product => productIds.includes(product._id))
    .map(({ _id, mainPhotoUrl, name, nameEn, priceRub, priceUsd, discountRub, discountUsd }) => {
      return {
        id: _id,
        cartItem: cart.items.find(item => item.productId === _id),
        photo: PHOTOS_URL + mainPhotoUrl,
        name,
        nameEn,
        priceRub,
        priceUsd,
        discountRub,
        discountUsd,
        quantityInCart: quantities[productIds.indexOf(_id)],
      }
    })
}

export default function Cart() {
  const cart = contexts.useCartContext()
  const { products } = contexts.useProductsContext()

  if (!cart.items || !cart.items?.length) return <NoProductsInCartYet />

  const cartProducts = mapCartToProductsList(cart, products)

  if (!cartProducts.length) return <NoProductsInCartYet />

  return (
    <div className={styles.container}>
      <li className={styles.title}>Ваша корзина</li>
      <ProductListTable products={cartProducts} cart={cart} />
      <CartInfo />
      <CartButtons />
    </div>
  )
}

function ProductListTable({ products, cart }) {
  return (
    <>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Продукт</th>
            <th></th>
            <th>Цена</th>
            <th>
              <span className={styles.thQtyMobile}>Кол-во</span>
              <span className={styles.thQty}>Количество</span>
            </th>
            <th className={styles.thSum}>Сумма</th>
          </tr>
        </thead>

        <tbody>
          {products
            .filter(product => product)
            .map(product => (
              <tr>
                <td className={styles.tdPhoto}>
                  <Link to={`shop/products/${product.id}`}>
                    <img className={styles.photo} src={product.photo} alt='' />
                  </Link>
                </td>
                <td className={styles.tdName}>{product.name}</td>
                <td className={styles.tdPrice}>{product.priceRub}</td>
                <td className={styles.tdQty}>
                  <QuantityInput
                    quantity={product.quantityInCart}
                    onQuantityChange={payload => cart.setQuantity(product.id, payload)}
                    onIncrement={payload => cart.incrementQuantity(product.id, payload)}
                  />
                </td>
                <td className={styles.tdSum}>{product.priceRub * product.quantityInCart}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

function CartButtons() {
  return null
}

function CartInfo() {
  return null
}

function NoProductsInCartYet() {
  return (
    <center>
      <h3>{tThis('empty_cart_message')}</h3>
    </center>
  )
}

function QuantityInput({ quantity, onQuantityChange, onIncrement }) {
  function handleQuantityChange({ target: { value } }) {
    console.log('input value is: ' + value + ' of type ' + typeof value)
    if (value > 0) onQuantityChange(parseInt(value))
    else if (value === '') onQuantityChange(null)
  }

  const handleBlur = ({ target: { value } }) => !value && onQuantityChange(1)

  return (
    <div className={styles.quantityInputContainer}>
      <button onClick={() => onIncrement(1)} className={styles.minusBtn} type='button'>
        +
      </button>

      <input
        className={styles.quantityInput}
        min={0}
        value={quantity}
        onChange={handleQuantityChange}
        onBlur={handleBlur}
      />

      <button onClick={() => onIncrement(-1)} className={styles.plusBtn} type='button'>
        -
      </button>
    </div>
  )
}
