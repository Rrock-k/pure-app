import React from 'react'

const Banner = props => {
  return (
    <div className='banner-container'>
      <div className='banner-text-container'>
        <h1 className='banner-text'>{'text'}</h1>
        {/* <h1 className='banner-text'>новая коллекция кимоно</h1> */}
        <h1 className='banner-text-small'>{'small-text'}</h1>
        {/* <h1 className='banner-text-small'>готова к предзаказу</h1> */}
      </div>
    </div>
  )
}

export default Banner
