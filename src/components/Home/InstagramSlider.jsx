import React, { useState, useEffect } from 'react'

import downloadInstagramImages from '../../effects/downloadInstagramImages'
import { t } from '../../pure-common/utils/translation'
import Slider from '../Slider'

const sliderProps = {
  className: 'insta-slider-element',
}

export default function InstagramSection() {
  const [images, setImages] = useState([])
  const [width, setWidth] = useState()

  useEffect(() => {
    async function getImages() {
      const images = await downloadInstagramImages()
      setImages(images)
    }
    getImages()

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

  return (
    <div className='instagram-section'>
      <h5>{t('home.sections.section_instagram.title')}</h5>
      <Slider {...sliderProps} width={width} images={images} />
    </div>
  )
}

function stopTransitionAnimationTemorarily(element) {
  element.classList.add('notransition')
  setTimeout(() => element?.classList.remove('notransition'))
}
