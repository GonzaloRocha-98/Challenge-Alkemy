const express = require('express');
const authServices = require('../services/authServices')
const Success = require('../handlers/successHandler')
const logger = require('../loaders/logger');
const {request, response} = require('express'); // es lo mismo ue hacer el /** @params */


const login = async(req = request, res = response, next) =>{

  const {email, password} = req.body;
  try {
    user = await authServices.login(email, password)
    res.json(new Success(user))

  } catch (error) {
    next(error)
  }
}


module.exports = {
  login
}
 
