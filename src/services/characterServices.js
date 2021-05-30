const CharacterRepository = require('../repositories/characterRepository');
const repository = new CharacterRepository();


const findAll = async(filter) =>{
    return await repository.findAll(filter)
}

const findById = async(id) => {
    return await repository.findById(id);   
};

const findByName = async(name) =>{
    return await repository.findByName(name)
}

const save = async(character) => {
    return await repository.save(character)
}

const update = async(id, character) =>{
    return await repository.update(id, character);
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
