require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, BDD } = process.env;
const { Sequelize } = require('sequelize');

const FavoriteModel = require ('./Favorite');
const UserModel = require ('./User');

const url = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BDD}`
const database = new Sequelize( 
   url,
   { logging: false, native: false }
);

FavoriteModel(database);
UserModel(database);


const { User, Favorite } = database.models;

User.belongsToMany(Favorite, { through: "user_favorite" })
Favorite.belongsToMany(User, { through: "user_favorite" })

module.exports = {
 //  ...database.models,
   User,
   Favorite,
   conn: database,
};
