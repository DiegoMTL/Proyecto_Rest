const { Router } = require('express');
const router = Router();

const { getTerremoto,createTerremoto } = require('../controllers/index.controller')

router.get('/earthquakes', getTerremoto);
router.post('/earthquakes',createTerremoto);



module.exports= router;


