//Ejecucion continua: npm run dev
//killall -9 node
//ps ax
const express = require('express');
const app = express();
const cors = require('cors');

var whitelist = ['http://www.sismologia.cl/links/informate.html'];

var corsOptions = {
    origin: function (origin, callback){
        if(whitelist.indexOf(origin) !== -1){
            callback(null,true)
        }else{
            callback(new Error('No CORS'))
        }
    }    
}

//middlewares funciones antes que lleguen a las rutas
app.use(express.json()); //cada vez que desde una aplicacion cliente envie al servidor un dato en formato JSON el servidor lo traduce a un objeto JS
app.use(express.urlencoded({extended: false}));
//app.use(cors()); //Utilizacion de cors

//routes
app.use(require('./routes/index'));

app.get('/', cors(corsOptions), (req, res) =>{
    res.json({mensaje: 'ok'});
});

app.listen(3000);
console.log('Server on port 3000');
