const { DataTypes, Model } = require('sequelize');
const sequelize = require('../loaders/sequelize');
const Gender = require('./Gender');
const Film = require('./Film');

class FilmAndGender extends Model {}

FilmAndGender.init({
  // Model attributes are defined here

  idFilm:  {
      type: DataTypes.INTEGER,
      references: {
          model: Film,
          key: 'id'
      }
  },
  idGender: {
      type: DataTypes.INTEGER,
      references: {
          model: Gender,
          key: 'id'
      }
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'filmAndGender' // We need to choose the model name
});

module.exports = FilmAndGender;