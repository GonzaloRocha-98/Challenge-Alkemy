const express = require('express');
const authServices = require('../services/authServices');
const userService = require('../services/userServices');
const Success = require('../handlers/successHandler');
const logger = require('../loaders/logger');
const {request, response} = require('express'); // es lo mismo ue hacer el /** @params */


const login = async(req = request, res = response, next) =>{

  const {username, password} = req.body;
  try {
    user = await authServices.login(username, password)
    res.json(new Success(user))

  } catch (error) {
    next(error)
  }
}

const register = async(req = request, res= response, next) =>{
  try {
    logger.info(JSON.stringify(req.body));
    let user = req.body;
    user = await userService.save(user);
    res.status(201).json(new Success(user))
  } catch (error) {
    throw error
  }
}


module.exports = {
  login,
  register
}
 
