import {Link } from 'react-router-dom'
import SearchBar from './SearchBar'

const NavBar = ({ Dogdata }) => {
  return (
    <div>
      <nav>
        <Link to="/home"><p>Home</p></Link>
        <SearchBar onSearch = {Dogdata.onSearch}/>
      </nav>
    </div>
)
}

export default NavBar