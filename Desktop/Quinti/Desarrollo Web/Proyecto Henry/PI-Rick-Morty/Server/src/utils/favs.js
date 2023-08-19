let favsDB = []

function postFav (req, res) {
  const charFav = req.body
  favsDB.push(charFav)

  res.status(200).json(favsDB)
}

function deleteFav (req, res) {
  const charDel = req.params.id
  favsDB = favsDB.filter(character => character.id != charDel)
  res.json(favsDB)
}

module.exports = { 
favsDB,
postFav,
deleteFav
}