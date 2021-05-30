const ExpressServer = require('./server/expressServer');
const config = require('../config');
const logger = require('./logger');
const sequelize = require('./sequelize');

module.exports = async () =>{
    try {
        await sequelize.authenticate();
        logger.info('Database connection has been established successfully.');
        //sequelize.sync({ alter: true });
        sequelize.sync({force: false});

        require('../models/Character');
        require('../models/Movie');
        require('../models/Gender');
        require('../models/User');

        console.log("All models were synchronized successfully.");
        const server = new ExpressServer();
        logger.info('Express loaded');
    
        server.start();
        logger.info(`
        ########################################
        Server listening on port: ${config.port}
        ########################################`);
    } catch (error) {
        logger.error(error)
    }

}
