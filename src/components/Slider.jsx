import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'

import left from 'assets/icons/chevron-left.svg'
import right from 'assets/icons/chevron-right.svg'

import './Slider.css'

export default function Slider({
  width,
  slides = [],
  heightToWidthFactor = 1,
  additionalElements = [],
  className = 'default-slider',
  pagesCount,
  newPage = null,
  noTransition = false,
  sliderRef,
}) {
  const [slideHeight, setSlideHeight] = useState()
  const [page, setPage] = useState(newPage)
  pagesCount = pagesCount || getPagesCountDefault(width)

  const {
    length,
    pagesToTheSide,
    pageWidth,
    halfWidth,
    arrowWidth,
    paddingForArrows,
  } = calculateSliderParameters(width, slides, pagesCount)

  const goLeft = useCallback(
    () => setPage(page => getNewPageNumber(page - 1, pagesCount, length)),
    [setPage, pagesCount, length]
  )
  const goRight = useCallback(
    () => setPage(page => getNewPageNumber(page + 1, pagesCount, length)),
    [setPage, pagesCount, length]
  )

  useEffect(() => {
    const el = document.querySelector(`.${className} .slide-image-container`)
    if (el && el.offsetHeight) setSlideHeight(el.offsetHeight)
  }, [width, pagesCount, slides, heightToWidthFactor, className])

  useEffect(() => {
    setPage(page =>
      getNewPageNumber(newPage || page, pagesCount, length, { sliderWasResized: true })
    )
    const cleanerFunction = SetUpSliderSwipeEvents(goRight, goLeft, className, pagesCount)
    return cleanerFunction
  }, [pagesCount, length, className, goLeft, goRight, newPage])

  const translateX = halfWidth - page * pageWidth + pageWidth / 2
  const classIfNoTransition = noTransition ? 'notransition' : ''

  const template = <div ref={sliderRef} className={className + ' slider'} id={className}></div>

  if (!slides.length || !width || pagesCount > slides.length) return template
  if (!page) {
    setPage(setInitialPage(pagesCount, slides.length))
    return template
  }

  return (
    <div ref={sliderRef} className={className + ' slider'} id={className}>
      <div
        className={'slider-movable-container ' + classIfNoTransition}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        {slides.map((image, index) => (
          <div
            key={index}
            className={'slide ' + className}
            style={{
              width: `${pageWidth}px`,
            }}
          >
            <div className='slide-image-container'>
              <div
                style={{
                  paddingTop: `${heightToWidthFactor * 100}%`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    overflow: 'hidden',
                  }}
                >
                  {typeof image === 'string' ? (
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
                  ) : (
                    image
                  )}
                </div>
              </div>
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
          filter: page <= pagesToTheSide + 1 && `invert(40%)`,
          padding: `0 ${paddingForArrows}px`,
          minWidth: `${pageWidth * 0.2}px`,
          height: `${slideHeight}px`,
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
          filter: page + pagesToTheSide >= length && `invert(40%)`,
          padding: `0 ${paddingForArrows}px`,
          minWidth: `${pageWidth * 0.2}px`,
          height: `${slideHeight}px`,
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
  if (width > 1300) return 5.4
  if (width > 1000) return 3.8
  if (width / window.innerHeight > 1.5) return 3.5
  if (width > 700) return 3.6
  if (width / window.innerHeight > 0.9) return 2
  return 1.4
}

function calculateSliderParameters(width, images, pagesCount) {
  const length = images.length
  const pagesToTheSide = getPagesToTheSide(pagesCount)
  const pageWidth = width / pagesCount
  const halfWidth = width / 2
  const arrowWidth = 20
  const paddingForArrows = arrowWidth / 3 + 10

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

  if (options?.sliderWasResized) {
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
  slider.addEventListener('mousedown', onMouseDown)
  slider.addEventListener('mouseup', onMouseUp)
  slider.addEventListener('touchstart', onTouchStart)
  slider.addEventListener('touchmove', onTouchMove)
  slider.addEventListener('touchend', onTouchEnd)

  return () => {
    slider.removeEventListener('mousedown', onMouseDown)
    slider.removeEventListener('mouseup', onMouseUp)
    slider.removeEventListener('touchstart', onTouchStart)
    slider.removeEventListener('touchmove', onTouchMove)
    slider.removeEventListener('touchend', onTouchEnd)
  }
}
