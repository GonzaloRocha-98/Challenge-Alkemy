const ExpressServer = require('./server/expressServer');
const config = require('../config');
const logger = require('./logger');
const mongooseLoader = require('./mongoose');

module.exports = async () =>{
    await mongooseLoader();
    logger.info('DB loaded and connected')

    const server = new ExpressServer();
    logger.info('Express loaded');

    server.start(); //Se levanta el server
    logger.info(`
    ########################################
    Server listening on port: ${config.port}
    ########################################`);

}
