const express = require('express');
const router = express.Router();

const {
  criarNecessidade,
  listarNecessidades,
} = require('../controllers/necessidadesController');

router.post('/necessidades', criarNecessidade);
router.get('/necessidades', listarNecessidades);

module.exports = router;
