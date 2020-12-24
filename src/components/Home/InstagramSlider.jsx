import React, { useState, useEffect, useRef } from 'react'

import downloadInstagramImages from 'effects/downloadInstagramImages'
import { t } from 'pure-common/utils/translation'
import Slider from '../Slider'

export default function InstagramSection() {
  const [images, setImages] = useState([])
  const [width, setWidth] = useState()
  const sliderRef = useRef()

  useGetInstaImagesAndMapToSlides(setImages)

  useEffect(() => {
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
      <h5>
        {t('home.sections.section_instagram.title')}{' '}
        <a
          className='instagram-section-title-link'
          href={`https://instagram.com/i.am.in.pure`}
          target='_blank'
          rel='noopener noreferrer'
        >
          @i.am.in.pure
        </a>
      </h5>
      <Slider {...sliderProps} sliderRef={sliderRef} />
    </div>
  )
}

function stopTransitionAnimationTemorarily(element) {
  element.classList.add('notransition')
  setTimeout(() => element?.classList.remove('notransition'))
}

function useGetInstaImagesAndMapToSlides(setImages) {
  useEffect(() => {
    downloadInstagramImages()
      .then(result =>
        setImages(
          result.map(({ url, instaUrl }, index) => (
            <a
              href={`https://instagram.com/p/${instaUrl}`}
              target='_blank'
              rel='noopener noreferrer'
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <img className={'slide-image'} src={url} alt={`Slide ${index + 1}`} />
            </a>
          ))
        )
      )
      .catch(err => console.error(err))
  }, [setImages])
}
