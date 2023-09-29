const { Temp } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { URL } = process.env;

async function dogtemp(req, res) {
  try {
    const response = await axios.get(URL);

    if (!response.data || response.data.length === 0) {
      return res.status(400).json({ error: 'No se encontraron Temperamentos en la API.' });
    }

    const allTemperaments = response.data
      .flatMap((dog) => {
        if (dog.temperament) {
          return dog.temperament.split(',').map((temp) => temp.trim());
        }
        return [];
      })
      .filter((temp, index, self) => self.indexOf(temp) === index);

    // Filtrar los temperamentos indefinidos (undefined)
    const filteredTemperaments = allTemperaments.filter((temp) => temp !== 'undefined');

    // Guardar los temperamentos en la base de datos
    await Promise.all(
      filteredTemperaments.map(async (temp) => {
        await Temp.findOrCreate({ where: { name: temp } });
      })
    );

    const tempDB = await Temp.findAll();

    return res.status(200).json(tempDB);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener y guardar temperamentos.' });
  }
}

module.exports = {
  dogtemp,
};