import React from 'react'
import styles from '../styles/LoadingButton.module.css'

export default function LoadingButton({ children, onClick, isLoading }) {
  return (
    <button
      className={styles.loading_btn}
      type='button'
      onClick={onClick}
      disabled={isLoading}
    >{isLoading ? 'Loading...' : children}</button>
  )
}