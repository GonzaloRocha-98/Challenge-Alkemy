const {validationResult} = require('express-validator');
const AppError = require('../errors/appError')

const _validationResult = (req, res, next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new AppError('Validation errors:', 400, errors.errors);    //error 400 xq hay un error del usuario al ingresar los campos
    }
    next();                     //para que siga el flujo de la app
}

module.exports = {
    validationResult: _validationResult
}