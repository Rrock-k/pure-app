import React, { useEffect, useState } from 'react'

import left from '../../icons/chevron-left.svg'
import right from '../../icons/chevron-right.svg'

import './Slider.css'

export default function Slider({
  width,
  images = [],
  heightToWidthFactor = 1,
  additionalElements = [],
  className = 'default-slider',
  pagesCount,
}) {
  const [page, setPage] = useState(null)
  pagesCount = pagesCount || getPagesCountDefault(width)

  const {
    length,
    pagesToTheSide,
    pageWidth,
    halfWidth,
    arrowWidth,
    paddingForArrows,
  } = calculateSliderParameters(width, images, pagesCount)

  const goLeft = () => setPage(page => getNewPageNumber(page - 1, pagesCount, length))
  const goRight = () => setPage(page => getNewPageNumber(page + 1, pagesCount, length))

  useEffect(() => {
    setPage(page => getNewPageNumber(page, pagesCount, length, { afterResize: true }))
    return SetUpSliderSwipeEvents(goRight, goLeft, className, pagesCount)
  }, [pagesCount, length])

  const translateX = halfWidth - page * pageWidth + pageWidth / 2

  const template = <div className={className + ' slider'} id={className}></div>

  if (!images.length || !width || pagesCount > images.length) return template
  if (!page) {
    setPage(setInitialPage(pagesCount, images.length))
    return template
  }

  return (
    <div className={className + ' slider'} id={className}>
      <div
        className='slider-movable-container'
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={'slide ' + className}
            style={{
              width: `${pageWidth}px`,
            }}
          >
            <div
              className='slide-image-container'
              style={{
                height: `${heightToWidthFactor * pageWidth}px`,
              }}
            >
              <img
                draggable={false}
                src={image}
                alt={`Slide ${index + 1}`}
                className={'slide-image ' + className}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
            {additionalElements[index]}
          </div>
        ))}
      </div>

      <div
        id='insta-goLeft'
        className={'btn-slider ' + className}
        onClick={() => goLeft()}
        style={{
          height: `${heightToWidthFactor * pageWidth}px`,
          filter: page <= pagesToTheSide + 1 && `invert(40%)`,
          padding: `0 ${paddingForArrows}px`,
        }}
      >
        <img
          className={'arrow-icon ' + className}
          src={left}
          alt='SHOW PREVIOUS'
          style={{ width: `min(4vw, ${arrowWidth}px)` }}
        />
      </div>
      <div
        id='insta-goRight'
        className={'btn-slider ' + className}
        onClick={() => goRight()}
        style={{
          height: `${heightToWidthFactor * pageWidth}px`,
          filter: page + pagesToTheSide >= length && `invert(40%)`,
          padding: `0 ${paddingForArrows}px`,
        }}
      >
        <img
          className={'arrow-icon ' + className}
          src={right}
          alt='SHOW NEXT'
          style={{ width: `min(4vw, ${arrowWidth}px)` }}
        />
      </div>
    </div>
  )
}

function getPagesCountDefault(width) {
  const getCount = width => {
    // console.log('width', width)
    // console.log('window.height: ' + window.innerHeight)
    if (width > 1300) return 5.4
    if (width > 1000) return 3.8
    if (width / window.innerHeight > 2) return 5.6
    if (width / window.innerHeight > 1.5) return 4.2

    if (width > 700) return 3.6

    return 1.4
  }
  // you can insert additional conditions if needed
  return getCount(width)
}

function calculateSliderParameters(width, images, pagesCount) {
  const length = images.length

  const pagesToTheSide = getPagesToTheSide(pagesCount)

  const pageWidth = width / pagesCount

  const halfWidth = width / 2

  const ARROW_WIDTH_FACTOR = 1.7
  const wholePagesCount = Math.floor(pagesCount)
  const wholePagesWidth = wholePagesCount * pageWidth
  const arrowWidth = 20

  const paddingForArrows = arrowWidth / 3

  return { length, pagesToTheSide, pageWidth, halfWidth, arrowWidth, paddingForArrows }
}

function getPagesToTheSide(pagesCount) {
  return Math.floor((pagesCount - 1) / 2)
}

function setInitialPage(pagesCount, images) {
  const pagesToTheSide = getPagesToTheSide(pagesCount)

  return pagesToTheSide + 1
}

function getNewPageNumber(page, pagesCount, length, options) {
  const pagesToTheLeft = getPagesToTheSide(pagesCount)
  const pagesToTheRight = getPagesToTheSide(pagesCount)

  const leftmostPosition = pagesToTheLeft + 1
  const rightmostPosititon = length - pagesToTheRight

  // console.log('------------------')
  // console.log('page: ' + page)
  // console.log('pagesToTheSide: ' + pagesToTheLeft)
  // console.log('length: ' + length)
  // console.log('leftmostPosition: ' + leftmostPosition)
  // console.log('rightmostPosititon: ' + rightmostPosititon)

  if (options?.afterResize) {
    if (page < leftmostPosition) return leftmostPosition
    if (page > rightmostPosititon) return rightmostPosititon
  }

  if (page < leftmostPosition) return rightmostPosititon
  if (page > rightmostPosititon) return pagesToTheLeft + 1
  return page
}

function SetUpSliderSwipeEvents(goRight, goLeft, className, pagesCount) {
  let xInitial = 0
  let multitouch = false

  const sensitivity = 30 * Math.abs(pagesCount - 2)

  const swipeIfEnoughMovement = deltaX => {
    // console.log(deltaX)
    if (deltaX > sensitivity) return goRight()
    if (deltaX < -sensitivity) return goLeft()
  }

  const onMouseDown = e => (xInitial = e.clientX)
  const onMouseUp = e => swipeIfEnoughMovement(xInitial - e.clientX)

  const onTouchStart = e => {
    if (e.touches.length > 1) return (multitouch = true)
    xInitial = e.touches[0].clientX
    multitouch = false
  }

  const onTouchMove = e => {
    if (e.touches.length > 1) return
    const deltaX = xInitial - e.changedTouches[0].clientX
    if (Math.abs(deltaX) > 20 && e.cancelable) {
      e.preventDefault()
    }
  }

  const onTouchEnd = e => {
    if (multitouch) return
    const deltaX = xInitial - e.changedTouches[0].clientX
    swipeIfEnoughMovement(deltaX)
  }

  const slider = document.getElementById(className)
  console.log('-------------')
  console.log('addEventLisnr for ' + className)
  console.log('-------------')
  slider.addEventListener('mousedown', onMouseDown)
  slider.addEventListener('mouseup', onMouseUp)
  slider.addEventListener('touchstart', onTouchStart)
  slider.addEventListener('touchmove', onTouchMove)
  slider.addEventListener('touchend', onTouchEnd)

  return () => {
    console.log('-------------')
    console.log('removeEventLisnr')
    console.log('-------------')
    slider.removeEventListener('mousedown', onMouseDown)
    slider.removeEventListener('mouseup', onMouseUp)
    slider.removeEventListener('touchstart', onTouchStart)
    slider.removeEventListener('touchmove', onTouchMove)
    slider.removeEventListener('touchend', onTouchEnd)
  }
}
