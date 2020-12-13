import React from 'react'

import styles from './ModalWindow.module.css'

export default function ModalWindow() {
  const Component = useModalContext()

  return <div className={styles.container}>Модальное окно</div>
}
