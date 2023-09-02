const { Favorite } = require ('../models/DB_connection')

const postFav = async (req, res) => {
  try{
    console.log(req.body)
    const {name, origin, status, image, species, gender} = req.body

    if (![name, origin, status, image, species, gender].every(Boolean)) {
      return res.status(401).json({message: 'Faltan datos'})
    }

  const [ favorite, created ] = await Favorite.findOrCreate({
    where: {name, origin, status, image, species, gender}
  })

  const allFavorites = await Favorite.findAll()
    return res.status(200).json(allFavorites)

  }
  catch (error) {
    res.status(500).json({error: error.message})
}
}

module.exports = {
  postFav
}