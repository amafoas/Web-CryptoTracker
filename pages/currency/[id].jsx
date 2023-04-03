import Image from 'next/image'

import Layout from '@/components/Layout'
import PriceChart from '@/components/PriceChart'
import CoinConverter from '@/components/CoinConverter'
import CoinDescription from '@/components/CoinDescription'
import FavButton from '@/components/FavButton'

import styles from '@/styles/CurrencyPage.module.css'

export default function Currency({ data }) {
  const {
    id, name, symbol, image, description: { en: desc },
    market_data: {
      current_price: { usd: price },
      price_change_percentage_1h_in_currency: { usd: price_change_1h }
    },
  } = data

  return <Layout title={name}>
    <article className={styles.currency_container}>
      <div className={styles.currency_header}>
        <Image
          className={styles.currency_logo}
          src={image.large}
          width={60} height={60}
          alt={`${name} logo`}
        />
        <div className={styles.currency_name_container}>
          <h1>{name}</h1>
          <small>({symbol.toUpperCase()})</small>
          <FavButton coin_id={id} />
        </div>
        <p className={styles.price}>
          {price} US$
          <span className={price_change_1h >= 0 ? styles.green : styles.red}>
            {(price_change_1h >= 0 ? '+' : '') + price_change_1h}
          </span>
        </p>
      </div>
      <PriceChart coin_id={id} />
      <CoinConverter symbol={symbol} price={price} image={image} />
      <CoinDescription name={name} fullDescription={desc} />
    </article>
  </Layout >
}

export async function getServerSideProps(context) {
  const id = context.params.id
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`)
  const data = await res.json()
  return { props: { data: data } }
}