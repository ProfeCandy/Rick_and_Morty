const express = require('express');
const server = express();
const cors = require('cors')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const morgan = require('morgan');
const routes = require('./routes/index.js');
const PORT = 3001
const { conn } = require('./db.js');

require('./db.js');

conn.sync({ force : true})
  .then (() => {
    server.listen(PORT, () => {
    console.log('Server raised in port: ' + PORT)
    })
  })
  .catch((error) => console.log(error))

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());

server.use(morgan('dev'));
server.use(cors());

server.use('/', routes);
server.use(express.json())

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
