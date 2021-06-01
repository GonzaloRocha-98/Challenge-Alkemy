const CharacterService = require('../../services/characterServices');
const MovieService = require('../../services/movieServices');
const {check, query} = require('express-validator');
const AppError = require('../../errors/appError');
const {validationResult, upload} = require('../commons');
const {validJWT, hasRole} = require('../auth');
const {CHARACTER_FILTERS, ADMIN_ROLE} = require('../../constants');
const logger = require('../../loaders/logger');


const _nameRequired = check('name', 'Name required').not().isEmpty();

const _characternameNoExist = check('name').custom(
    async (charactername = '') => {
        const characterFound = await CharacterService.findByName(charactername);
        if(characterFound){
            throw new AppError('Name already exist', 400);
        }
    }
);
const _optionalAgeType = check('age', 'Age has to be a number').optional().isInt();
const _optionalWeightType = check('weight', 'Weight has to be a number').optional().isFloat();
const _moviesRequired = check('movies', 'Movies required').not().isEmpty();
const _moviesType = check('movies', 'The movies field has be an array ').isArray();

const _moviesExist = check('movies').custom(
    async(movies = '') =>{
        for (let i = 0; i < movies.length; i++) {
            let aux = await MovieService.findByTitle(movies[i]);
            if(!aux){
                throw new AppError(`Title ${movies[i]} not exist`, 400);
            }
            
        }
    }
)
//comprobar si es un tipo de imagen

const postRequestValidations = [
validJWT,
    hasRole(ADMIN_ROLE),
    _optionalAgeType,
    _optionalWeightType,
    _nameRequired,
    _characternameNoExist,
    _moviesRequired,
    _moviesType,
    _moviesExist,
    validationResult
]

const _idRequired = check('id', 'Id required').not().isEmpty();
const _idExist = check('id').custom(
    async (id = '') => {
        const characterFound = await CharacterService.findById(id);
        if(!characterFound){
            throw new AppError('The id is not exist', 400);
        }
    }
);
const _optionalNameNoExist = check('name').optional().custom(
    async (charactername = '') => {
        const characterFound = await CharacterService.findByName(charactername);
        if(characterFound){
            throw new AppError('Name already exist', 400);
        }
    }
);
const _optionalMoviesType = check('movies', 'The movies field has be an array ').optional().isArray();
const _optionalMoviesExist = check('movies').optional().custom(
    async(movies = '') =>{
        await movies.forEach(async(m)=>{
            let movie = await MovieService.findByTitle(m);
            if(!movie){
                throw new AppError(`Title of movie ${m} not exist`)
            }
        })
    }
)

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idExist,
    _optionalNameNoExist,
    _optionalAgeType,
    _optionalWeightType,
    _optionalMoviesType,
    _optionalMoviesExist,
    validationResult
]



const _optionalQueryValid = query().optional().custom(
    async (querys = {}) => {
        const keys = Object.keys(querys);
        if(!keys.every(e => CHARACTER_FILTERS.includes(e))){
            throw new AppError('Some filter is invalid', 400)
        }
    });



const getAllCharactersRequestValidations = [
    validJWT,
    _optionalQueryValid,
    validationResult
    
]

const getCharacterRequestValidations = [
    validJWT,
    _idRequired,
    _idExist,
    validationResult
]

const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idExist,
    validationResult
]


const postImageRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    upload.single('image'),
    _idRequired,
    _idExist,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllCharactersRequestValidations,
    getCharacterRequestValidations,
    deleteRequestValidations,
    postImageRequestValidations
}