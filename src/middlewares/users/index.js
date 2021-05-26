const userService = require('../../services/userServices');
const {check} = require('express-validator');
const AppError = require('../../errors/appError');
const {ROLES, ADMIN_ROLE, FILTERS} = require('../../constants/index');
const {validationResult} = require('../commons');
const {validJWT, hasRole} = require('../auth');


const _nameRequired = check('name', 'Name required').not().isEmpty();
const _lastNameRequired = check('lastName', 'Last Name required').not().isEmpty();
const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailType = check('email', 'Email is invalid').isEmail();
const _emailExist = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError('Email already exist', 400);
        }
    }
);
// validar para fecha si es una fecha valida
const _passwordRequired = check('password', 'Password required').not().isEmpty();
const _roleValid = check('role').optional().custom(
    async (role = '') => {
        if(!ROLES.includes(role)){
            throw new AppError('Invalid rol', 400);
        }
    }
);
const _dateValid = check('birthDate').optional().isDate('MM-DD-YYYY');


const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _lastNameRequired,
    _emailRequired,
    _emailType,
    _emailExist,
    _passwordRequired,
    _roleValid,
    _dateValid,
    validationResult
]

const _optionalEmailType = check('email', 'Email is invalid').optional().isEmail();
const _optionalEmailExist = check('email').optional().custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError('Email already exist', 400);
        }
    }
);
const _idRequired = check('id').not().isEmpty();
const _idIsMongoDB = check('id').isMongoId();       // verifica que sea un id del tipo de id que crea Mongo
const _idExist = check('id').custom(
    async (id = '') => {
        const userFound = await userService.findById(id);
        if(!userFound){
            throw new AppError('The id is not exist', 400);
        }
    }
);

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsMongoDB,
    _idExist,
    _optionalEmailExist,
    _optionalEmailType,
    _roleValid,
    _dateValid,
    validationResult
]



const _optionalFilterValid = check('filter').optional().custom(
    async (filter = {}) => {
        const keys = Object.keys(filter);
        if(!keys.every(e => FILTERS.includes(e))){
            throw new AppError('Some filter is invalid', 400)
        }
    });


const getAllUsersRequestValidations = [
    /*
    validJWT,
    _optionalFilterValid,
    validationResult
    */
]

const getUserRequestValidations = [
    validJWT,
    _idRequired,
    _idIsMongoDB,
    _idExist,
    validationResult
]

const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsMongoDB,
    _idExist,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllUsersRequestValidations,
    getUserRequestValidations,
    deleteRequestValidations
}