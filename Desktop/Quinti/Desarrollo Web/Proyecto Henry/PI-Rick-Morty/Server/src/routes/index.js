const express = require ('express')
const router = express.Router()


const characterRoutes = require('../controllers/getCharById')
const { login } = require ('../controllers/login')
const { postUser} = require ('../controllers/postUser')
const { postFav } = require ('../controllers/postFav')
const { deleteFav } = require ('../controllers/deleteFav')

router.get('/character/:id', characterRoutes);
router.post('/login', postUser);
router.get('/login', login)
router.post('/favs', postFav);
router.delete('/favs/:id', deleteFav)


module.exports = router

