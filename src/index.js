const startServer = async () =>{
  require('./loaders')() //con parentesis por que el loader exporta una funcion asincrona
};

startServer();