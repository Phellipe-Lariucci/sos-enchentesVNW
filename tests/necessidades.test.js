const request = require('supertest');
const app = require('../src/app');

afterAll(async () => {
  const pool = require('../src/db');
  await pool.end();
});

describe('Necessidades', () => {
  let abrigoID;

  beforeAll(async () => {
    const nomeAbrigo = `Abrigo para Necessidades ${Date.now()}`;
    const abrigoResponse = await request(app).post('/abrigos').send({
      nome: nomeAbrigo,
      endereco: 'Rua Teste, 123',
      cidade: 'Uberaba',
      capacidade_total: 100,
      vagas_disponiveis: 40,
      status: 'disponivel',
    });

    abrigoID = abrigoResponse.body.id;
  });

  it('deve criar uma necessidade para um abrigo', async () => {
    const response = await request(app).post('/necessidades').send({
      abrigo_id: abrigoID,
      item: 'Agua potavel',
      quantidade: 50,
      prioridade: 'alta',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('deve listar necessidades', async () => {
    const response = await request(app).get('/necessidades');

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('abrigo_nome');
  });

  it('não deve criar necessidade sem item', async () => {
    const response = await request(app).post('/necessidades').send({
      abrigo_id: abrigoID,
      quantidade: 50,
      prioridade: 'alta',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });

  it('nao deve criar necessidade sem abrigo', async () => {
    const response = await request(app).post('/necessidades').send({
      item: 'Agua potavel',
      quantidade: 1,
      prioridade: 'alta',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });

  it('não deve criar necessidade com quantidade menor ou igual a zero', async () => {
    const response = await request(app).post('/necessidades').send({
      abrigo_id: abrigoID,
      item: 'Água potável',
      quantidade: 0,
      prioridade: 'alta',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });

  it('não deve criar necessidade com prioridade inválida', async () => {
    const response = await request(app).post('/necessidades').send({
      abrigo_id: abrigoID,
      item: 'Água potável',
      quantidade: 50,
      prioridade: 'urgente',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });

  it('não deve criar necessidade para abrigo inexistente', async () => {
    const response = await request(app).post('/necessidades').send({
      abrigo_id: 999999,
      item: 'Água potável',
      quantidade: 50,
      prioridade: 'alta',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });
});
