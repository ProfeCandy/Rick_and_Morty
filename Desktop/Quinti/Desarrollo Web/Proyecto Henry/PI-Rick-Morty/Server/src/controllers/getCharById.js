// const axios = require('axios')
// // const data = require('../utils/data')

// const getCharacterById = async (id) => {
//     // return data.find(char => char.id == id)
//     let res = await axios(`https://rickandmortyapi.com/api/character/${id}`)

//     let char = {
//         id: res.data.id,
//         name: res.data.name,
//         image: res.data.image,
//         gender: res.data.gender,
//         status: res.data.status,
//         species: res.data.species,
//         origin: res.data.origin.name
//     }

//     return char

//     // return response.then((res) => {
//     //     console.log(res)
//     //     let char = {
//     //         id: res.data.id,
//     //         name: res.data.name,
//     //         image: res.data.image,
//     //         gender: res.data.gender,
//     //         status: res.data.status,
//     //         species: res.data.species,
//     //         origin: res.data.origin.name
//     //     }

//     //     return char
//     // })
// }

// function getCharById(res, id) {
//     axios
//     .get(`https://rickandmortyapi.com/api/character/${id}`)
//       .then((response) => {
//         const character = {
//           id: id,
//           name: response.data.name,
//           gender: response.data.gender,
//           species: response.data.species,
//           origin: response.data.origin.name,
//           image: response.data.image,
//           status: response.data.status,
//         };
//         res.writeHead(200,{"content-type":"application/json"});
//         res.end(JSON.stringify(character));
//       })
//       .catch((error) => {
//           res.writeHead(500,{"content-type":"text/plain"});
//           res.end(error.message)
//       });
//   }
  

// module.exports = getCharacterById

//! --------------------------------------------------------------------------------------

const URL = "https://rickandmortyapi.com/api/character/"
const axios = require ('axios')


async function getCharById(req, res) {
  try {
    const charId = req.params.id;
    const response = await axios.get(`${URL}${charId}`);

    if (response.data.error) {
      res.status(404).json({ message: 'Not Found' });
    } else {
      const { id, status, name, species, origin, image, gender } = response.data;
      res.json({ id, status, name, species, origin:origin.name , image, gender });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching character data' });
  }
}

module.exports = getCharById

