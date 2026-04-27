const express = require('express');
const cors = require('cors');
const app = express();

const abrigosRoutes = require('./routes/abrigosRoutes');
const necessidadesRoutes = require('./routes/necessidadesRoutes');

app.use(cors());
app.use(express.json());

app.use(abrigosRoutes);
app.use(necessidadesRoutes);

//middleware para rotas inexistentes

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota nao encontrada' });
});

module.exports = app;
