import React, { useState, useEffect, useRef } from 'react'

import downloadInstagramImages from 'effects/downloadInstagramImages'
import { t } from 'pure-common/utils/translation'
import Slider from '../Slider'

export default function InstagramSection() {
  const [images, setImages] = useState([])
  const [width, setWidth] = useState()
  const sliderRef = useRef()

  useEffect(() => {
    downloadInstagramImages()
      .then(result => setImages(result))
      .catch(err => console.error(err))

    const slider = sliderRef.current

    if (slider) {
      function handleResize() {
        const width = slider.offsetWidth
        setWidth(width)
        stopTransitionAnimationTemorarily(slider)
      }

      handleResize()

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const sliderProps = {
    className: 'insta-slider-element',
    slides: images,
    width,
  }

  return (
    <div className='instagram-section'>
      <h5>{t('home.sections.section_instagram.title')}</h5>
      <Slider {...sliderProps} sliderRef={sliderRef} />
    </div>
  )
}

function stopTransitionAnimationTemorarily(element) {
  element.classList.add('notransition')
  setTimeout(() => element?.classList.remove('notransition'))
}
