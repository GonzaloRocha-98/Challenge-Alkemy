const { DataTypes, Model } = require('sequelize');
const sequelize = require('../loaders/sequelize');

class Movie extends Model {}

Movie.init({
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  creationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  calification: {
      type: DataTypes.FLOAT(10,1),
      allowNull: false
  },
  typeMovie:{
    type: DataTypes.ENUM('MOVIE', 'SERIE')
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'movies' // We need to choose the model name
});

module.exports = Movie;

const Gender = require('./Gender');
const Character = require('./Character');

Movie.belongsToMany(Gender, {
    through: 'movieAndGenders'
});

Movie.belongsToMany(Character, {
  through: 'characterAndMovies'
});