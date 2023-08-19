import Cards from '../Cards/Cards'
const Home = (props) => {
  const { onClose, characters } = props
  return (
<>
    <h1> Home Demo</h1>
    <Cards onClose = {onClose} characters = {characters} />

</>
  )
}

export default Home
