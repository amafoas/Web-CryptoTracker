import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/CoinConverter.module.css'

export default function CoinConverter({ symbol, price, image }) {
  const [convertedPrice, setConvertedPrice] = useState(0)

  return (
    <div className={styles.calculator_container}>
      <h3>{symbol.toUpperCase()} to USD Converter</h3>
      <div className={styles.calculator_prices}>
        <div className={styles.price_left}>
          <Image
            src={image.large}
            width={40} height={40}
            alt='coin logo'
          />
          <input
            className={styles.price_input}
            type="text"
            placeholder="0"
            pattern="[0-9]*"
            onChange={e => {
              if (!isNaN(e.target.value)) {
                const n = Number(e.target.value)

                let res = n * price
                setConvertedPrice(res)
              } else {
                setConvertedPrice(0)
              }
            }}
          />
          <p className={styles.symbol}>{symbol.toUpperCase()}</p>
        </div>
        <div className={styles.price_right}>
          <p className={styles.converted_price}>{convertedPrice}</p>
          <p className={styles.converted_symbol}>USD</p>
        </div>
      </div>
    </div>
  )
}