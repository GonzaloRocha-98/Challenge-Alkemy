const UserRepository = require('../repositories/userRepository');
const repository = new UserRepository();


const findAll = async(filter, options) =>{
    return await repository.findAllWithPagination(filter, options)
}

const findById = async(id) => {
    return await repository.findById(id);   
};

const findByEmail = async(email) => {
    return await repository.findByEmail(email);   
};

const save = async(user) => {
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
    findByEmail,
    save,
    update,
    deleteById
}
