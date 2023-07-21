import style from './card.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addfav, removefav } from '../../Redux/Actions'

function Card ({ character, onClose }) {
  const { name, status, species, gender, origin, image, id } = character

  const myFavorites = useSelector((state) => state.myFavorites)

  const dispatch = useDispatch()

  const isFav = myFavorites.some((fav) => fav.id === id)

  const handleFavorite = () => {
    if (isFav) {
      dispatch(removefav(id))
    } else {
      dispatch(addfav(character))
    }
  }

  return (
    <div className={style.Container}>
      <button className={style.CloseButton} onClick={onClose}>X</button>
      <Link to={`/detail/${id}`}>
        <h2 className={style.Containerh2}>{name}</h2>
      </Link>
      <h2 className={style.Containerh2}>{status}</h2>
      <h2 className={style.Containerh2}>{species}</h2>
      <h2 className={style.Containerh2}>{gender}</h2>
      <h2 className={style.Containerh2}>{origin.name}</h2>
      <img className={style.Containerimg} src={image} alt='Image Not Found' />
      {isFav
        ? (
          <button className={`${style.FavButton} ${style.FavButtonActive}`} onClick={handleFavorite}>❤️</button>
          )
        : (
          <button className={style.FavButton} onClick={handleFavorite}>🤍</button>
          )}
    </div>
  )
}

export default Card
