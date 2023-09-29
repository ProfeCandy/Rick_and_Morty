import { NavLink } from 'react-router-dom'
import styles from './Landing.module.css'

const Landing = () => {
  return (
    <>
      <img className={styles.imagen} src="https://i.pinimg.com/1200x/b2/d6/63/b2d663b4d3082b5c871b45dda7611829.jpg" alt='Imagen de perros'></img>
      <NavLink to='/home'><button>Ingresar</button></NavLink>
    </>
  )
}

export default Landing