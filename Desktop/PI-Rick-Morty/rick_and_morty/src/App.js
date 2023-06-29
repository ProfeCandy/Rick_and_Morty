import './App.css';
import Cards from './components/Cards.jsx';
import SearchBar from './components/SearchBar.jsx';
import characters from './data.js';

function App() {
   const onClose = () => {
      return window.alert ("Simulamos que se cierra la card");
   };
const onSearch = () => {
   return window.alert("Este es el personaje id: " + characters.id)
}
   return (
      <div className='App'>
         <SearchBar onSearch= {onSearch} />
         <Cards characters = {characters} onClose = {onClose} />
      </div>
   );
}

export default App;
