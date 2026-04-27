const express = require('express');
const router = express.Router();

const {
  criarAbrigo,
  listarAbrigos,
} = require('../controllers/abrigosController');

router.post('/abrigos', criarAbrigo);
router.get('/abrigos', listarAbrigos);

module.exports = router;
