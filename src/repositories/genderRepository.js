const Gender = require('../models/Gender');

class GenderRepository {
    
    constructor(){

    }

    async findById(id){
        return await Gender.findByPk(id)
    }

    async findByName(name){
        return await Gender.findOne({where: {name}})
    }

    async delete(id){
        return await Gender.destroy({where: {id}})
    }

}

module.exports = GenderRepository