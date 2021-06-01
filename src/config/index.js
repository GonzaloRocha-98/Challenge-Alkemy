// (carpeta config)configuraciones de propiedades que tenan que ver con el proyecto
// comunmente se sacan del archiv .env con dotenv
// la idea es poder usarlo en cualquier arhcivo js del proyecto 

const dotenv = require('dotenv');
const envFound = dotenv.config();

if(!envFound){
    throw new Error("Couldn´t find .env file.");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    port: process.env.PORT,
    api: {
        prefix: '/api/v1', //se suele definir la version de nuestra api
        
    },
    log: {
        level: process.env.LOG_LEVEL
    },
    swagger: {
        path: '/documentation'
    },
    database: {
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME
    },
    auth:{
        secret: process.env.AUTH_SECRET,
        ttl: process.env.AUTH_TTL
    },
    cloud: {
        idAccessKey : process.env.CLOUDINARY_API_KEY,
        secretAccessKey: process.env.CLOUDINARY_API_SECRET,
        bucket_name: process.env.CLOUDINARY_CLOUD_NAME
    }
}