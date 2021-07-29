const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const cors = require('cors');
var fs = require('fs');
var https = require('https');

//middlewares funciones antes que lleguen a las rutas
app.use(express.json()); //cada vez que desde una aplicacion cliente envie al servidor un dato en formato JSON el servidor lo traduce a un objeto JS
app.use(express.urlencoded({extended: false}));
app.use(cors()); //Utilizacion de cors
app.use(require('./routes/index'));//routes

app.get('/grupo-p/earthquakes', cors(corsOptions), (req, res) =>{
    res.json({mensaje: 'ok'});
});
// app.listen(3000);
// console.log('Server on port 3000');
//Conexion a puerto y host asignado
// app.listen(18088,'api.jkd.cl');
// console.log('Server on port 18088');

https.createServer({
    cert: fs.readFileSync('mi_certificado.crt'),
    key: fs.readFileSync('mi_certificado.key')
  },app).listen(18088, 'api.jkd.cl');

console.log('Server on port 18088 https://api.jkd.cl:18088/grupo-p');


var whitelist = ['http://www.sismologia.cl/links/ultimos_sismos.html'];

var corsOptions = {
    origin: function (origin, callback){
        if(whitelist.indexOf(origin) !== -1){
            callback(null,true)
        }else{
            callback(new Error('No CORS'))
        }
    }    
}