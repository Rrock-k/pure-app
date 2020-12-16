import React from 'react'
import { contexts } from 'config/setup'
import ProductSlider from './ProductSlider'
import ProductDesctiption from './ProductDescription'
import { Link } from 'react-router-dom'
const { useProductsContext } = contexts

export default function ShopProductCard({ id }) {
  const { getProductById } = useProductsContext()

  const product = getProductById(id)
  const hasVideo = false

  if (!product)
    return (
      <div className='error-no-product-with-given-id'>
        <hr></hr>
        <h4>Нет продукта с таким ID</h4>
        <Link to='/shop/'>
          <button className='btn'>Смотреть все продукты</button>
        </Link>
        <hr></hr>
      </div>
    )

  return (
    <>
      <div className='shop-product-card'>
        <ProductSlider product={product} />
        {hasVideo && 'video-button'}
        <ProductDesctiption product={product} />
        <YouMightAlsoLike product={product} />
        <RecentlyViewed product={product} />
      </div>
    </>
  )
}

function YouMightAlsoLike() {
  return null
}
function RecentlyViewed() {
  return null
}
