const { DataTypes, Model } = require('sequelize');
const sequelize = require('../loaders/sequelize');

class Gender extends Model {}

Gender.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'genders' // We need to choose the model name
});

module.exports = Gender;

const Movie = require('./Movie');

Gender.belongsToMany(Movie, {
  through: 'movieAndGenders'
});