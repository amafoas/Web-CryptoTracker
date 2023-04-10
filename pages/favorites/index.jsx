import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import MarketsTable from '@/components/MarketsTable'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export default function Favorites () {
  const [coins, setCoins] = useState([])
  const [favorites] = useLocalStorage('favorites', [])

  useEffect(() => {
    (async () => {
      if (favorites.length === 0) return
      const coinlist = favorites.join('%2C')
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinlist}&order=market_cap_desc&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d`)
      if (res.status === 200) {
        const value = await res.json()
        setCoins(value)
      }
    })()
  }, [favorites])

  return (
    <Layout title='Favorites'>
      <MarketsTable coins={coins} />
    </Layout>
  )
}
