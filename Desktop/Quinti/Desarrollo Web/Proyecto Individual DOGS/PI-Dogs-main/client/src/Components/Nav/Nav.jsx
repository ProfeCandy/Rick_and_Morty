import { Link } from 'react-router-dom'
import styles from './Nav.module.css'


const NavBar = () => {
  return (
    <nav className={styles.navbar}> 
      <Link to="/" className={styles['navbar-logo']}>Dog World</Link> 
      <ul className={styles['navbar-menu']}> 
        <li className={styles['navbar-menu-item']}>
          <Link to="/home">Home</Link>
        </li>
        <li className={styles['navbar-menu-item']}>
          <Link to="/form">Crear Raza</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar