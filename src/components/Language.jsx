import React from 'react'
import { Link } from 'react-router-dom'

const Language = () => {
  return (
    <div className='language-switch navbar-item'>
      <a>RU</a>

      <a
        style={{
          flexShrink: '1',
          margin: '0 min(3px, 3vmin)',
          fontSize: 'min(27px, 14vh)',
        }}
      >
        I
      </a>
      <a>EN</a>
    </div>
  )
}

export default Language
