const { Pool } = require('pg');//manera para conectarnos a postgres
const cheerio = require('cheerio');
const request = require('request-promise');
const jwt = require("jsonwebtoken");
const cron = require('node-cron');

async function obtenerImg(rutaImg,fecha){
    const insImg = 'UPDATE sismos SET img=($1) WHERE fecha=($2);';
    const $ = await request({ //aqui tengo todo el documento
        uri: rutaImg,
        transform: body => cheerio.load(body)
    });
    $('div .mapa').each(async (i,el) =>{
        const mapa = $(el).find('img').attr('src');
        const img = 'http://www.sismologia.cl' + mapa; //Ruta Imagen
        console.log('img: ', img);
        await pool.query(insImg,[img,fecha]);
    });
}

/**Funcion que Realiza el scraping a la pagina de sismologia, lee los datos y los almacena en la base de datos
 */
async function scraping(){
    /*Constantes*/
    const InsertSismo = 'INSERT INTO sismos (fecha,latitud,longitud,profundidad,magnitud,referencia) VALUES ($1, $2, $3, $4, $5, $6)';
    const valor = 'SELECT EXISTS(SELECT * FROM sismos WHERE fecha= $1)';
    const $ = await request({ //aqui tengo todo el documento
        uri: 'http://www.sismologia.cl/links/ultimos_sismos.html',
        transform: body => cheerio.load(body)
    });
    /*Recorro la tabla de la pagina de sismologia*/
    $('table tbody tr').each(async (i,el) => {
        if (i > 0){ //Se salta la primeria linea que son los titulos de la tabla 
            const f = $(el).find('a').text();
            const rutaExtra = $(el).find('a').attr('href');
            const dataRuta = 'http://www.sismologia.cl'+ rutaExtra;
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
                referencia: ref.html(),
                img: dataRuta
            };

            //consulto si los valores leidos estan en la base de datos
            const exist = await pool.query(valor,[S.fecha]);

            if(exist.rows[0].exists != true){ //si el dato no esta, se agrega a la DB
                console.log("Se agrego un nuevo sismo");
                pool.query(InsertSismo,[S.fecha,S.latitud,S.longitud,S.profundidad,S.magnitud,S.referencia]);
                obtenerImg(S.img,S.fecha);
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
    // host: 'api.jkd.cl', //servidor de postgress
    // user: 'grupo_p', //usuario postgress
    // password: 'VhJCWFJQ', //contraseña 
    // database: 'grupo_p_db', //nombre de la base de datos
    // port: '6432' //puerto de postgress (se puede definir)
});
/*GET que llama a la funcion scraping y realiza una consulta a la base de datos*/
const getTerremoto = async (req, res) => {
    // jwt.verify(req.token, 'postgres', async (err, data) => {
    //     if (err){
    //         res.sendStatus(403);
    //     }else{
    //         console.log("getSismos");
    //         await scraping();
    //         const SelectT = 'SELECT * FROM sismos';
    //         const response = await pool.query(SelectT); //consulta a la base de datos terremotos
    //         res.json(response.rows);
    //         cron.schedule("*/30 * * * *", async() => {
    //             await scraping();
    //             console.log("Cron");
    //             const SelectT = 'SELECT * FROM sismos';
    //             const response = await pool.query(SelectT); //consulta a la base de datos terremotos
    //             res.json(response.rows);
    //         });
    //     }
    // });
    console.log("getSismos");
    await scraping();
    const SelectT = 'SELECT * FROM sismos';
    const response = await pool.query(SelectT); //consulta a la base de datos terremotos
    res.json(response.rows);
    cron.schedule("*/30 * * * *", async() => {
        await scraping();
        console.log("Cron");
        const SelectT = 'SELECT * FROM sismos';
        const response = await pool.query(SelectT); //consulta a la base de datos terremotos
        res.json(response.rows);
    });
};
/**POST para crear un usuario */
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

const selectID = async (req,res) =>{
    console.log(req.params.id);
    const response = await pool.query('SELECT id, fecha, latitud, longitud, profundidad, magnitud, referencia, img FROM public.sismos where id='+req.params.id+';');
    res.json(response.rows);
};

module.exports = {
    getTerremoto,
    createUsuario,
    selectID
}