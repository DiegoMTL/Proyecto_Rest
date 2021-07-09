const { Pool } = require('pg');//manera para conectarnos a postgres
const cheerio = require('cheerio');
const request = require('request-promise');

async function scraping(){
    const data= [];
    const $ = await request({ //aqui tengo todo el documento
        uri: 'http://www.sismologia.cl/links/ultimos_sismos.html',
        transform: body => cheerio.load(body)
    });
    $('table tbody tr').each((i,el) => {
        if (i > 0){
            const f = $(el).find('a').text();
            const la= $(el).find('td').next().next();
            const lon = $(el).find('td').next().next().next();
            const pro = $(el).find('td').next().next().next().next();
            const mag = $(el).find('td').next().next().next().next().next();
            const ref = $(el).find('td').next().next().next().next().next().next().next();
            //console.log(i,f, la.html(), lon.html(), pro.html(), mag.html(), ref.html()); 
            const sismo = {
                id: i,
                fecha: f, 
                latitud: parseFloat(la.html()), //double
                longitud: parseFloat(lon.html()), //double
                profundidad: parseInt(pro.html()), //int
                magnitud:  parseFloat(mag.html()), //double
                referencia: ref.html()
            };
            data[i-1] = sismo;  
        }
    });
    //console.log(data);
    console.log("Scraping");
    return data; 
}


const pool  = new Pool ({
    host: 'localhost', //servidor de postgress
    user: 'postgres', //usuario postgress
    password: 'postgres', //contraseña 
    database: 'terremotos', //nombre de la base de datos
    port: '5432' //puerto de postgress (se puede definir)

});

const getTerremoto = async (req, res) => {
    const sismos = [];
    /*const response = await pool.query('SELECT * FROM terremoto'); //consulta a la base de datos terremotos 
    console.log(response.rows); //impresion por consola
    res.status(200).json(response.rows); //impresion navegador para el estado 200
    console.log(req.body);
    res.send('Get Terremotos');*/
    sismos = scraping();
};

const createTerremoto = async (req,res)=>{
    const { fecha,latitud,longitud,profundidad,magnitud,referencia } = req.body;

    const response = await pool.query('INSERT INTO terremoto (fecha,latitud,longitud,profundidad,magnitud,referencia) VALUES ($1, $2, $3, $4, $5, $6)',[fecha,latitud,longitud,profundidad,magnitud,referencia]);
    //console.log(req.body); //Datos que una APP client 
    console.log(response); //impresion por consola
    res.json({
        message: 'Terremoto añadido satisfactoriamente',
        body: {
            terremoto: {fecha,latitud,longitud,profundidad,magnitud,referencia}
        }
    })
    res.send('Post Terremotos');
};

module.exports = {
    getTerremoto,
    createTerremoto
}