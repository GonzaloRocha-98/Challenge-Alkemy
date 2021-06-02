const Character = require('../models/Character');
const logger = require('../loaders/logger');
const {Op} = require('sequelize');
const Movie = require('../models/Movie');
class CharacterRepository{
    constructor(){

    };

    async findAll({name, age, weight, movies}){
        // could be better
        const filter = {};
        const where = {}
        if(name){
            where.name = {
                 [Op.like] : `%${name}%`
            }
        };

        if(age){
            where.age = age
        }

        if(weight){
            where.weight = weight
        }

        if(movies){
            filter.include = {
                model: Movie,
                where: {
                    id: movies
                },
                attributes: []
            }
        }
        filter.where = where
        filter.attributes = ['image','name'];
        return await Character.findAll(filter)

    }

    async findById(id){
        return await Character.findByPk(id);
    }

    async findByIdWithMovies(id){
        return await Character.findByPk(id,{
            include: {
                model: Movie,
                attributes: ['id', 'title', 'image']
            },
            attributes: ['id','image','name', 'age', 'weight', 'history']
        });
    }
    
    async findByName(name){
        return await Character.findOne({where: {name}})
    }
    
    async save(character, moviesId){
        let c = await Character.create(character);
        await c.addMovie(moviesId);
        return c
    }

    async update(id,character){
        return await Character.update(character,{
            where: {
                id
            }
        })
    }
    
    async delete(id){
        return await Character.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = CharacterRepository;