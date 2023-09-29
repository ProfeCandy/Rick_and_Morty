const { Dog, Temp } = require('../db');

async function newDog(req, res) {
  try {
    const { name, image, height, weight, life_span, temperaments } = req.body;

    // Validación de datos de entrada
    if (!name || !image || !height || !weight || !life_span || !temperaments) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // const tempdog = temperaments.split(',').map((temp) => temp.trim());

    if (temperaments.length === 0) {
      return res.status(400).json({ error: 'Al menos un temperamento es requerido' });
    }

    // Verificar si los temperamentos ya existen en la base de datos y crearlos si no
    const createdTemperaments = await Promise.all(
      temperaments.map(async (temp) => {
        const [createdTemperament] = await Temp.findOrCreate({
          where: { name: temp },
        });
        return createdTemperament;
      })
    );

    // Crear el perro en la base de datos y relacionarlo con los temperamentos
    const newDogo = await Dog.create({
      name,
      image,
      height,
      weight,
      life_span,
    });

    await newDogo.setTemps(createdTemperaments);

    const tempname = createdTemperaments.map((temp) => temp.name)

    const response = {
      name,
      image,
      height,
      weight,
      life_span,
      temperaments: tempname
    }

    return res.status(201).json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear un nuevo perro' });
  }
}

module.exports = {
  newDog,
};