const express = require('express')
const router = express.Router()
const {save, deleteById} = require ('../controllers/handleFavorites')

router.post('/', (req, res) => {
  let {id , name, status, species, gender, origin, image} = req.body
  // let newFav = req.body
  // esto es una pequeña validacion de las cosas que me envian
  let newFav = {
    id: id,
    name: name,
    status: status,
    species: species,
    gender: gender,
    origin:origin,
    image: image,
}

  let values = Object.keys(newFav) // ["id", "name"] genera un array
  for(let i = 0; i < values.length; i++) {
    if (!newFav[values[i]]) {
      res.status(404).send("Me mandaste cualquier cosa")
    }
}

  res.status(200).send(save(newFav))
})

router.delete('/:id', (req, res) => {
  let { id } = req.params
  const favs = deleteById(id)
  req.status(200).send(favs)
})
module.exports = router