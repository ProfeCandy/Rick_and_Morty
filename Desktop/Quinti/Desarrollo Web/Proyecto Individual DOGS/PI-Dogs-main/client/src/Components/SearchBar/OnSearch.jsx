import axios from 'axios'

const onSearch = async (search) => {
  try{
    const response = await axios.get(`http://localhost:3001/dogs/name?Nombre=${search}`)
    const data = response.data
    return data

  }
  catch (error) {
    console.error ('Error in onSearch:', error)
    throw error
  }
}

export default onSearch