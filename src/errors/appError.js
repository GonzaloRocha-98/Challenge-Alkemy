class AppError extends Error{
    constructor(message, code = 500, data) {        //mensaje de error cmo la clase error, codigo de error http, data si necesitamos enviar algun objeto en el error
        super(message);
        this.code = code;
        this.data = data;
    }
}

module.exports = AppError