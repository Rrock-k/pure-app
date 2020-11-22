import React, { useEffect, useState } from 'react'
import { PHOTOS_URL } from '../../pure-common/utils/apiQueries'
import Slider from '../Slider'
import Thumbs from './Thumbs'
import { contexts } from '../../config/setup'
const { useLanguageContext } = contexts

export default function ProductSlider({ product }) {
  const [width, setWidth] = useState(window.innerWidth)
  const [newPage, setNewPage] = useState()
  const [noTransition, setNoTransition] = useState(false)
  const { language } = useLanguageContext()
  let images = [PHOTOS_URL + product.mainPhotoUrl]
  if (product.secondPhotoUrl) images.push(PHOTOS_URL + product.secondPhotoUrl)
  if (product.photoUrls) product.photoUrls.forEach(url => images.push(PHOTOS_URL + url))

  const sliderProps = {
    width,
    images,
    heightToWidthFactor: 1.5,
    className: 'product-slider',
    pagesCount: 1,
    newPage,
    noTransition,
  }

  const thumbsProps = {
    images,
    alt: language === 'ru' ? product.name : product.nameEn,
    setNewPage,
    setNoTransition,
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

  return (
    <div className='product-slider-and-thumbs-wrapper'>
      <Thumbs {...thumbsProps} />
      <div className='product-slider-container'>
        <Slider {...sliderProps} />
      </div>
    </div>
  )
}

function stopTransitionAnimationTemorarily(element) {
  element.classList.add('notransition')
  setTimeout(() => element?.classList.remove('notransition'))
}
