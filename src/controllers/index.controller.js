const { Pool } = require('pg');//manera para conectarnos a postgres
const cheerio = require('cheerio');
const request = require('request-promise');
const jwt = require("jsonwebtoken");
const { next } = require('cheerio/lib/api/traversing');

async function scraping(){
    /*Constantes*/
    const InsertSismo = 'INSERT INTO sismos (fecha,latitud,longitud,profundidad,magnitud,referencia) VALUES ($1, $2, $3, $4, $5, $6)';
    const valor = 'SELECT EXISTS(SELECT * FROM sismos WHERE fecha= $1 AND latitud= $2 AND longitud= $3 AND profundidad= $4 AND magnitud= $5 AND referencia= $6)';
    const $ = await request({ //aqui tengo todo el documento
        uri: 'http://www.sismologia.cl/links/ultimos_sismos.html',
        transform: body => cheerio.load(body)
    });
    /*Recorro la tabla de la pagina de sismologia*/
    $('table tbody tr').each(async (i,el) => {
        if (i > 0){ //Se salta la primeria linea que son los titulos de la tabla 
            const f = $(el).find('a').text();
            const la= $(el).find('td').next().next();
            const lon = $(el).find('td').next().next().next();
            const pro = $(el).find('td').next().next().next().next();
            const mag = $(el).find('td').next().next().next().next().next();
            const ref = $(el).find('td').next().next().next().next().next().next().next();
            const S = {//Almaceno los datos de la pagina en una estructura
                id: i,
                fecha: f, 
                latitud: parseFloat(la.html()), //double
                longitud: parseFloat(lon.html()), //double
                profundidad: parseInt(pro.html()), //int
                magnitud:  parseFloat(mag.html()), //double
                referencia: ref.html()
            };
            //consulto si los valores leidos estan en la base de datos
            const exist = await pool.query(valor,[S.fecha,S.latitud,S.longitud,S.profundidad,S.magnitud,S.referencia]);
            if(exist.rows[0].exists != true){ //si el dato no esta, se agrega a la DB
                console.log("Se agrego un nuevo sismo");
                pool.query(InsertSismo,[S.fecha,S.latitud,S.longitud,S.profundidad,S.magnitud,S.referencia]);
            } 
        }
    });
    console.log("Fin Scraping");
}

const pool  = new Pool ({
    host: 'localhost', //servidor de postgress
    user: 'postgres', //usuario postgress
    password: 'postgres', //contraseña 
    database: 'sismos', //nombre de la base de datos
    port: '5432' //puerto de postgress (se puede definir)

});

const getTerremoto = async (req, res) => {
    jwt.verify(req.token, 'postgres', async (err, data) => {
        if (err){
            res.sendStatus(403);
        }else{
            await scraping();
            const SelectT = 'SELECT * FROM sismos';
            const response = await pool.query(SelectT); //consulta a la base de datos terremotos
            res.json(response.rows);
            console.log("getSismos");
        }
    });    
};

const createUsuario = async (req,res)=>{
    const { nombre, apellido } = req.body;
    const user = { nombre, apellido};
    const token = jwt.sign({user}, 'postgres'); //token para este usuario para acceder
    const response = await pool.query('INSERT INTO usuario (nombre,apellido,token) VALUES ($1,$2,$3)',[nombre,apellido,token]); //registro usuario en la base de datos
    res.json({
        user,
        token //impresion del token
    });
};


module.exports = {
    getTerremoto,
    createUsuario

}