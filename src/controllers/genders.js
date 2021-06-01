const express = require('express');
const GenderServices = require('../services/genderServices')
const Success = require('../handlers/successHandler')
const logger = require('../loaders/logger');
const ImageService = require('../services/imageServices');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllGender = async (req, res, next) => {  
  try {
    const gender = await GenderServices.findAll(req.query.filter);    
      res.json(new Success(gender));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const createGender = async (req, res, next) => {
  try {
    let gender = req.body;
    gender = await GenderServices.save(gender);

    res.status(201).json(new Success(gender));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updateGender = async (req, res, next) => {
  try {
    let {id} = req.params;
    let gender = req.body;
    
    const genderUpdated = await GenderServices.update(id, gender);

    res.json(new Success(genderUpdated));
    
  } catch (error) {
    next(error)
  }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getGender = async (req, res, next) => {
  try {
    let {id} = req.params;
    const gender = await GenderServices.findById(id)
    res.json(new Success(gender));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const deleteGender = async (req, res, next) => {
  try {
    const id = req.params.id;
    const gender = await GenderServices.deleteById(id)
  
    res.json(new Success(gender));
    
  } catch (error) {
    next(error)
  }
};
const uploadImageGender = async(req, res, next) =>{
  try {
    res.json(new Success(await ImageService.uploadGenderImage(req.file, req.body.id), 200))
  } catch (error) {
    next(error)
  }
}

module.exports = {
    getAllGender,
    createGender,
    getGender,
    updateGender,
    deleteGender,
    uploadImageGender
}
 
