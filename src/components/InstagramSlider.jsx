import React, { useState, useEffect, useRef } from 'react'

import downloadInstagramImages from '../effects/downloadInstagramImages'
import { t } from '../pure-common/utils/translation'
import Slider from './Slider'

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

function getPagesCount(width) {
  const getCount = width => {
    console.log('-------------------')
    console.log('width', width)
    console.log('window.height: ' + window.innerHeight)
    console.log('-------------------')
    if (width > 1300) return 5.4
    if (width > 1000) return 3.8
    if (width / window.innerHeight > 1.5) return 3.7
    if (width > 450) return 1.8

    return 1.4
  }

  return getCount(width)
}

function stopTransitionAnimationTemorarily(element) {
  element.classList.add('notransition')
  setTimeout(() => element?.classList.remove('notransition'))
}
