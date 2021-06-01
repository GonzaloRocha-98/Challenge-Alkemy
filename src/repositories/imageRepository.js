const logger = require('../loaders/logger');
const Movie = require('../models/Movie');
const config = require('../config');
const AppError = require('../errors/appError')
const cloudinary = require('cloudinary').v2;

class ImageRepository{
    constructor(){
        cloudinary.config({
            cloud_name: config.cloud.bucket_name,
            api_key: config.cloud.idAccessKey,
            api_secret: config.cloud.secretAccessKey
        })
    };

    async uploadImage(file){
        const imagen = await cloudinary.uploader.upload(file.path)
        return imagen
    }

    async deleteImage(urlImage = ''){
        //"https://res.cloudinary.com/alkemy-challenge/image/upload/v1622522384/kiq8ifoimaqhv3ttyftj.png"
        logger.info(urlImage);
        const idImage = urlImage.split('/')[7].split('.')[0]
        return await cloudinary.uploader.destroy(idImage);
    }

}

module.exports = ImageRepository;