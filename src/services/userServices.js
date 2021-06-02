const UserRepository = require('../repositories/userRepository');
const repository = new UserRepository();
const AppError = require('../errors/appError');
const SendGridServices = require('../services/sendGride.Services');


const findAll = async(filter) =>{
    return await repository.findAll(filter)
}

const findById = async(id) => {
    return await repository.findById(id);   
};

const findByUsername = async(username) =>{
    return await repository.findByUsername(username)
}

const findByEmail = async(email) => {
    return await repository.findByEmail(email);   
};

const save = async(user) => {
    await SendGridServices.sendMail(user.email)
    return await repository.save(user)
}

const update = async(id, user) =>{
    return await repository.update(id, user);
}

const deleteById = async(id) =>{
    return await repository.delete(id)
}

module.exports = {
    findAll,
    findById,
    findByUsername,
    findByEmail,
    save,
    update,
    deleteById
}
