const { DataTypes, Model } = require('sequelize');
const sequelize = require('../loaders/sequelize');
const Character = require('./Character');
const Film = require('./Film');

class CharacterAndFilm extends Model {}

CharacterAndFilm.init({
  // Model attributes are defined here

  idCharacter:  {
      type: DataTypes.INTEGER,
      references: {
          model: Character,
          key: 'id'
      }
  },
  idFilm: {
      type: DataTypes.INTEGER,
      references: {
          model: Film,
          key: 'id'
      }
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'characterAndFilm' // We need to choose the model name
});

module.exports = CharacterAndFilm;