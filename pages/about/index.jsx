import Layout from '@/components/Layout'
import Image from 'next/image'
import styles from '@/styles/About.module.css'

const LOGO_NEXT = require('@/public/next.svg')
const LOGO_COINGECKO = require('@/public/coingecko-logo.webp')

export default function index () {
  return (
    <Layout>
      <div className={styles.about_main_container}>
        <p className={styles.about_text}>This website was built using <b><a href='https://nextjs.org/'>Next.js</a></b> and the <b><a href='https://www.coingecko.com/es/api/documentation'>CoinGecko API</a></b>.</p>
        <Image alt='next logo' src={LOGO_NEXT} width={300} height={80} />
        <Image alt='coingecko logo' src={LOGO_COINGECKO} width={300} height={80} />
      </div>
    </Layout>
  )
}
