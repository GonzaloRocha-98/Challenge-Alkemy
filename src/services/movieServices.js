const MovieRepository = require('../repositories/movieRepository');
const repository = new MovieRepository();
const GenderRepository = require('../repositories/genderRepository');
const logger = require('../loaders/logger');
const genderRepo = new GenderRepository();  


const findAll = async(filter) =>{
    return await repository.findAll(filter)
}

const findById = async(id) => {
    return await repository.findById(id);   
};

const findByTitle = async(title) =>{
    return await repository.findByTitle(title)
}

const save = async(movie) => {
    const genders = [];
    await movie.genders.forEach(async(genderName) => {
        let {id} = await genderRepo.findByName(genderName);
        logger.info(id)
        genders.push(id)
    });
    return await repository.save(movie,genders)
}

const update = async(id, movie) =>{
    return await repository.update(id, movie);
}

const deleteById = async(id) =>{
    return await repository.delete(id)
}

module.exports = {
    findAll,
    findById,
    findByTitle,
    save,
    update,
    deleteById
}
