import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { Routes, Route } from 'react-router-dom';
import Landing from './Views/Landing/Landing'
import NavBar from './Components/Nav/Nav';
import Home from './Views/Home/Home';
import Detail from './Views/Detail/Detail';
import Form from './Components/Form/Form'

function App () {



  return (
    <Provider store= {store}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<> <NavBar /> <Home /> </>} />
          <Route path="/detail/:id" element={<> <Detail /> <NavBar /> </>} />
          <Route path="/form" element={ <> <NavBar /> <Form /> </> } />
        </Routes>
    </Provider>
  );
}
export default App;
