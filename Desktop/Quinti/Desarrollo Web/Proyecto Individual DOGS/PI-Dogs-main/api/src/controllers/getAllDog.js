require('dotenv').config()
const { URL, IMG } = process.env
const axios = require ('axios')
const { Dog, Temp } = require ('../db')

async function getAllDog (req, res) {
  try {
    const response = await axios.get(URL)
    const dogres = response.data
    const dogApilist = dogres.map((dog) =>({ 
      id: dog.id,
      image: `${IMG}/${dog.reference_image_id}.jpg`,
      name: dog.name,
      weight: dog.weight.metric,
      height: dog.height.metric,
      life_span: dog.life_span,
      temperament: dog.temperament ? dog.temperament.split(',').map((temp) => temp.trim()) : [],
    }))

    const raza = await Dog.findAll({
      include: {model: Temp, attributes: ["name"]}, 
    })

    const dogDBlist = raza.map((dog) =>({ 
      id: dog.id,
      image: dog.image,
      name: dog.name,
      weight: dog.weight,
      height: dog.height,
      life_span: dog.life_span,
      temperament: dog.Temps.map((temp) => temp.name),
      createdInDb: dog.createdInDb
      }));

    const dogs = [...dogDBlist, ...dogApilist]

    return res.status(200).json(dogs)
  }
  catch (error) {
    res.status(500).json({ error: 'Error al obtener las razas'})  
  }
}

module.exports = {
getAllDog
}