const { Pool } = require('pg');//manera para conectarnos a postgres

const pool  = new Pool ({
    host: 'localhost', //servidor de postgress
    user: 'postgres', //usuario postgress
    password: 'postgres', //contraseña 
    database: 'terremotos', //nombre de la base de datos
    port: '5432' //puerto de postgress (se puede definir)

});

const getTerremoto = async (req, res) => {
    const response = await pool.query('SELECT * FROM terremoto'); //consulta a la base de datos terremotos 
    console.log(response.rows); //impresion por consola
    res.status(200).json(response.rows); //impresion navegador para el estado 200
    console.log(req.body);
    res.send('Get Terremotos');



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