const logger = require('../loaders/logger');
const CharacterRepository = require('../repositories/characterRepository');
const repository = new CharacterRepository();
const MovieRepository = require('../repositories/movieRepository');
const repoMovie = new MovieRepository();


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
    const moviesId = [];
    await character.movies.forEach(async(movieTitle) => {
        let {id} = await repoMovie.findByTitle(movieTitle);
        moviesId.push(id)
    });
    return await repository.save(character,moviesId)
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
