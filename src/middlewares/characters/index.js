const CharacterService = require('../../services/characterServices');
const {check} = require('express-validator');
const AppError = require('../../errors/appError');
const {validationResult} = require('../commons');
const {validJWT, hasRole} = require('../auth');
const {CHARACTER_FILTERS, ADMIN_ROLE} = require('../../constants');


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
//comprobar si es un tipo de imagen

const postRequestValidations = [
validJWT,
    hasRole(ADMIN_ROLE),
    _optionalAgeType,
    _optionalWeightType,
    _nameRequired,
    _characternameNoExist,
    validationResult
]

const _idRequired = check('id').not().isEmpty();
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

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idExist,
    _optionalNameNoExist,
    _optionalAgeType,
    _optionalWeightType,
    validationResult
]



const _optionalFilterValid = check('filter').optional().custom(
    async (filter = {}) => {
        const keys = Object.keys(filter);
        if(!keys.every(e => CHARACTER_FILTERS.includes(e))){
            throw new AppError('Some filter is invalid', 400)
        }
    });


const getAllCharactersRequestValidations = [
    validJWT,
    _optionalFilterValid,
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

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllCharactersRequestValidations,
    getCharacterRequestValidations,
    deleteRequestValidations
}