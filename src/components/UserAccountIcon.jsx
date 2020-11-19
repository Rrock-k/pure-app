import React from 'react'
import { useState } from 'react'
import userIcon from '../assets/icons/user-profile.svg'

import UserAccountPanel from './UserAccountPanel'

export default function UserAccountIcon() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className='navbar-item' id='user-account-navbar-item'>
      <img
        className='navbar-icon'
        src={userIcon}
        alt='User Account'
        onClick={() => setIsOpened(isOpened => !isOpened)}
      ></img>
      {isOpened && <UserAccountPanel />}
    </div>
  )
}
