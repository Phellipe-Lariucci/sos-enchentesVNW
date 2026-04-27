const pool = require('../db');

async function criarAbrigo(req, res) {
  try {
    const {
      nome,
      endereco,
      cidade,
      capacidade_total,
      vagas_disponiveis,
      status,
    } = req.body;

    // Validação simples
    if (!nome || !endereco || !cidade) {
      return res.status(400).json({
        erro: 'nome e endereço são obrigatórios',
      });
    }
    if (capacidade_total <= 0) {
      return res.status(400).json({
        erro: 'capacidade_total deve ser maior que zero',
      });
    }
    if (vagas_disponiveis < 0) {
      return res.status(400).json({
        erro: 'vagas_disponiveis nao pode ser menor que 0',
      });
    }
    if (vagas_disponiveis > capacidade_total) {
      return res.status(400).json({
        erro: 'vagas_disponiveis nao pode ser maior que capacidade_total',
      });
    }
    const statusPermitidos = ['disponivel', 'lotado', 'indisponivel'];

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({
        erro: 'status inválido',
      });
    }

    const abrigoExistente = await pool.query(
      `SELECT id FROM abrigos 
        WHERE LOWER(nome) = LOWER($1) 
        AND LOWER(endereco) = LOWER($2) 
        AND LOWER(cidade) = LOWER($3)`,
      [nome, endereco, cidade],
    );

    if (abrigoExistente.rows.length > 0) {
      return res.status(409).json({
        erro: 'abrigo já cadastrado com este nome, endereço e cidade',
      });
    }

    const result = await pool.query(
      `INSERT INTO abrigos 
            (nome, endereco, cidade, capacidade_total, vagas_disponiveis, status) 
        VALUES 
            ($1, $2, $3, $4, $5, $6) 
        RETURNING *`,
      [nome, endereco, cidade, capacidade_total, vagas_disponiveis, status],
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'erro interno do servidor' });
  }
}

async function listarAbrigos(req, res) {
  try {
    const result = await pool.query('SELECT * FROM abrigos ORDER BY id ASC');

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro no GET /abrigos:', error);
    return res.status(500).json({ erro: 'erro interno do servidor' });
  }
}

module.exports = {
  criarAbrigo,
  listarAbrigos,
};
