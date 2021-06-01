const logger = require('../loaders/logger');
const ImageRepository = require('../repositories/imageRepository');
const repository = new ImageRepository();
const CharacterRepository = require('../repositories/characterRepository');
const repoCharacter = new CharacterRepository();
const MovieRepository = require('../repositories/movieRepository');
const repoMovie = new MovieRepository();
const GenderRepository = require('../repositories/genderRepository');
const repoGender = new GenderRepository();


const uploadCharacterImage = async(image, idCharacter) => {
    const character = await repoCharacter.findById(idCharacter);
    if(character.image){
        await repository.deleteImage(character.image)
    }
    const imageUrl = await repository.uploadImage(image); 
    return await repoCharacter.update(idCharacter,{image: imageUrl.secure_url});
}

const uploadMovieImage = async(image, idMovie) => {
    const movie = await repoMovie.findById(idMovie);
    if(movie.image){
        await repository.deleteImage(movie.image)
    }
    const imageUrl = await repository.uploadImage(image); 
    return await repoMovie.update(idMovie,{image: imageUrl.secure_url});
}

const uploadGenderImage = async(image, idGender) => {
    const gender = await repoGender.findById(idGender);
    if(gender.image !== null){
        await repository.deleteImage(gender.image)
    }
    const imageUrl = await repository.uploadImage(image); 
    return await repoGender.update(idGender,{image: imageUrl.secure_url});
}

module.exports = {
    uploadCharacterImage,
    uploadMovieImage,
    uploadGenderImage

}
