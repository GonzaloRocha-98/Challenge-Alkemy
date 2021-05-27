const { DataTypes, Model } = require('sequelize');
const sequelize = require('../loaders/sequelize');

class Film extends Model {}

Film.init({
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  calificacion: {
      type: DataTypes.DOUBLE(5),
      allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'filmes' // We need to choose the model name
});

module.exports = Film;