const {check} = require('express-validator');
const {validationResult} = require('../commons');
const {validToken, validRoles} = require('../../services/authServices')
const logger = require('../../loaders/logger');


const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailType = check('email', 'Email is invalid').isEmail();
const _passwordRequired = check('password', 'Password required').not().isEmpty();

const postLoginRequestValidations = [
    _emailRequired,
    _emailType,
    _passwordRequired,
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
    validJWT,
    hasRole
}