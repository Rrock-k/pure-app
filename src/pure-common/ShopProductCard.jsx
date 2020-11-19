import React, { useEffect } from 'react'
import { PHOTOS_URL } from './utils/apiQueries'
import { contexts } from '../config/setup'
import { useState } from 'react'
import Slider from '../components/Slider'
const { useProductsContext } = contexts

export default function ShopProductCard({ id }) {
  const { getProductById } = useProductsContext()
  const product = getProductById(id)
  const hasVideo = false

  if (!product) return null

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

function ProductSlider({ product }) {
  const [width, setWidth] = useState()
  let images = [PHOTOS_URL + product.mainPhotoUrl]
  if (product.secondPhotoUrl) images.push(PHOTOS_URL + product.secondPhotoUrl)
  if (product.photoUrls) product.photoUrls.forEach(url => images.push(PHOTOS_URL + url))

  const sliderProps = {
    images,
    heightToWidthFactor: 1.5,
    className: 'product-slider',
    pagesCount: 1,
  }

  useEffect(() => {
    const slider = document.getElementById(sliderProps.className)
    if (!slider) return () => {}

    function handleResize() {
      const width = slider.offsetWidth
      setWidth(width + Math.random() / 100)
      stopTransitionAnimationTemorarily(slider)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [sliderProps.className])

  return <Slider width={width} {...sliderProps} />
}

function ProductDesctiption() {
  return null
}
function YouMightAlsoLike() {
  return null
}
function RecentlyViewed() {
  return null
}

function stopTransitionAnimationTemorarily(element) {
  element.classList.add('notransition')
  setTimeout(() => element?.classList.remove('notransition'))
}
