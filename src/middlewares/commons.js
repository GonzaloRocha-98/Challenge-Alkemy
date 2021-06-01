const {validationResult} = require('express-validator');
const AppError = require('../errors/appError');
const multer  = require('multer');
const path = require('path');

const _validationResult = (req, res, next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new AppError('Validation errors:', 400, errors.errors);    //error 400 xq hay un error del usuario al ingresar los campos
    }
    next();                     //para que siga el flujo de la app
}

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpg|jpeg|png/; 
      if (!fileTypes.test(path.extname(file.originalname))) {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
  });

module.exports = {
    validationResult: _validationResult,
    upload
}