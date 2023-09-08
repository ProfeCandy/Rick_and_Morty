require('dotenv').config()
const { URL } = process.env
const axios = require ('axios')

async function getAllDog (req, res) {
  try {
    const response = await axios.get(URL)
    const dogres = response.data
    const doglist = dogres.map((dogos) =>({ breed: dogos.name }))
    return res.status(200).json(doglist)
  }
  catch (error) {
    res.status(500).json({ error: 'Error al obtener las razas'})  
  }
}

module.exports = {
getAllDog
}