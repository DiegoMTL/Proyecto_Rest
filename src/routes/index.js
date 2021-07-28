const { Router } = require('express');
const router = Router();
const jwt = require("jsonwebtoken");
const { getTerremoto,createUsuario, selectID } = require('../controllers/index.controller')
const { Pool } = require('pg'); //manera para conectarnos a postgres

/*Rutas*/
router.get('/', (req, res) =>{
    res.json({mensaje: 'Api Rest'});
});
// router.get('/earthquakes', ensureToken, getTerremoto); //ruta con auth via token
router.get('/earthquakes', getTerremoto); //ruta con auth via token
router.get('/earthquakes/:id', selectID); //ruta con auth via token
router.post('/login',createUsuario);

/* Funcion de autenticacion via token */

//Authorization: Bearer "insertar TOKEN"
function ensureToken(req, res, next){
    const bearerHeader = req.headers['authorization']; //informacion via headers
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");  //["bearer","12312356575434sdfsdf"]
        const bearerToken = bearer[1]; //"12312356575434sdfsdf"
        req.token = bearerToken;
        next(); //me permite acceder a la ruta protegida

    }
    else{
        res.sendStatus(403); //estado de no permitido

    }
}

module.exports= router;