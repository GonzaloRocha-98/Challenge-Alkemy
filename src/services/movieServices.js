const MovieRepository = require('../repositories/movieRepository');
const repository = new MovieRepository();
const GenderRepository = require('../repositories/genderRepository');
const logger = require('../loaders/logger');
const genderRepo = new GenderRepository();  
const ImageRepository = require('../repositories/imageRepository');
const repoImage = new ImageRepository();


const findAll = async(filter) =>{
    return await repository.findAll(filter)
}

const findById = async(id) => {
    return await repository.findById(id);   
};
const findByIdWithCharacters = async(id) => {
    return await repository.findByIdWithCharacters(id);   
};

const findByTitle = async(title) =>{
    return await repository.findByTitle(title)
}

const save = async(movie) => {
    const gendersId = [];
    await movie.genders.forEach(async(genderName) => {
        let {id} = await genderRepo.findByName(genderName);
        gendersId.push(id)
    });
    return await repository.save(movie,gendersId)
}

const update = async(id, movie) =>{
    return await repository.update(id, movie);
}

const deleteById = async(id) =>{
    const movie = await findById(id);
    if(movie.image){
        await repoImage.deleteImage(movie.image);
    }
    return await repository.delete(id)
}

const assocCharacter = async(movie, character) =>{
    await movie.addCharacter(character);
}

module.exports = {
    findAll,
    findById,
    findByTitle,
    save,
    update,
    deleteById,
    assocCharacter,
    findByIdWithCharacters
}
