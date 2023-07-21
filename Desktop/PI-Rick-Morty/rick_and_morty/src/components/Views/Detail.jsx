// Detail.js
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Detail.module.css'
import { useDispatch } from 'react-redux'
import { removefav } from '../../Redux/Actions'

const Detail = () => {
  const { id } = useParams()
  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
      if (data.name) {
        setCharacter(data)
      } else {
        window.alert('No hay personajes con ese ID, Master')
      }
    })
    return setCharacter({})
  }, [id])

  const [character, setCharacter] = useState({})
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(removefav(id))
  }

  const isFav = false // Aquí podrías verificar si el personaje está en favoritos o no

  const handleFavorite = () => {
    // Aquí podrías manejar el cambio de favorito
  }

  return (
    <div className={`${styles.Container} ${styles.card} ${styles.centered}`}>
      <button className={styles.CloseButton} onClick={handleClose}>
        X
      </button>
      <Link to={`/detail/${id}`}>
        <h2 className={styles.Containerh2}>{character.name}</h2>
      </Link>
      <h2 className={styles.Containerh2}>{character.status}</h2>
      <h2 className={styles.Containerh2}>{character.species}</h2>
      <h2 className={styles.Containerh2}>{character.gender}</h2>
      <h2 className={styles.Containerh2}>{character.origin && character.origin.name}</h2>
      <img className={styles.Containerimg} src={character.image} alt={character.name} />
      {isFav
        ? (
        <button className={`${styles.FavButton} ${styles.FavButtonActive}`} onClick={handleFavorite}>
          ❤️
        </button>
          )
        : (
        <button className={styles.FavButton} onClick={handleFavorite}>
          🤍
        </button>
          )}
    </div>
  )
}

export default Detail
