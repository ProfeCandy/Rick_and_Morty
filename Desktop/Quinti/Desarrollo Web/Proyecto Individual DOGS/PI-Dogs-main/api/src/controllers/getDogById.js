const { Dog, Temp } = require('../db');
require('dotenv').config()
const { URL, IMG } = process.env
const axios = require ('axios')
const { validate: uuidValidate } = require ('uuid')


async function getDogById (req, res) {

  try{
    const idRaza = req.params.id;


    if (!uuidValidate(idRaza)) {
      const apires = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`)
      const response = apires.data

      console.log(response)

    if(!response){
      res.status(404).json({ message: 'Raza no encontrada'})
      return
    }

    const razaApi = {
      id: response.id,
      image: `${IMG}/${response.reference_image_id}.jpg`,
      name: response.name,
      height: response.height.metric,
      weight: response.weight.metric,
      life_span: response.life_span,
      temperament: response.temperament,
    };


    res.status(200).json(razaApi)

    } 
    else {
      const razaDB = await Dog.findByPk( idRaza , {
        include: {model: Temp, attributes: ["name"]}
    })
    
    const dogDB = {
      id: razaDB.id,
      image: razaDB.image,
      name: razaDB.name,
      height: razaDB.height,
      weight: razaDB.weight,
      life_span: razaDB.life_span,
      temperament: razaDB.Temps.map((temp) => temp.name),
    }

    res.status(200).json(dogDB)
    }

    }

  catch (error) {
    res.status(500).json( { error: 'Error al obtener el detalle de la raza'} )
  }
}

module.exports = getDogById;