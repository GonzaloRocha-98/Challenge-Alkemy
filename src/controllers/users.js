const express = require('express');
const UserServices = require('../services/userServices')
const Success = require('../handlers/successHandler')
const logger = require('../loaders/logger');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllUsers = async (req, res, next) => {  //tambien se podría usar (req = Request, res = Response)
  try {
    const user = await UserServices.findAll(req.query);    
      res.json(new Success(user));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const createUser = async (req, res, next) => {
  try {
    let user = req.body;
    user = await UserServices.save(user);

    res.status(201).json(new Success(user));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updateUser = async (req, res, next) => {
  try {
    let {id} = req.params;
    let user = req.body;
    
    const userUpdated = await UserServices.update(id, user);

    res.json(new Success(userUpdated));
    
  } catch (error) {
    next(error)
  }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getUser = async (req, res, next) => {
  try {
    let {id} = req.params;
    const user = await UserServices.findById(id)
    res.json(new Success(user));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    //const { id } = req.params;
    const user = await UserServices.deleteById(id)
  
    res.json(new Success(user));
    
  } catch (error) {
    next(error)
  }
};

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
}
 
