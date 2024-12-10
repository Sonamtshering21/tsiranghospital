import React from 'react'
import styles from './styles/loader.module.css'
const Loader = () => {
  return (
    <div className={styles.loader}>
  <div className={styles.box}></div>
  <div className={styles.hill}></div></div>
  )
}

export default Loader