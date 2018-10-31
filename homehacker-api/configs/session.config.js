require('dotenv').config(); //SI NO PONGO ESTO NO PODRE ACCEDER A .ENV 
const session = require('express-session');

const sessionOpts = {
    secret: process.env.COOKIE_SECRET || 'SuperSecret',//necesario para registrar la cookie de session
    resave: false,//Forces the session to be saved back to the session store
    saveUninitialized: true,// fuerza a una session que no ha sido inicializada ya que al crearla no es modificada
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    }
};

module.exports = (app) =>{
    app.use(session(sessionOpts));
};