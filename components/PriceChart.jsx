import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import styles from '../styles/PriceChart.module.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        color: "white",
      },
      grid: {
        color: "rgba(245, 245, 245, .25)",
      }
    },
    x: {
      ticks: {
        color: "white",
      },
      grid: {
        color: "rgba(245, 245, 245, .25)",
      }
    }
  },
};

export default function PriceChart({ coin_id, pageProps }) {
  const [data, setData] = useState({ labels: [], datasets: [] })
  const [days, setDays] = useState(1)

  useEffect(() => {
    let dateFormat = { month: 'numeric', }
    if (days != 1) {
      dateFormat = { ...dateFormat, day: 'numeric', }
    } else {
      dateFormat = { ...dateFormat, hour: '2-digit' }
    }

    fetchPrices(days, coin_id)
      .then(res => {
        const newData = {
          labels: res.prices.map(times => {
            const d = new Date(times[0])
            return d.toLocaleDateString("en-US", dateFormat)
          }),
          datasets: [
            {
              data: res.prices.map(prices => prices[1]),
              pointRadius: 0,
              borderColor: '#ffd700',
              borderWidth: 1.5
            },
          ]
        }
        setData(newData)
      })
  }, [days])

  return (
    <div className={styles.chart_container} {...pageProps} >
      <ul className={styles.selector}>
        <li className={days == 1 ? styles.selected : ''} onClick={() => setDays(1)}>1D</li>
        <li className={days == 7 ? styles.selected : ''} onClick={() => setDays(7)}>7D</li>
        <li className={days == 30 ? styles.selected : ''} onClick={() => setDays(30)}>1M</li>
        <li className={days == 90 ? styles.selected : ''} onClick={() => setDays(90)}>3M</li>
        <li className={days == 365 ? styles.selected : ''} onClick={() => setDays(365)}>1Y</li>
      </ul>
      <Line
        data={data}
        options={options}
      />
    </div>
  )
}


async function fetchPrices(days, id) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}${days != 1 ? '&interval=daily' : ''}`)
  const prices = await res.json()
  return prices
}