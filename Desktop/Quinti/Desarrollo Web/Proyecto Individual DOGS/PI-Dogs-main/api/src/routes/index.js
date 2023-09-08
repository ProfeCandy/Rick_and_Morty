const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogRoutes  = require ('../controllers/getDogById')
const { getAllDog } = require ('../controllers/getAllDog')
const { dogName } = require ('../controllers/dogsName')
const { newDog } = require('../controllers/newDog')
const { dogtemp } = require('../controllers/dogtemp')


const router = Router();

router.get('/dogs', getAllDog);
router.get('/dogs/:id', dogRoutes);
router.get('/dogs/name', dogName)
router.post('/dogs', newDog)
router.get('/temperaments', dogtemp)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
