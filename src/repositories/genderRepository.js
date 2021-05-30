const Gender = require('../models/Gender');

class GenderRepository {
    
    constructor(){

    }

    async findAll(filters){
        return await Gender.findAll({where : filters});
    }

    async findById(id){
        return await Gender.findByPk(id)
    }

    async findByName(name){
        return await Gender.findOne({where: {name}})
    }

    async save(gender){
        return await Gender.create(gender);
    }

    async update(id,gender){
        return await Gender.update(gender,{
            where: {
                id
            }
        })
    }

    async delete(id){
        return await Gender.destroy({where: {id}})
    }

}

module.exports = GenderRepository