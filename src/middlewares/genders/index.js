const GenderService = require('../../services/genderServices');
const {check} = require('express-validator');
const AppError = require('../../errors/appError');
const {validationResult} = require('../commons');
const {validJWT, hasRole} = require('../auth');
const {GENDER_FILTERS, ADMIN_ROLE} = require('../../constants');


const _nameRequired = check('name', 'Name required').not().isEmpty();

const _gendernameNoExist = check('name').custom(
    async (gendername = '') => {
        const genderFound = await GenderService.findByName(gendername);
        if(genderFound){
            throw new AppError('Name already exist', 400);
        }
    }
);
//comprobar si es un tipo de imagen

const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _gendernameNoExist,
    validationResult
]

const _idRequired = check('id').not().isEmpty();
const _idExist = check('id').custom(
    async (id = '') => {
        const genderFound = await GenderService.findById(id);
        if(!genderFound){
            throw new AppError('The id is not exist', 400);
        }
    }
);
const _optionalNameNoExist = check('name').optional().custom(
    async (gendername = '') => {
        const genderFound = await GenderService.findByName(gendername);
        if(genderFound){
            throw new AppError('Name already exist', 400);
        }
    }
);

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idExist,
    _optionalNameNoExist,
    //_optionalImageExist,
    validationResult
]



const _optionalFilterValid = check('filter').optional().custom(
    async (filter = {}) => {
        const keys = Object.keys(filter);
        if(!keys.every(e => CHARACTER_FILTERS.includes(e))){
            throw new AppError('Some filter is invalid', 400)
        }
    });


const getAllGendersRequestValidations = [
    validJWT,
    _optionalFilterValid,
    validationResult
    
]

const getGenderRequestValidations = [
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
    getAllGendersRequestValidations,
    getGenderRequestValidations,
    deleteRequestValidations
}