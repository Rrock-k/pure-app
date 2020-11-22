import React, { useEffect, useState } from 'react'

import { t } from '../../pure-common/utils/translation'

import Slider from '../Slider'

import { contexts } from '../../config/setup'
import { getImageSrcFromImageName, getProductCardUrl } from '../../pure-common/utils/apiQueries'
import { Link } from 'react-router-dom'
const { useProductsContext, useLanguageContext } = contexts

const tThis = path => t('home.main_slider.' + path)

function MainSlider() {
  useEffect(() => {
    console.log('MainSlider did mount')
    return () => {
      console.log('MainSlider did unmount')
    }
  }, [])

  // const [images, setImages] = useState([img1, img4, img2, img3, img1, img, img2, img3])

  const { getProducts } = useProductsContext()
  const [images, setImages] = useState()
  const [width, setWidth] = useState()
  const [pagesCount, setPagesCount] = useState()
  const [additionalElements, setAdditionalElements] = useState([])
  const { language } = useLanguageContext()

  useEffect(() => {
    setAdditionalElements([])
    const imagesPaths = getProducts()
      .filter((product, i) => product.isPublished && i < 9)
      .map((product, index) => {
        const imageAbsolutePath = getImageSrcFromImageName(product.mainPhotoUrl)
        setAdditionalElements(arr => [
          ...arr,
          <h5 className='slider-subtitle'>{language === 'ru' ? product.name : product.nameEn}</h5>,
        ])
        return (
          <Link
            to={getProductCardUrl(product._id)}
            key={imageAbsolutePath}
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              draggable={false}
              src={imageAbsolutePath}
              alt={`Slide ${index + 1}`}
              className={'slide-image '}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Link>
        )
      })
    setImages(imagesPaths)
  }, [getProducts, language, setAdditionalElements])

  const sliderProps = {
    width,
    images,
    pagesCount,
    heightToWidthFactor: 1.5,
    className: 'main-slider',
    additionalElements,
  }

  useEffect(() => {
    const slider = document.getElementById(sliderProps.className)
    if (slider) {
      function handleResize() {
        const width = slider.offsetWidth
        setWidth(width + Math.random() / 100)
        setPagesCount(getPagesCount(width))
        stopTransitionAnimationTemorarily(slider)
      }

      handleResize()

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [sliderProps.className])

  const isRendering = images?.length > 0 && width

  return (
    <div className='slider-container'>
      {isRendering && <h3>{tThis('title')}</h3>}
      <Slider {...sliderProps} />
    </div>
  )
}

export default MainSlider

function stopTransitionAnimationTemorarily(element) {
  element.classList.add('notransition')
  setTimeout(() => element?.classList.remove('notransition'))
}

function getPagesCount(width) {
  if (width > 1400) return 5.4
  if (width > 1000) return 5.6
  if (width / window.innerHeight > 1.5) return 4
  if (width > 700) return 3.6
  if (width / window.innerHeight > 0.9) return 2
  return 1.4
}
