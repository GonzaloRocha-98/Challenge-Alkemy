const { DataTypes, Model } = require('sequelize');
const sequelize = require('../loaders/sequelize');

class User extends Model {}

User.init({
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  name: {
      type: DataTypes.STRING(50),
      allowNull: true
  },
  email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'users' // We need to choose the model name
});

module.exports = User;