const { Router } = require('express');
const router = Router();
const jwt = require("jsonwebtoken");
const { getTerremoto,createTerremoto } = require('../controllers/index.controller')

/*Rutas*/
router.get('/', (req, res) =>{
    res.json({mensaje: 'Api Rest'});
});
router.get('/earthquakes', ensureToken, getTerremoto); //ruta con auth via token
router.post('/earthquakes', ensureToken, createTerremoto); //ruta con auth via token
router.post("/api/login", (req , res) => {//Ruta de registro para generar el token
    const user = {id: 1};
    const token = jwt.sign({user}, 'postgres'); //token para este usuario para acceder
    res.json({
        token //impresion del token
    });
});

/* Funcion de autenticacion via token */
//Authorization: Bearer "token"
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