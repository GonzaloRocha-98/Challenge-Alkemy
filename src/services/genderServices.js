const GenderRepository = require('../repositories/genderRepository');
const repository = new GenderRepository();


const findAll = async(filter) =>{
    return await repository.findAll(filter)
}

const findById = async(id) => {
    return await repository.findById(id);   
};

const findByName = async(name) =>{
    return await repository.findByName(name)
}

const save = async(gender) => {
    return await repository.save(gender)
}

const update = async(id, gender) =>{
    return await repository.update(id, gender);
}

const deleteById = async(id) =>{
    return await repository.delete(id)
}

module.exports = {
    findAll,
    findById,
    findByName,
    save,
    update,
    deleteById
}