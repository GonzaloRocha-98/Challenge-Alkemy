//configuracion de como levantar express

const path = require('path');
const express = require('express')
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const logger = require('../logger');
const config = require('../../config');


class ExpressServer{

    constructor(){
        this.app = express();
        this.port = config.port;
        this.basePathUsers = `${config.api.prefix}/users`;
        this.basePathAuth = `${config.api.prefix}/auth`;
        this._middlewares();
        this._swaggerConfig();
        this._routes();
        this._notFound();
        this._errorHandler();
    }

    _middlewares(){
        this.app.use(morgan('tiny')); //loguea por consola las entradas que va teniendo la api
        this.app.use(express.json());
    }

    _routes(){  //todo lo que va a entrar por el /users

        this.app.head("/status", (req,res) => {
            res.status(200).end();
        })    //ruta para verificar que la app esta viva 

        this.app.get("/tests", (req, res) => {
            res.sendFile(path.join(__dirname + '../../../../postman/report.html'));
        })

        this.app.use(this.basePathUsers, require('../../routes/users'));
        this.app.use(this.basePathAuth, require('../../routes/auth'));
    }

    //.use es un middleware asi que va a ejecutar en medio de cuaquier cosa

    _notFound() {
        this.app.use((req, res, next) => {
            const err = new Error("Not Found");
            err.code = 404;
            next(err);
        })
    }

    _errorHandler(){
        this.app.use((err, req, res, next)=>{
            const code = err.code || 500;

            logger.error(`${code} - ${err.message} - ${req.originalUrl} - ${req.method}  ${req.ip}`);
            logger.error(err.stack);

            const body = {
                error: {
                    code,
                    message: err.message,
                    data: err.data              //el parametro data que enviamos a la clase AppError
                }
            }
            res.status(code).json(body);
        })
    }

    _swaggerConfig(){
        this.app.use(
            config.swagger.path,
            swaggerUi.serve,
            swaggerUi.setup(require('../swagger/swagger.json')),
        );
    }
    async start(){
        this.app.listen(this.port, (error)=>{
            if(error){
                logger.error(error);
                process.exit(1);
                return;
            }
        })
    }
}

module.exports = ExpressServer