const { Pool } = require('pg');//manera para conectarnos a postgres

const pool  = new Pool ({
    host: 'localhost', //servidor de postgress
    user: 'postgres', //usuario postgress
    password: '', //contraseña 
    database: 'terremotos', //nombre de la base de datos
    port: '8822' //puerto de postgress (se puede definir)

});

const getTerremotos = async (req, res) => {
    /**const response = await pool.query('SELECT * FROM terremoto'); //consulta a la base de datos terremotos 
    console.log(response.rows); //impresion por consola
    res.status(200).json(response.rows); //impresion navegador **/
    res.send('users');

}

module.exports = {
    getTerremotos
}