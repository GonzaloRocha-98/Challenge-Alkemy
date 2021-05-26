const User = require('../models/User');
const bcrypt = require('bcrypt');
class UserRepository{
    constructor(){

    };

    async findAll(){
        return await User.findAll();
    }
    /*
    async findAllWithPagination(filter, options){
        return await User.paginate(filter, options)
    }
    /*
    async findById(id){
        return await User.findById(id);
    }

    async findByEmail(email){
        return await User.findOne({email:email})            // nos permite buscar un item mediante el objeto que le pasamos
    }

    async save(user){
        user.password = await bcrypt.hash(user.password, 10);          //10 is a saltRound (las veces que itera para realizar el hashing?)
        return await User.create(user);
    }

    async update(id,user){
        return await User.findByIdAndUpdate(id, user, {new : true});
    }

    async delete(id){
        return await User.findByIdAndRemove(id);
    }*/
}

module.exports = UserRepository;