//{} < \ 
const { Pool } = require('pg');//manera para conectarnos a postgres
new Pool ({


})
const getUsers = (req, res) => {
    res.send('users');
}

module.exports = {
    getUsers
}