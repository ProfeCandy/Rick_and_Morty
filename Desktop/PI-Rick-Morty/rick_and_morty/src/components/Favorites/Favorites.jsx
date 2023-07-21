// En el componente Favorites
import { useSelector, useDispatch } from 'react-redux'
import { removefav } from '../../Redux/Actions'
import Card from '../Card/Card'
import style from './Favorites.module.css'

function Favorites () {
  const favorites = useSelector((state) => state.myFavorites)
  const dispatch = useDispatch()

  const handleClose = (id) => {
    dispatch(removefav(id))
  }

  return (
    <div>
      <h1>My Favorites ❤️</h1>
      <div className={style.FavoritesContainer}>
        {favorites?.map((fav) => (
          <div key={fav.id} className={style.FavoritesCard}>
            <Card character={fav} onClose={() => handleClose(fav.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites
