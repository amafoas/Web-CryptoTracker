import { useEffect, useState } from 'react'
import MarketsTable from '@/components/MarketsTable'
import LoadingButton from '@/components/LoadingButton'
import Layout from '@/components/Layout'
import styles from '@/styles/Home.module.css'

export default function Home ({ coins, error }) {
  const [totalCoins, setTotalCoins] = useState(coins)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (error != null) {
      alert(error)
    }
  }, [error])

  return (
    <Layout title='CryptoTracker'>
      <h3 className={styles.subtitle}>Welcome to our cryptocurrency tracking website. Here you can find updated information on the value of various cryptocurrencies, which will help you make informed decisions about your investments in this ever-changing market.</h3>
      <MarketsTable coins={totalCoins} />
      <LoadingButton
        onClick={async () => {
          setIsLoading(true)
          fetchCoins(page + 1)
            .then(res => {
              if (res.error != null) {
                alert(res.error)
              } else {
                setPage(page + 1)
                // res.sort((a, b) => a.id < b.id)
                setTotalCoins(totalCoins.concat(res.coins))
              }
            })
            .finally(() => {
              setIsLoading(false)
            })
        }}
        isLoading={isLoading}
      >Load more
      </LoadingButton>
    </Layout>
  )
}

async function fetchCoins (page) {
  const fetchRes = { coins: [], error: null }
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d`)
    if (res.status === 200) {
      fetchRes.coins = await res.json()
    } else {
      fetchRes.error = 'An error occurred while connecting to the api, please try again later.'
    }
  } catch (error) {
    console.error(error)
    fetchRes.error = 'An error occurred while fetchind data from server, please try again later.'
  }
  return fetchRes
}

export async function getServerSideProps () {
  const res = await fetchCoins(1)
  return { props: { ...res } }
}
