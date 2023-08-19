const express = require ('express')
const server = express()
const cors = require('cors')
const routes = require('./routes/index')

const morgan = require('morgan')

server.use(cors())
server.use(morgan('dev'))

server.use(express.json())
server.use('/rickandmorty', routes)

module.exports = server
