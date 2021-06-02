const express = require('express');
const CharacterServices = require('../services/characterServices')
const Success = require('../handlers/successHandler')
const logger = require('../loaders/logger');
const ImageService = require('../services/imageServices');


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllCharacter = async (req, res, next) => {  
  try {
    const character = await CharacterServices.findAll(req.query);    
      res.json(new Success(character));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const createCharacter = async (req, res, next) => {
  try {
    let character = req.body;
    
    character = await CharacterServices.save(character);

    res.status(201).json(new Success(character));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updateCharacter = async (req, res, next) => {
  try {
    let {id} = req.params;
    let character = req.body;
    
    const characterUpdated = await CharacterServices.update(id, character);

    res.json(new Success(characterUpdated));
    
  } catch (error) {
    next(error)
  }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getCharacter = async (req, res, next) => {
  try {
    let {id} = req.params;
    const character = await CharacterServices.findByIdWithMovies(id)
    res.json(new Success(character));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const deleteCharacter = async (req, res, next) => {
  try {
    const id = req.params.id;
    const character = await CharacterServices.deleteById(id)
  
    res.json(new Success(character));
    
  } catch (error) {
    next(error)
  }
};

const uploadImageCharacter = async(req, res, next) =>{
    try {
      res.json(new Success(await ImageService.uploadCharacterImage(req.file, req.body.id), 200))
    } catch (error) {
      next(error)
    }
}

const assocMovie = async(req, res, next) =>{
  try {
      res.json(new Success(await CharacterServices.assocMovie(req.character, req.movie)))
  } catch (error) {
      next(errr)
  }
}

module.exports = {
    getAllCharacter,
    createCharacter,
    getCharacter,
    updateCharacter,
    deleteCharacter,
    uploadImageCharacter,
    assocMovie
}
 
