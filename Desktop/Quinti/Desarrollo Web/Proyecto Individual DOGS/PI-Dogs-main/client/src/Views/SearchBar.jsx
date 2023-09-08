import { useState } from 'react'

export default function SearchBar ({ onSearch }) {
  const [id, SetId] = useState('')

  const handleChange = (event) => {
    SetId(event.target.value)
  }

  return (
    <div>
      <input type = 'search' onChange = {handleChange} value = {id}></input>
      <button onClick = {() => onSearch(id)}>Agregar</button>
    </div>
)
}