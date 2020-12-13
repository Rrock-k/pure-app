import React from 'react'

import styles from './YesNo.module.css'

export default function YesCancel({ children, onYes, onCancel }) {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.btnsContainer}>
        <button className='btn btn-dark' type='button' onClick={onYes}>
          Да
        </button>
        <button className='btn btn-dark' type='button' onClick={onCancel}>
          Отмена
        </button>
      </div>
    </div>
  )
}
