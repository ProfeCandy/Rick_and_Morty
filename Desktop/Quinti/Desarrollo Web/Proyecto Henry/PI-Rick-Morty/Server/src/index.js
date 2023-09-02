const express = require ('express')
const server = express()
const cors = require('cors')
const routes = require('./routes/index')
const PORT = 3001
// const appServer = require('./app')
const morgan = require('morgan')
const { conn } = require('./models/DB_connection')


conn.sync({ force : true})
  .then (() => {
    server.listen(PORT, () => {
    console.log('Server raised in port: ' + PORT)

})
})
  .catch((error) => console.log(error))

server.use(cors())
server.use(morgan('dev'))

server.use(express.json())
server.use('/rickandmorty', routes)

