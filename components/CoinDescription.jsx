import React, { useState } from 'react'
import styles from '@/styles/Description.module.css'

const maxLength = 400

export default function CoinDescription({ name, fullDescription = '' }) {
  const [description, setDescrition] = useState({
    value: truncate(fullDescription, maxLength),
    hide: true,
    hidable: fullDescription.length > maxLength
  })
  return (
    <div className={styles.description_container}>
      <h3>About {name}</h3>
      <p
        className={`${styles.coin_description} ${description.hidable ? styles.clickable : ''}`}
        dangerouslySetInnerHTML={{ __html: description.value }}
        onClick={() => {
          if (description.hidable) {
            let newDesc = {
              hide: !description.hide,
              value: !description.hide ? truncate(fullDescription, maxLength) : fullDescription,
              hidable: true
            }
            setDescrition(newDesc)
          }
        }}
      />
    </div>
  )
}

function truncate(str, limit) {
  if (str.length > limit) {
    let short = str.slice(0, limit) + '...'
    return short
  }
  return str
}