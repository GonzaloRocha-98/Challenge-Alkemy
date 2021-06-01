const MovieService = require('../../services/movieServices');
const GenderService = require('../../services/genderServices');
const {check, query} = require('express-validator');
const AppError = require('../../errors/appError');
const {validationResult, upload} = require('../commons');
const {validJWT, hasRole} = require('../auth');
const {MOVIE_FILTERS, ADMIN_ROLE} = require('../../constants');
const logger = require('../../loaders/logger');



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
const _gendersRequired = check('genders', 'Genders required ').not().isEmpty();
const _gendersType = check('genders', 'Genders fields has to be an array').isArray()
const _genderExistVal = async(genders = '') =>{
    for (let i = 0; i < genders.length; i++) {
        let aux = await GenderService.findByName(genders[i]);
        if(!aux){
            throw new AppError(`Gender ${genders[i]} not exist`, 400);
        }
        
    }
}
const _gendersExist = check('genders').custom(_genderExistVal);

//comprobar si es un tipo de imagen

const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _dateType,
    _calificationType,
    _titleRequired,
    _titleNoExist,
    _gendersRequired,
    _gendersType,
    _gendersExist,
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
const _optionalGendersType = check('genders', 'Genders has to be an array').optional().isArray();
const _optionalGendersExist = check('genders').optional().custom(_genderExistVal)

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idExist,
    _optionalTitleNoExist,
    _optionalDateType,
    _optionalCalificationType,
    _optionalGendersType,
    _optionalGendersExist,
    validationResult
]



const _optionalQueryValid = query().optional().custom(
    async (querys = {}) => {
        const keys = Object.keys(querys);
        console.log(keys);
        if(!keys.every(e => MOVIE_FILTERS.includes(e))){
            throw new AppError('Some filter is invalid', 400)
        }
    });

const getAllMoviesRequestValidations = [
    validJWT,
    _optionalQueryValid,
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
    getAllMoviesRequestValidations,
    getMovieRequestValidations,
    deleteRequestValidations,
    postImageRequestValidations
}