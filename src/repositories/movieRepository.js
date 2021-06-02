const Movie = require('../models/Movie');
const logger = require('../loaders/logger');
const Gender = require('../models/Gender');
const Character = require('../models/Character');
const {Op} = require('sequelize');
class MovieRepository{
    constructor(){

    };
    
    async findAll({title, gender, order}){

        /*
        return await Movie.findAll(
            {
                include:{
                    model: Gender,
                    where: {
                        id: gender
                    }
                },
                where: {
                    title: { [Op.like] : `%${title}%`}
                },
                order: [['creationDate', order]]
            }
        );*/
        // could be better
        const filter = {};
        if(title){
            filter.where = {
                title: { [Op.like] : `%${title}%`}
            }
        };

        if(gender){
            filter.include = {
                model: Gender,
                where: {
                    id: gender
                },
                attributes : []
            }
        }
        filter.attributes = ['title', 'image', 'creationDate'];

        if(order){
            filter.order = [['creationDate', order]]
        }

        return await Movie.findAll(filter)

    }

    async findById(id){
        return await Movie.findByPk(id);
    }
    
    async findByIdWithCharacters(id){
        return await Movie.findByPk(id,{
            include: {
                model: Character,
                attributes: ['id', 'image', 'name']
            },
            attributes: ['id','title','image', 'creationDate', 'calification', 'typeMovie']
        });
    }

    async findByTitle(title){
        return await Movie.findOne({where: {title}})
    }
    
    async save(movie, gendersId){
        let m = await Movie.create(movie);
        await m.addGender(gendersId);
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