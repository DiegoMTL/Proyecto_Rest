const { Router } = require('express');
const router = Router();

const { getTerremotos } = require('../controllers/index.controller')

router.get('/terremotos', getTerremotos);

module.exports= router;


