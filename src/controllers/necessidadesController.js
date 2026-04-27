const pool = require('../db');

async function criarNecessidade(req, res) {
  try {
    const { abrigo_id, item, quantidade, prioridade } = req.body;

    if (!item) {
      return res.status(400).json({
        erro: 'item é obrigatório',
      });
    }
    if (!abrigo_id) {
      return res.status(400).json({
        erro: 'Identificação do abrigo é obrigatória',
      });
    }
    if (quantidade <= 0) {
      return res.status(400).json({
        erro: 'Quantidade necessaria nao pode ser igual ou menor que 0',
      });
    }

    const prioridadesPermitidas = ['alta', 'media', 'baixa'];

    if (!prioridadesPermitidas.includes(prioridade)) {
      return res.status(400).json({
        erro: 'prioridade inválida',
      });
    }

    const abrigoExiste = await pool.query(
      'SELECT id FROM abrigos WHERE id = $1',
      [abrigo_id],
    );

    if (abrigoExiste.rows.length === 0) {
      return res.status(400).json({
        erro: 'abrigo_id informado não existe',
      });
    }

    const result = await pool.query(
      `INSERT INTO necessidades (abrigo_id, item, quantidade, prioridade) VALUES($1, $2, $3, $4) RETURNING *`,
      [abrigo_id, item, quantidade, prioridade],
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro no POST /necessidades: ', error);
    return res.status(500).json({ erro: 'erro interno do servidor' });
  }
}

async function listarNecessidades(req, res) {
  try {
    const result = await pool.query(`
      SELECT 
        necessidades.id,
        necessidades.abrigo_id,
        abrigos.nome AS abrigo_nome,
        necessidades.item,
        necessidades.quantidade,
        necessidades.prioridade
      FROM necessidades
      INNER JOIN abrigos
        ON necessidades.abrigo_id = abrigos.id
      ORDER BY necessidades.id ASC
    `);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro no GET /necessidades:', error);
    return res.status(500).json({ erro: 'erro interno do servidor' });
  }
}

module.exports = {
  criarNecessidade,
  listarNecessidades,
};
