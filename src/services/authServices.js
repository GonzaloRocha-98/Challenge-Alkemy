const userServices = require('./userServices');
const AppError = require('../errors/appError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/index')
const logger = require('../loaders/logger')


const login = async(email, password, next) => {
    try {
        //Email validation
        const user = await userServices.findByEmail(email);

        if(!user){
            throw new AppError('Authentication failed! Email / password incorrect.', 400)
        }
        //User Enable validation
        if(!user.enabled){
            throw new AppError('Authentication failed! User disabled.', 400)

        }
        //Password validation
        const validPass =await bcrypt.compare(password, user.password);

        if(!validPass){
            throw new AppError('Authentication failed! Email / password incorrect.', 400)
        }
        // Generate token
        const token = _encrypt(user.id);

        return {
            token,
            user: user.name,
            role: user.role
        }

    } catch (err) {
        throw err;
    }
}


const validToken = async (token) =>{

    try {

        //Validate that a token comes as  parameter
        if(!token){
            throw new AppError('Authentication failed! Token required', 401)
        }
        //Validate that the token is  integral
        let id;
        try {
            const obj = jwt.verify(token, config.auth.secret); //Automaticamente lanza una excepcion si no es correcta la verificacion
            id = obj.id; //declaramos el id fuera de try xq sino se pierde en el scpoe
        } catch (verifyError) {
            throw new AppError('Authentication failed! Invalid Token',401)
        }

        //Validate that a user exists in the db
        const user = await userServices.findById(id);
        if(!user){
            throw new AppError('Authentication failed! Invalid Token', 401); 
        }

        //Validate that user is enable
        if(!user.enabled){
            throw new AppError('Authentication failed! User disabled', 401)
        }
        
        return user
    } catch (err) {
        throw err
    }

}

const validRoles = (user, ...roles) =>{
    if(!roles.includes(user.role)){
        throw new AppError('Authorization failed! User withot the privileges', 403)
    }
    return true
}

_encrypt = (id) => {
    return jwt.sign({ id }, config.auth.secret, {expiresIn: config.auth.ttl})
}

module.exports = {
    login,
    validToken,
    validRoles
}