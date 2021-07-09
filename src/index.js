const express = require('express');
const app = express();

//middlewares funciones antes que lleguen a las rutas
app.use(express.json()); //cada vez que desde una aplicacion cliente envie al servidor un dato en formato JSON el servidor lo traduce a un objeto JS
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port 3000');
