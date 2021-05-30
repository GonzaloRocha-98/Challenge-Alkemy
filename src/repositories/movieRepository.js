const Movie = require('../models/Movie');
const logger = require('../loaders/logger');
class MovieRepository{
    constructor(){

    };

    async findAll(filters){
        return await Movie.findAll({where : filters});
    }

    async findById(id){
        return await Movie.findByPk(id);
    }
    
    async findByTitle(title){
        return await Movie.findOne({where: {title}})
    }
    
    async save(movie, genders){
        let m = await Movie.create(movie);
        await m.addGender(genders);
        return m
    }

    async update(id,movie){
        return await Movie.update(movie,{
            where: {
                id
            }
        })
    }
    
    async delete(id){
        return await Movie.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = MovieRepository;