import React from 'react'

export default function Thumbs({ images, alt, setNewPage, setNoTransition }) {
  return (
    <div className='product-slider-thumbs'>
      {images.map((image, i) => {
        return (
          <img
            alt={`${alt}, number ${i + 1}`}
            key={image}
            src={image}
            className='product-slider-thumb-image'
            onClick={() => {
              setNoTransition(true)
              setNewPage(i + 1)
              setTimeout(() => setNoTransition(false), 0)
            }}
          />
        )
      })}
    </div>
  )
}
