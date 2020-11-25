import React from 'react'
import { contexts } from '../../config/setup'
import './Cart.css'

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

  const cartProducts = mapCartToProductsList(cart, products)

  if (!cartProducts.length) return <NoProductsInCartYet />

  return (
    <div className='cart-container'>
      <li className='cart-title-li'>Ваша корзина</li>
      <ProductListTable products={cartProducts} cart={cart} />
      <CartInfo />
      <CartButtons />
    </div>
  )
}

function ProductListTable({ products, cart }) {
  return (
    <div className='cart-table-container'>
      <table className='cart-product-table'>
        <thead>
          <tr>
            <th>Продукт</th>
            <th></th>
            <th>Цена</th>
            <th>
              <span className='cart-table-th-qty-mobile'>Кол-во</span>
              <span className='cart-table-th-qty'>Количество</span>
            </th>
            <th className='cart-table-th-sum'>Сумма</th>
          </tr>
        </thead>

        <tbody>
          {products.map(product => (
            <tr>
              <td className='cart-product-photo-td'>
                <Link to={`shop/products/${product.id}`}>
                  <img className='cart-product-photo' src={product.photo} alt='' />
                </Link>
              </td>
              <td className='cart-table-td-name'>{product.name}</td>
              <td className='cart-table-td-price'>{product.priceRub}</td>
              <td className='cart-table-td-qty'>
                <QuantityInput
                  quantity={product.quantityInCart}
                  onQuantityChange={payload => cart.setQuantity(product.id, payload)}
                  onIncrement={payload => cart.incrementQuantity(product.id, payload)}
                />
              </td>
              <td className='cart-table-td-sum'>{product.priceRub * product.quantityInCart}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
  const increment = () => onIncrement(1)
  const decrement = () => onIncrement(-1)

  function handleQuantityChange({ target: { value } }) {
    console.log('input value is: ' + value + ' of type ' + typeof value)
    if (value > 0) onQuantityChange(parseInt(value))
    else if (value === '') onQuantityChange(null)
  }

  const handleBlur = ({ target: { value } }) => !value && onQuantityChange(1)

  return (
    <div className='cart-quantity-input-container'>
      <button onClick={increment} className='cart-minus-btn' type='button'>
        +
      </button>

      <input
        className='cart-quantity-input'
        min={0}
        value={quantity}
        onChange={handleQuantityChange}
        onBlur={handleBlur}
      />

      <button onClick={decrement} className='cart-plus-btn' type='button'>
        -
      </button>
    </div>
  )
}
