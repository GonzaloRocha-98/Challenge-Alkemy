const { DataTypes, Model } = require('sequelize');
const sequelize = require('../loaders/sequelize');

class Character extends Model {}

Character.init({
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  age: {
  type: DataTypes.INTEGER,
      allowNull: true
  },
  weight: {
      type: DataTypes.DOUBLE,
      allowNull: true
  },
  history: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'characters' // We need to choose the model name
});

module.exports = Character;

const Movie = require('./Movie');

Character.belongsToMany(Movie, {
  through: 'characterAndMovies'
})