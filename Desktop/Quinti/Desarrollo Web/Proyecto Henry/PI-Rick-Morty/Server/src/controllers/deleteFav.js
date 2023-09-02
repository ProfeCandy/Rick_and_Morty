const {Favorite} = require ('../models/DB_connection')

const deleteFav = async (req, res) => {
    try {
      const { id } = req.params

      const deleted = await Favorite.destroy({
        where: { id }
    })

      if (deleted === 0) {
        return res.status(404).json({message: 'Personaje favorito no encontrado'})
    }

      const allFavorites = await Favorite.findAll()
        return res.status(200).json(allFavorites)

  } 
    catch (error) {
      res.status(500).json({error: error.message})
  }
}

module.exports = {
  deleteFav
}