import React, { useEffect, useState } from 'react'

import img from '../images/banner/main-banner.png'
import img1 from '../images/models/earrings-crystal.png'
import img2 from '../images/models/earrings-crystal2.png'
import img3 from '../images/models/earrings-crystal3.png'

import Slider from './common/Slider'

const sliderProps = {
  heightToWidthFactor: 1.2,

  className: 'main-slider',

  additionalElements: [
    null,
    <h5 className='slider-subtitle'>Серьги Crystal clear</h5>,
    <h5 className='slider-subtitle'>кимоно</h5>,
    <h5 className='slider-subtitle'>Серьги Crystal clear</h5>,
    <h5 className='slider-subtitle'>Серьги Crystal clear</h5>,
  ],
}

function MainSlider() {
  const [images, setImages] = useState([img1, img, img2, img, img3, img, img3])
  const [width, setWidth] = useState()

  useEffect(() => {
    const slider = document.getElementById(sliderProps.className)
    if (!slider) return () => {}

    function handleResize() {
      const width = slider.offsetWidth
      setWidth(width)
      stopTransitionAnimationTemorarily(slider)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isRendering = images?.length > 0 && width

  return (
    <div className='slider-container'>
      {isRendering && <h3>Новые модели</h3>}
      <Slider {...sliderProps} width={width} images={images} />
    </div>
  )
}

export default MainSlider

function stopTransitionAnimationTemorarily(element) {
  element.classList.add('notransition')
  setTimeout(() => element?.classList.remove('notransition'))
}
