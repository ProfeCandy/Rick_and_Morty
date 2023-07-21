import { NavLink } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import style from './Nav.module.css'

function NavBar (props) {
  return (
    <nav className={style.NavBar}>
      <div className={style.buttondivLeft}>
        <NavLink to="/home"><p>Home</p></NavLink>
        <NavLink to="/about"><p>About</p></NavLink>
        <NavLink to="/favorites"><p>Favorite</p></NavLink>
      </div>
      <div className={style.SearchBarRight}>
        <SearchBar onSearch={props.onSearch} />
      </div>
    </nav>

  )
}

export default NavBar
