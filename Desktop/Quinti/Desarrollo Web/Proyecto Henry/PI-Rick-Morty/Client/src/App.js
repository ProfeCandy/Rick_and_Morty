import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Landing from './components/Views/Landing'
import Home from './components/Views/Home'
import About from './components/Views/About'
import Detail from './components/Views/Detail'
import Form from './components/Forms/Form'
import Favorites from './components/Favorites/Favorites'

function App () {
  const [characters, setCharacters] = useState([])
  const onClose = (id) => {
    const filtchar = characters.filter((characters) => parseInt(characters.id) !== parseInt(id))
    setCharacters(filtchar)
  }

  const onSearch = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/rickandmorty/character/${id}`)
      const data = response.data

      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data])
      } else {
        window.alert('¡No hay personajes con este ID, Master!')
      }
    } catch (error) {
      console.error('Error in onSearch:', error)
    }
  }
  const navigate = useNavigate()
  const [access, setAccess] = useState(false)

  // const EMAIL = 'matias.quintanaballesteros@gmail.com'
  // const PASSWORD = 'Jonylaburo16'

  async function login (userData) {
    const URL = 'http://localhost:3001/rickandmorty/login/'
    try {
      const { email, password } = userData
      const response = await axios(URL + `?email=${email}&password=${password}`)
      const data = response.data

      const { access } = data
      setAccess(data)

      if (access) { navigate('/home') }
    } catch (error) {
      console.error('Login Error', error)
    }
  }

  useEffect(() => {
    !access && navigate('/')
  }, [access])

  const location = useLocation()

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav onSearch = {onSearch} /> }
        <Routes>
        <Route path ='/' element = {<Form login= {login} />} />
        <Route exacth path = '/' element= {<Landing />} />
        <Route path = '/home' element= {<Home characters={characters} onClose={onClose}/>} />
        <Route path = '/about' element= {<About />}/>
        <Route path = '/detail/:id' element= {<Detail />} />
        <Route path = '/favorites' element= {<Favorites />} />
        </Routes>

      <div className='NavBar'>
        <div className="main"></div>
        <div className="content"></div>
      </div>
    </div>
  )
}

export default App
