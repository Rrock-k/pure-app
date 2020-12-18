import React from 'react'
import { contexts } from '../../config/setup'
import styles from './Cart.module.css'
import { Link } from 'react-router-dom'

import { getImageSrcFromImageName } from 'pure-common/utils/apiQueries'
import getPriceStr from 'pure-common/utils/getPriceStr'
import { t } from 'pure-common/utils/translation'
import { useLanguageContext } from 'components/contexts/LanguageContext'
import urls from 'data/urls.json'

const tThis = query => t('cart.' + query)

function mapCartToCartItemsList(cart, products) {
  return cart.items.map(item => {
    const product = products.find(product => product._id === item.productId)
    if (!product) return null

    const { _id, mainPhotoUrl, name, nameEn, discountRub = 0, discountUsd = 0 } = product

    let [priceRub, priceUsd] = mapVariationInfoToPrices(product, item.variationChosen)

    return {
      productId: _id,
      photo: getImageSrcFromImageName(mainPhotoUrl),
      variationChosen: item.variationChosen,
      name,
      nameEn,
      priceRub,
      priceUsd,
      discountRub,
      discountUsd,
      quantityInCart: item.quantity,
    }
  })
}

function mapVariationInfoToPrices(product, variationChosen) {
  const { priceRubVariations, priceUsdVariations } = product

  const idxs = variationChosen.map(obj => obj.indexOfSelected)

  let priceRub = product.priceRub,
    priceUsd = product.priceUsd

  if (priceRubVariations.length) {
    priceRub = priceRubVariations[idxs[0]][idxs[1]] ?? priceRub
    priceUsd = priceUsdVariations[idxs[0]][idxs[1]] ?? priceUsd
  }

  return [priceRub, priceUsd]
}

export default function Cart() {
  const cart = contexts.useCartContext()
  const { products } = contexts.useProductsContext()
  const { language } = useLanguageContext()
  const isRu = language === 'ru'

  if (!cart.items || !cart.items?.length) return <NoProductsInCartYet />

  try {
    const cartItemsMapped = mapCartToCartItemsList(cart, products).filter(el => el)

    if (!cartItemsMapped || !cartItemsMapped.length) return <NoProductsInCartYet />

    const totalPriceRub = cartItemsMapped?.reduce(
      (acc, item) => acc + item.quantityInCart * (item.priceRub - item.discountRub),
      0
    )
    const totalPriceUsd = cartItemsMapped?.reduce(
      (acc, item) => acc + item.quantityInCart * (item.priceUsd - item.discountUsd),
      0
    )

    const totalPriceStr = isRu ? totalPriceRub + ' ₽' : '$' + totalPriceUsd

    return (
      <div className={styles.container}>
        <li className={styles.title}>{tThis('title')}</li>
        <ProductListTable cartItemsMapped={cartItemsMapped} cart={cart} />
        <CartInfo totalPriceStr={totalPriceStr} />
        <CartButtons />
      </div>
    )
  } catch (err) {
    console.error(err)

    localStorage.removeItem('cart')

    window.location.reload()
  }
}

function ProductListTable({ cartItemsMapped, cart }) {
  const { language } = useLanguageContext()
  const isRu = language === 'ru'

  return (
    <>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>{tThis('table.headers.product')}</th>
            <th></th>
            <th>{tThis('table.headers.price')}</th>
            <th>
              <span className={styles.thQtyMobile}>{tThis('table.headers.qty')}</span>
              <span className={styles.thQty}>{tThis('table.headers.quantity')}</span>
            </th>
            <th className={styles.thSum}>{tThis('table.headers.sum')}</th>
          </tr>
        </thead>

        <tbody>
          {cartItemsMapped
            .filter(cartItem => cartItem)
            .map(
              ({
                productId,
                name,
                nameEn,
                photo,
                priceRub,
                priceUsd,
                discountRub = 0,
                discountUsd = 0,
                quantityInCart,
                variationChosen,
              }) => {
                const price = isRu ? priceRub - discountRub : priceUsd - discountUsd
                const totalPrice = price * quantityInCart
                const totalPriceStr = getPriceStr(totalPrice, language)
                const priceStr = getPriceStr(price, language)
                return (
                  <tr key={nameEn + '_' + productId}>
                    <td className={styles.tdPhoto}>
                      <Link to={`shop/products/${productId}`}>
                        <img className={styles.photo} src={photo} alt='' />
                      </Link>
                    </td>
                    <td className={styles.tdName}>
                      <p>{isRu ? name : nameEn}</p>

                      {variationChosen.map(variationChosen => {
                        return (
                          <VariationInfo
                            key={variationChosen?.variation?.name}
                            {...variationChosen}
                          />
                        )
                      })}
                    </td>
                    <td className={styles.tdPrice}>{priceStr}</td>
                    <td className={styles.tdQty}>
                      <QuantityInput
                        quantity={quantityInCart}
                        onQuantityChange={value =>
                          cart.setQuantity(productId, variationChosen, value)
                        }
                        onIncrement={value =>
                          cart.incrementQuantity(productId, variationChosen, value)
                        }
                      />
                    </td>
                    <td className={styles.tdSum}>{totalPriceStr}</td>
                  </tr>
                )
              }
            )}
        </tbody>
      </table>
    </>
  )
}

function VariationInfo({ variation, indexOfSelected }) {
  const { language } = useLanguageContext()
  const isRu = language === 'ru'

  if (!variation.options.length) var optionName = null
  else optionName = variation.options[indexOfSelected]['optionName' + (isRu ? '' : 'En')]

  const variationName = isRu ? variation.name : variation.nameEn

  return (
    <p className={styles.smallText}>
      <span>{variationName}</span>: <span>{optionName}</span>
    </p>
  )
}

function CartInfo({ totalPriceStr }) {
  return (
    <div className={styles.cartInfo}>
      <p>{tThis('info.main-text')}</p>
      <p>*{tThis('info.shipping-note')}</p>

      <h5 className={styles.totalPrice}>
        {tThis('info.total-sum')}
        <wbr />
        <span className='nowrap'>
          <span className='tab' />
          {totalPriceStr || 0}
        </span>
      </h5>
    </div>
  )
}

function CartButtons() {
  return (
    <div className={styles.btnsContainer}>
      <Link to={urls.shop} className={styles.btn}>
        {tThis('buttons.continue-shopping')}
      </Link>
      <Link to={urls.checkout} className={styles.btn}>
        {tThis('buttons.checkout')}
      </Link>
    </div>
  )
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
