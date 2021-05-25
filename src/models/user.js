const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name required']
  },
  lastName:   {
    type: String,
    required: [true, 'Last name required'],
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    index: true,
  },
  birthDate:{
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
    enum: ['USER_ROLE', 'ADMIN_ROLE']
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true,
  }
},
{timestamps: true } // es una propiedad para que cuando se persista un dato en mongo ademas le agrega la fecha de creacion y modificacion 
);
userSchema.plugin(uniqueValidator, {message: ' already exists on the DB'})
userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('users', userSchema);