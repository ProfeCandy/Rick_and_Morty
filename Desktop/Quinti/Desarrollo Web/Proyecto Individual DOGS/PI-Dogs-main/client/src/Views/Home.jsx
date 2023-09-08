import SearchBar from './SearchBar'
import Card from './Card'

const Home = ({ Dogdata }) => {
  const { dog } = Dogdata
  return(
    <> 
      <Card dog = {dog}/>
      <SearchBar/>
    </>
)
}

export default Home