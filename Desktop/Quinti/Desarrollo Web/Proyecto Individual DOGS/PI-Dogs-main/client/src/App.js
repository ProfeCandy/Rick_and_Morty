import './App.css';
import {Routes, Route} from 'react-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Landing from './Views/Landing'
import Home from './Views/Home';
import NavBar from './Views/Nav';

const API_KEY = "live_zazd872Iftvu9m7vjiPsGlAWG5DQlWnwvPvxUEl8yR6FKeqbLPrCixhhAA4WH4DB"

function App() {
  const [Dogdata, setDog] = useState([])
  
useEffect(() => {
    axios 
      .get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
      .then((response) => {
        const dogList = response.data.results;
        const requests = dogList.map((dogos) => axios.get(dogos.url));
        Promise.all(requests) 
          .then((responses) => {
            const dogDetails = responses.map((response) => response.data);
            setDog(dogDetails);
          })
          .catch((error) => {
            console.error("Error al obtener los detalles de los Perros", error);
          });
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Perros", error);
      });
  }, []);

  const Navi = (
    <NavBar Dog= {Dogdata}/> 
)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Landing/>}/>
        <Route path= '/home' element = {<div>{Navi}<Home Dogdata = {Dogdata} /></div>} />
      </Routes>
    </div>
  );
}

export default App;
