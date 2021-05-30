const MovieService = require('../../services/movieServices');
const {check} = require('express-validator');
const AppError = require('../../errors/appError');
const {validationResult} = require('../commons');
const {validJWT, hasRole} = require('../auth');
const {MOVIE_FILTERS, ADMIN_ROLE} = require('../../constants');


const _titleRequired = check('title', 'Title required').not().isEmpty();

const _titleNoExist = check('title').custom(
    async (title = '') => {
        const movieFound = await MovieService.findByTitle(title);
        if(movieFound){
            throw new AppError('Title already exist', 400);
        }
    }
);
const _dateType = check('creationDate', 'CreationDate has to be a date').isDate(); //format is a string and defaults to YYYY/MM/DD.
const _calificationType = check('calification', 'Calification has to be a number between 0-10').isFloat({ min: 0.0, max: 10 });
//comprobar si es un tipo de imagen

const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _dateType,
    _calificationType,
    _titleRequired,
    _titleNoExist,
    validationResult
]

const _idRequired = check('id').not().isEmpty();
const _idExist = check('id').custom(
    async (id = '') => {
        const movieFound = await MovieService.findById(id);
        if(!movieFound){
            throw new AppError('The id is not exist', 400);
        }
    }
);
const _optionalTitleNoExist = check('title').optional().custom(
    async (title = '') => {
        const movieFound = await MovieService.findByTitle(title);
        if(movieFound){
            throw new AppError('Title already exist', 400);
        }
    }
);

const _optionalDateType = check('creationDate', 'CreationDate has to be a date').optional().isDate(); //format is a string and defaults to YYYY/MM/DD.
const _optionalCalificationType = check('calification', 'Calification has to be a number').optional().isFloat({ min: 0.0, max: 10 });


const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idExist,
    _optionalTitleNoExist,
    _optionalDateType,
    _optionalCalificationType,
    validationResult
]



const _optionalFilterValid = check('filter').optional().custom(
    async (filter = {}) => {
        const keys = Object.keys(filter);
        if(!keys.every(e => MOVIE_FILTERS.includes(e))){
            throw new AppError('Some filter is invalid', 400)
        }
    });


const getAllMoviesRequestValidations = [
    validJWT,
    _optionalFilterValid,
    validationResult
    
]

const getMovieRequestValidations = [
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

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllMoviesRequestValidations,
    getMovieRequestValidations,
    deleteRequestValidations
}