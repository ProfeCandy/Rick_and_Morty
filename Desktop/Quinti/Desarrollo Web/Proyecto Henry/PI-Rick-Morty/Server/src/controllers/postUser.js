const { User } = require ('../models/DB_connection')

const postUser = async (req, res) => {
  try {  
    const { email, password} = req.body

    if (!email || !password) {
      return res.status(400).json({message: 'Faltan datos'})
    }

    const [ user, created ] = await User.findOrCreate({
      where: {email},
      defaults: {password}
})

    if (created) {
      return res.status(201).json({message: 'Usuario creado', user})
  } else {
      return res.status(200).json({message: 'Usuario existente', user})
  }
}

  catch (error){
    res.status(500).json({error: error.message})
}
}

module.exports = {
  postUser
}