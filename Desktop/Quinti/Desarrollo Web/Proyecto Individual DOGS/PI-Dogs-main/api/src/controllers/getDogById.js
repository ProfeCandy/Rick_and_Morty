const { Dog, Temp } = require('../db');
require('dotenv').config()
const { URL } = process.env
const axios = require ('axios')



async function getDogById (req, res) {
  try{
    const idRaza = req.params.id;


    const raza = await Dog.findOne({
      where: { id: idRaza },
      include: Temp,
    })

    if(raza) {
      res.status(200).json(raza)
      return
    }

    const apires = await axios.get(`${URL}/${idRaza}`)
    if(!apires.data){
      res.status(404).json({ message: 'Raza no encontrada'})
      return
    }

    const {
      id,
      reference_image_id: image,
      name,
      height: { metric: height },
      weight: { metric: weight },
      life_span: life_span,
      temperament,
    } = apires.data;

    const razaApi = {
      id,
      image,
      name,
      height,
      weight,
      life_span,
      temperament,
    };

    res.status(200).json(razaApi)
  }
  catch (error) {
    res.status(500).json( { error: 'Error al obtener el detalle de la raza'} )
  }
}

module.exports = getDogById;