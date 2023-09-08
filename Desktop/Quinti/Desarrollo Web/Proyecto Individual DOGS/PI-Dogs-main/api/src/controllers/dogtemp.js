const { Temp } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL } = process.env;

async function dogtemp(req, res) {
  try {
    const apires = await axios.get(URL);
    const breeds = apires.data;

    const allTemperaments = [];

    breeds.forEach((breed) => {
      if (breed.temperament) {
        const breedTemperaments = breed.temperament.split(',').map((temp) => temp.trim());
        allTemperaments.push(...breedTemperaments);
      }
    });

    // Eliminar duplicados y convertir a objetos para bulkCreate
    const uniqueTemperaments = [...new Set(allTemperaments)].map((name) => ({ name }));

    // Crear temperamentos en la base de datos
    await Temp.bulkCreate(uniqueTemperaments, { ignoreDuplicates: true });

    const tempDB = await Temp.findAll();
    res.json(tempDB);

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener y guardar temperamentos.' });
  }
}

module.exports = {
  dogtemp,
};