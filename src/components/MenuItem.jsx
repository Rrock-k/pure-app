import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MenuItem(props) {
  const { to, className, children, dropdown } = props

  const [menuIsRendered, setMenuIsRendered] = useState(false)

  return (
    <div className='menu-link-div'>
      <Link
        to={to}
        className={className}
        // onMouseEnter={() => setMenuIsRendered(true)}
        // onMouseLeave={() => setMenuIsRendered(false)}
      >
        {children}
      </Link>
      {dropdown}
    </div>
  )
}
