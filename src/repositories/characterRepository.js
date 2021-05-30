const Character = require('../models/Character');
const logger = require('../loaders/logger');
class CharacterRepository{
    constructor(){

    };

    async findAll(filters){
        return await Character.findAll({where : filters});
    }

    async findById(id){
        return await Character.findByPk(id);
    }
    
    async findByName(name){
        return await Character.findOne({where: {name}})
    }
    
    async save(user){
        return await Character.create(user);
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