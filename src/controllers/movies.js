const express = require('express');
const MovieServices = require('../services/movieServices')
const Success = require('../handlers/successHandler')
const logger = require('../loaders/logger');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllMovie = async (req, res, next) => {  
  try {
    const movie = await MovieServices.findAll(req.query);    
    res.json(new Success(movie));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const createMovie = async (req, res, next) => {
  try {
    let movie = req.body;
    movie = await MovieServices.save(movie);

    res.status(201).json(new Success(movie));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updateMovie = async (req, res, next) => {
  try {
    let {id} = req.params;
    let movie = req.body;
    
    const movieUpdated = await MovieServices.update(id, movie);

    res.json(new Success(movieUpdated));
    
  } catch (error) {
    next(error)
  }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getMovie = async (req, res, next) => {
  try {
    let {id} = req.params;
    const movie = await MovieServices.findById(id)
    res.json(new Success(movie));
    
  } catch (error) {
    next(error)
  }
  
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const deleteMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await MovieServices.deleteById(id)
  
    res.json(new Success(movie));
    
  } catch (error) {
    next(error)
  }
};

module.exports = {
    getAllMovie,
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
}
 
