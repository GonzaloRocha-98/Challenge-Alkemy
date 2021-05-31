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
    
    async findByName(name){
        return await Character.findOne({where: {name}})
    }
    
    async save(user, moviesId){
        let c = await Character.create(user);
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