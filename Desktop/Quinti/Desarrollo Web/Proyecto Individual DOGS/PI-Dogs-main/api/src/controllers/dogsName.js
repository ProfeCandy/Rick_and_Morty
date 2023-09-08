const { Dog } = require('../db');
const axios = require ('axios');
require('dotenv').config()
const { URL } = process.env


async function dogName (req, res) {
  try {
    const nameQuery = req.query.Nombre;

    const db = await Dog.findAll({
      where: { nombre: {[Op.iLike]: `%${nameQuery}%` }}
    })

    const api = await axios.get(`${URL}/search?q=${nameQuery}`)
    const result = [...db, ...api]

    if (result.length === 0) {
      res.status(404).json({ message: 'No se encontraron razas con ese nombre'})
      return
    }
    res.json(result)
  }
  catch (error) {
    res.status(500).json( {error: 'Error al obtener el nombre del perro'} )
  }
}

module.exports = {
  dogName
}