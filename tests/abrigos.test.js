const request = require('supertest');
const app = require('../src/app');

describe('Abrigos', () => {
  it('deve criar um abrigo', async () => {
    const nomeAbrigo = `Abrigo teste ${Date.now()}`;
    const response = await request(app).post('/abrigos').send({
      nome: nomeAbrigo,
      endereco: 'Rua A',
      cidade: 'Uberaba',
      capacidade_total: 100,
      vagas_disponiveis: 40,
      status: 'disponivel',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe(nomeAbrigo);
    expect(response.body.endereco).toBe('Rua A');
    expect(response.body.cidade).toBe('Uberaba');
    expect(response.body.capacidade_total).toBe(100);
    expect(response.body.vagas_disponiveis).toBe(40);
    expect(response.body.status).toBe('disponivel');
  });
  it('deve listar abrigos', async () => {
    const response = await request(app).get('/abrigos');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  //teste para caso usuario requisite sem nome
  it('não deve criar abrigo sem nome', async () => {
    const response = await request(app).post('/abrigos').send({
      endereco: 'Rua A',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });
  //teste para caso usuario requisite sem endereco
  it('não deve criar abrigo sem endereco', async () => {
    const response = await request(app).post('/abrigos').send({
      nome: 'Abrigo Teste',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });
  it('não deve criar abrigo sem cidade', async () => {
    const response = await request(app).post('/abrigos').send({
      nome: 'Abrigo teste',
      endereco: 'Rua A',
      capacidade_total: 100,
      vagas_disponiveis: 40,
      status: 'disponivel',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });
  it('não deve criar abrigo com capacidade_total menor ou igual a zero', async () => {
    const response = await request(app).post('/abrigos').send({
      nome: 'Abrigo Teste',
      endereco: 'Rua A',
      cidade: 'Uberaba',
      capacidade_total: 0,
      vagas_disponiveis: 40,
      status: 'disponivel',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });
  it('Não deve conter vagas disponiveis negativas', async () => {
    const response = await request(app).post('/abrigos').send({
      nome: 'Abrigo Teste',
      endereco: 'Rua A',
      cidade: 'Uberaba',
      capacidade_total: 100,
      vagas_disponiveis: -5,
      status: 'disponivel',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });
  it('vagas disponiveis nao pode ser maior que capacidade total', async () => {
    const response = await request(app).post('/abrigos').send({
      nome: 'Abrigo Teste',
      endereco: 'Rua A',
      cidade: 'Uberaba',
      capacidade_total: 100,
      vagas_disponiveis: 150,
      status: 'disponivel',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });
  it('status nao deve conter valores diferentes de disponivel, lotado e indisponivel', async () => {
    const response = await request(app).post('/abrigos').send({
      nome: 'Abrigo Teste',
      endereco: 'Rua A',
      cidade: 'Uberaba',
      capacidade_total: 100,
      vagas_disponiveis: 40,
      status: 'october',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('erro');
  });

  it('não deve criar abrigo duplicado com mesmo nome, endereco e cidade', async () => {
    const abrigo = {
      nome: 'Abrigo Duplicado',
      endereco: 'Rua Teste, 123',
      cidade: 'Uberaba',
      capacidade_total: 100,
      vagas_disponiveis: 40,
      status: 'disponivel',
    };

    await request(app).post('/abrigos').send(abrigo);

    const response = await request(app).post('/abrigos').send(abrigo);

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('erro');
  });
});
afterAll(async () => {
  const pool = require('../src/db');
  await pool.end();
});
