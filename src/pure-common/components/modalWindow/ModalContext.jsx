import React from 'react'
import { useEffect } from 'react'
import handleScrollbarWidth from '../../pure-common_DO_NOT_CHANGE/utils/handleScrollbarWidth'
import styles from './ModalWindow.module.css'

const Context = React.createContext()

export default function ModalContext({ children }) {
  const [Modal, setModal] = React.useState()
  const containerRef = React.useRef()

  useEffect(() => {
    const marginIsNeeded = !!Modal
    handleScrollbarWidth(marginIsNeeded, 0)
  }, [Modal])

  useRunOnEscPress(() => setModal(null))

  return (
    <Context.Provider value={{ Modal, setModal }}>
      {Modal && (
        <div
          ref={containerRef}
          className={styles.container}
          onClick={({ target }) => {
            if (target === containerRef.current) setModal(null)
          }}
        >
          {Modal}
        </div>
      )}
      {children}
    </Context.Provider>
  )
}

export function useModalContext() {
  return React.useContext(Context)
}

function useRunOnEscPress(callBack) {
  useEffect(() => {
    const escPressHandler = e => (e.keyCode === 27 ? callBack() : null)

    document.addEventListener('keydown', escPressHandler, false)
    return () => {
      document.removeEventListener('keydown', escPressHandler)
    }
  }, [])
}
