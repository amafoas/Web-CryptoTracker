import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from '@/styles/FavButton.module.css'

export default function FavButton({ coin_id }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  return (
    <button
      className={styles.currency_fav_btn}
      onClick={() => {
        if (favorites.includes(coin_id)) {
          setFavorites(favorites.filter(id => id !== coin_id))
        } else {
          setFavorites([...favorites, coin_id])
        }
      }}
    >{favorites.includes(coin_id) ? <>&#9733;</> : <>&#9734;</>}</button>
  )
}

