const { Dog } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');
require('dotenv').config();
const { URL } = process.env;

async function dogName(req, res) {
  try {
    const { name } = req.query; 

    const db = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });


  const api = await axios.get(`${URL}/search?q=${name}`); 


    const apiDogs = api.data.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase()) 
    );

    // Mapear la respuesta de la API en el formato deseado
    const apiFilt = apiDogs.map((dog) => ({
      id: dog.id,
      name: dog.name,
      weight: dog.weight.metric,
      height: dog.height.metric,
      life_span: dog.life_span,
      temperament: dog.temperament,
      // Agrega otros campos necesarios
    }));

    const combined = [...db, ...apiFilt];

    if (combined.length === 0) {
      res.status(404).json({ message: 'No se encontraron razas con ese nombre' });
      return;
    }

    res.json(combined);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el nombre del perro' });
  }
}

module.exports = {
  dogName,
};
