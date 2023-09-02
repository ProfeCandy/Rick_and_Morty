const { User } = require('../models/DB_connection')

const login = async (req, res) => {

  try {  
    
    const {email, password } = req.query

    if (!email || !password) {
      return res.status(400).json({message: 'Faltan datos'})
    }

    const user = await User.findOne({ where: {email} })
    console.log(user)
    // const [newUser, created] = await User.findOrCreate({
    //         where: { email },
    //         defaults: { password }
    //     });

    if (!user) {
      return res.status(404).json({message: 'Usuario Existente'})
    }

    if (user.password !== password) {
      return res.status(403).json({message: 'Contraseña Incorrecta'})
    }

    return res.status(200).json({ access : true })
  } 
  catch (error) {
    return res.status(500).json({ message: error.message });
}
}

module.exports = {
  login
} 