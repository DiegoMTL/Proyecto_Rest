//Ejecucion continua: npm run dev
//killall -9 node
//ps ax
const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");



app.get("/api", (req , res) => {
    res.json({
        mensaje: "Nodejs and JWT"
    });
});

app.post("/api/login", (req , res) => {
    const user = {
        id: 1,
        nombre : "postgres",
        password: "postgres"
    }

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token: token
        });
    });

});

app.post("/api/posts", verifyToken, (req , res) => {

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                    mensaje: "Token verificado",
                    authData: authData
                    
                });
        }
    });
    //routes
    app.use(require('./routes/index'));
});

// Authorization: Bearer <token>
function verifyToken(req, res, next){
     const bearerHeader =  req.headers['authorization'];

     if(typeof bearerHeader !== 'undefined'){
          const bearerToken = bearerHeader.split(" ")[1];
          req.token  = bearerToken;
          next();
     }else{
         res.sendStatus(403);
     }
}

//middlewares funciones antes que lleguen a las rutas
app.use(express.json()); //cada vez que desde una aplicacion cliente envie al servidor un dato en formato JSON el servidor lo traduce a un objeto JS
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port 3000');
