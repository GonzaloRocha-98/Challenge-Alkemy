const User = require('../models/User');
const bcrypt = require('bcrypt');
const logger = require('../loaders/logger');
const {Op} = require('sequelize');
class UserRepository{
    constructor(){

    };

    async findAll({username, name, email, role}){
        // could be better
        const where = {}
        if(username){
            where.name = {
                 [Op.like] : `%${username}%`
            }
        };
        if(name){
            where.name = {
                 [Op.like] : `%${name}%`
            }
        };

        if(email){
            where.email = {
                [Op.like] : `%${email}%`
            }
        }

        if(role){
            where.role = role
        }

        return await User.findAll(where)

    }

    async findById(id){
        return await User.findByPk(id);
    }
    
    async findByUsername(username){
        return await User.findOne({where: {username}})
    }

    async findByEmail(email){
        return await User.findOne({ where: {email}})
    }
    
    async save(user){
        user.password = await bcrypt.hash(user.password, 10);          //10 is a saltRound (las veces que itera para realizar el hashing?)
        return await User.create(user);
    }

    async update(id,user){
        return await User.update(user,{
            where: {
                id
            }
        })
    }
    
    async delete(id){
        return await User.destroy({
            where: {
                id
            }
        });
    }
    /*
    async findAllWithPagination(filter, options){
        return await User.paginate(filter, options)
    }
    */
}

module.exports = UserRepository;