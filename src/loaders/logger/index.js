const winston = require('winston');
const config = require('../../config');

const transports = [];
transports.push(
    new winston.transports.Console(),
);

const logger = winston.createLogger({
    level: config.log.level,                     //se va a imprimir todo desde el nivel indicado / como en produccion
    format: winston.format.simple(),             // no queremos el mismo nivel hay que sacarlo de una variable de entorno
    transports
})
module.exports = logger;