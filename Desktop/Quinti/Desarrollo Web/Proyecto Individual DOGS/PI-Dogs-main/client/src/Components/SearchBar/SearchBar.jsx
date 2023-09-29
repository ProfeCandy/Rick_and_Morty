import { useState } from 'react'

export default function SearchBar ({ onSearch }) {

  const [searchValue, setSearchValue] = useState('')

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSearch = () => {
    if (searchValue.trim() === '') {
      window.alert('El campo de búsqueda está vacío.');
      return;
    }

    onSearch(searchValue);
  }
  return (
    <div>
      <input type='search' onChange={handleChange} value={searchValue}></input>
      <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}