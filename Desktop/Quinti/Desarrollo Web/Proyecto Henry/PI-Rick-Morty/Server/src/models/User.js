const { DataTypes } = require('sequelize');

module.exports = (database) => {
   database.define('User', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false
},
      email: {
         type: DataTypes.STRING,
         isEmail: true,
         allowNull: false
},
      password: {
         type: DataTypes.STRING,
         allowNull: false
}
}, { timestamps: false });
};
