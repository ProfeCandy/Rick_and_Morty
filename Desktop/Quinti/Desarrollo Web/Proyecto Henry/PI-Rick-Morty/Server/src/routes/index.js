const express = require ('express')
const router = express.Router()

const characterRoutes = require('../controllers/getCharById')
const favsRoutes = require('./favsRoutes')
const login = require ('../controllers/login')
const { deleteFav, postFav} = require ('../utils/favs')

router.get('/character/:id', characterRoutes);
router.get('/login', login);
router.post('/favs', postFav);
router.delete('/favs/:id', deleteFav)


module.exports = router

