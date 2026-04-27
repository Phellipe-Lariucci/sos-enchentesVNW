const API_URL = 'http://localhost:3000';

async function tratarResposta(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || 'Erro ao realizar operação');
  }

  return data;
}

export async function buscarAbrigos() {
  const response = await fetch(`${API_URL}/abrigos`);
  return tratarResposta(response);
}

export async function criarAbrigo(abrigo) {
  const response = await fetch(`${API_URL}/abrigos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(abrigo),
  });

  return tratarResposta(response);
}

export async function buscarNecessidades() {
  const response = await fetch(`${API_URL}/necessidades`);
  return tratarResposta(response);
}

export async function criarNecessidade(necessidade) {
  const response = await fetch(`${API_URL}/necessidades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(necessidade),
  });

  return tratarResposta(response);
}
