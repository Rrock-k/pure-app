import React, { useEffect, useState } from 'react'

import img from '../assets/images/banner/main-banner.png'
import img1 from '../assets/images/models/earrings-crystal.png'
import img2 from '../assets/images/models/earrings-crystal2.png'
import img3 from '../assets/images/models/earrings-crystal3.png'
import { t } from '../pure-common/utils/translation'

import Slider from './Slider'

const tThis = path => t('home.main_slider.' + path)

function MainSlider() {
  useEffect(() => {
    console.log('MainSlider did mount')
    return () => {
      console.log('MainSlider did unmount')
    }
  }, [])

  const [images, setImages] = useState([img1, img, img2, img, img3, img, img3])
  const [width, setWidth] = useState()
  const [pagesCount, setPagesCount] = useState()

  useEffect(() => {
    const slider = document.getElementById(sliderProps.className)
    if (!slider) return () => {}

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
  }, [])

  const sliderProps = {
    heightToWidthFactor: 1.2,
    className: 'main-slider',
    additionalElements: [
      null,
      <h5 className='slider-subtitle'>{tThis('earrings_crystal_clear')}</h5>,
      <h5 className='slider-subtitle'>{tThis('kimono')}</h5>,
      <h5 className='slider-subtitle'>{tThis('earrings_crystal_clear')}</h5>,
      <h5 className='slider-subtitle'>{tThis('earrings_crystal_clear')}</h5>,
    ],
  }

  const isRendering = images?.length > 0 && width

  return (
    <div className='slider-container'>
      {isRendering && <h3>{tThis('title')}</h3>}
      <Slider {...sliderProps} {...{ width, images, pagesCount }} />
    </div>
  )
}

export default MainSlider

function stopTransitionAnimationTemorarily(element) {
  element.classList.add('notransition')
  setTimeout(() => element?.classList.remove('notransition'))
}

function getPagesCount(width) {
  if (width > 1300) return 5.4
  if (width > 1000) return 3.8
  if (width / window.innerHeight > 1.5) return 4
  if (width > 700) return 3.6
  if (width / window.innerHeight > 0.9) return 2
  return 1.4
}
