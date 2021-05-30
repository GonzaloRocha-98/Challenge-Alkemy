const userService = require('../../services/userServices');
const {check} = require('express-validator');
const AppError = require('../../errors/appError');
const {ROLES, ADMIN_ROLE, USER_FILTERS} = require('../../constants/index');
const {validationResult} = require('../commons');
const {validJWT, hasRole} = require('../auth');


const _nameRequired = check('name', 'Name required').not().isEmpty();
const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailType = check('email', 'Email is invalid').isEmail();
const _emailNoExist = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError('Email already exist', 400);
        }
    }
);
const _usernameNoExist = check('username').custom(
    async (username = '') => {
        const userFound = await userService.findByUsername(username);
        if(userFound){
            throw new AppError('Username already exist', 400);
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


const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _emailRequired,
    _emailType,
    _emailNoExist,
    _usernameNoExist,
    _passwordRequired,
    _roleValid,
    validationResult
]

const _optionalEmailType = check('email', 'Email is invalid').optional().isEmail();
const _optionalEmailNoExist = check('email').optional().custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError('Email already exist', 400);
        }
    }
);
const _idRequired = check('id').not().isEmpty();
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
    _idExist,
    _optionalEmailNoExist,
    _optionalEmailType,
    _roleValid,
    validationResult
]



const _optionalFilterValid = check('filter').optional().custom(
    async (filter = {}) => {
        const keys = Object.keys(filter);
        if(!keys.every(e => USER_FILTERS.includes(e))){
            throw new AppError('Some filter is invalid', 400)
        }
    });


const getAllUsersRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _roleValid,
    _optionalFilterValid,
    validationResult
    
]

const getUserRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _roleValid,
    _idRequired,
    _idExist,
    validationResult
]

const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _roleValid,
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