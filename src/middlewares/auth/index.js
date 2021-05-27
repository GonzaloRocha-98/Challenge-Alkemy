const {check} = require('express-validator');
const {validationResult} = require('../commons');
const {validToken, validRoles} = require('../../services/authServices')
const logger = require('../../loaders/logger');
const AppError = require('../../errors/appError');
const userService = require('../../services/userServices');

const _usernameRequired = check('username', 'Username required').not().isEmpty();
const _passwordRequired = check('password', 'Password required').not().isEmpty();

const postLoginRequestValidations = [
    _usernameRequired,
    _passwordRequired,
    validationResult
]

const _emailType = check('email', 'Email is invalid').isEmail();
const _emailExist = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new AppError('Email already exist', 400);
        }
    }
);
const _usernameExist = check('username').custom(
    async (username = '') => {
        const userFound = await userService.findByUsername(username);
        if(userFound){
            throw new AppError('Username already exist', 400);
        }
    }
);

const _emailRequired = check('email', 'Email required').not().isEmpty();

const postRegisterRequestValidations = [
    _usernameRequired,
    _usernameExist,
    _passwordRequired,
    _emailRequired,
    _emailType,
    _emailExist,
    validationResult
]

const validJWT = async(req, res, next) =>{
    try {
        const token = req.header('Authorization'); 
        const user = await validToken(token);
        req.user = user;
        next();
    } catch (err) {
        next(err)
    }
}

const hasRole = (...roles) => {
    return (req, res, next) => {
        try {
            validRoles(req.user, ...roles);
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    postLoginRequestValidations,
    postRegisterRequestValidations,
    validJWT,
    hasRole
}