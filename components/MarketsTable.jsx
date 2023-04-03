import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/MarketsTable.module.css'

export default function MarketsTable({ coins = [], favorites = [] }) {
  const router = useRouter()

  return (
    <>
      <table className={styles.table_container}>
        <thead>
          <tr
            className={styles.table_row}
            style={{ width: "100%" }}
          >
            <th>#</th>
            <th style={{ width: "15%" }}>Coin</th>
            <th style={{ width: "10%" }}>Symbol</th>
            <th style={{ width: "15%" }}>Price</th>
            <th>1 h</th>
            <th>24 h</th>
            <th>7 d</th>
            <th>30 d</th>
          </tr>
        </thead>
        <tbody>
          {
            coins.map((coin) => {
              const {
                market_cap_rank, image, symbol, current_price, name, id,
                price_change_percentage_1h_in_currency: pcp_1h,
                price_change_percentage_24h_in_currency: pcp_24h,
                price_change_percentage_7d_in_currency: pcp_7d,
                price_change_percentage_30d_in_currency: pcp_30d
              } = coin

              return (
                <tr
                  key={id}
                  className={styles.table_row}
                  onClick={() => router.push(`/currency/${id}`)}
                >
                  <td className={styles.column_num}>{market_cap_rank}</td>
                  <td><div className={styles.column_coin}>
                    <Image
                      className={styles.logo}
                      src={image}
                      width={25} height={25}
                      alt={`${name} logo`}
                    /> {name}
                  </div></td>
                  <td className={styles.column_symbol}>{symbol.toUpperCase()}</td>
                  <td className={styles.column_price}>{current_price} US$</td>
                  <td className={pcp_1h < 0 ? styles.red : styles.green}>{pcp_1h?.toFixed(2)}%</td>
                  <td className={pcp_24h < 0 ? styles.red : styles.green}>{pcp_24h?.toFixed(2)}%</td>
                  <td className={pcp_7d < 0 ? styles.red : styles.green}>{pcp_7d?.toFixed(2)}%</td>
                  <td className={pcp_30d < 0 ? styles.red : styles.green}>{pcp_30d?.toFixed(2)}%</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <style jsx>{`
        tr:hover td {
          background-color: rgba(106, 90, 205, .5);
          cursor: pointer;
        }
      `}</style>
    </>
  )
}