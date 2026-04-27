# SOS Enchentes

## 1. Apresentação da Ideia

O projeto **SOS EnchentesVNW** foi desenvolvido a partir de um desafio técnico para formação em fullStack na instituição Vai na Web, desafio esse, com foco em situações de enchentes no Brasil.

Durante enchentes e desastres causados por chuvas intensas, muitas pessoas precisam sair de suas casas rapidamente e encontrar locais seguros. Ao mesmo tempo, abrigos, voluntários e organizações precisam organizar informações importantes, como disponibilidade de vagas e necessidades urgentes.

Pensando nesse cenário, a ideia do projeto surgiu com o objetivo de criar uma aplicação capaz de organizar informações sobre abrigos e necessidades, facilitando o acesso a dados importantes em momentos de emergência.

---

## 2. Problema Escolhido

O problema escolhido foi a **falta de informação organizada sobre abrigos e suas necessidades durante enchentes**.

Em situações de emergência, informações importantes costumam ficar espalhadas em redes sociais, grupos de mensagens e diferentes canais de comunicação. Isso dificulta a localização de abrigos disponíveis e também prejudica a organização de doações e recursos.

Algumas dificuldades observadas nesse contexto são:

- Pessoas afetadas não sabem quais abrigos estão disponíveis;
- Abrigos podem estar lotados, mas essa informação nem sempre é atualizada;
- Doadores e voluntários não sabem quais itens são realmente necessários;
- Informações importantes ficam descentralizadas e difíceis de acessar.

---

## 3. Solução Proposta

A solução proposta foi o desenvolvimento de uma aplicação web para cadastrar, listar e organizar informações sobre abrigos e suas necessidades.

O sistema permite:

- Cadastrar abrigos;
- Listar abrigos disponíveis;
- Informar cidade, endereço, capacidade total, vagas disponíveis e status do abrigo;
- Cadastrar necessidades vinculadas a um abrigo;
- Listar necessidades com item, quantidade, prioridade e nome do abrigo;
- Validar os dados antes do cadastro;
- Exibir mensagens de erro ou sucesso ao usuário.

Dessa forma, a aplicação ajuda a centralizar informações importantes e facilita a comunicação entre pessoas afetadas, abrigos, voluntários e organizações de apoio.

---

## 4. Estrutura do Sistema

O projeto foi dividido em três partes principais:

### Front-end

O front-end foi desenvolvido com **React + Vite**.

Ele é responsável pela interface visual da aplicação, permitindo que o usuário visualize e cadastre abrigos e necessidades.

Principais funcionalidades do front-end:

- Listagem de abrigos;
- Listagem de necessidades;
- Formulário de cadastro de abrigo;
- Formulário de cadastro de necessidade;
- Validações nos campos do formulário;
- Mensagens de erro e sucesso;
- Layout responsivo.

### Back-end

O back-end foi desenvolvido com **Node.js** e **Express**.

Ele é responsável por receber as requisições do front-end, validar os dados, se comunicar com o banco de dados e retornar as respostas da API.

A estrutura do back-end foi organizada com:

- `app.js` para configuração principal da aplicação;
- `server.js` para inicialização do servidor;
- `routes` para definição das rotas;
- `controllers` para a lógica das requisições;
- `db` para conexão com o banco de dados.

### Banco de Dados

O banco de dados utilizado foi o **PostgreSQL**.

Foram criadas duas tabelas principais:

- `abrigos`
- `necessidades`

A tabela `necessidades` possui relacionamento com a tabela `abrigos`, permitindo que cada necessidade esteja vinculada a um abrigo específico.

---

## 5. Tecnologias Utilizadas

### Front-end

- React
- Vite
- JavaScript
- CSS

### Back-end

- Node.js
- Express
- CORS
- dotenv
- pg

### Banco de Dados

- PostgreSQL

### Testes

- Jest
- Supertest

### Deploy

- Vercel para o front-end
- Render para o back-end
- PostgreSQL no Render

---

## 5. Tecnologias Utilizadas

...

---

## 6. Metodologia de Desenvolvimento

O desenvolvimento do back-end foi feito utilizando uma abordagem baseada em **TDD (Test-Driven Development)**.

Durante a construção da API, os testes foram criados antes da implementação das funcionalidades principais. O ciclo seguido foi:

1. Criar um teste para o comportamento esperado;
2. Rodar o teste e observar a falha;
3. Implementar a funcionalidade;
4. Rodar novamente os testes até que passassem;
5. Refatorar o código mantendo os testes funcionando.

Essa abordagem foi aplicada principalmente nas rotas e validações de `abrigos` e `necessidades`.

---

## 7. Links do Projeto

Front-end hospedado na Vercel:

```txt
https://sos-enchentes-vnw.vercel.app
```

Back-end hospedado no Render

Repositório no GitHub:

```txt
https://github.com/Phellipe-Lariucci/sos-enchentesVNW
```

## 8. Como Rodar o Projeto Localmente

Clonar o repositório:

```bash
git clone https://github.com/Phellipe-Lariucci/sos-enchentesVNW.git
```

## 9. Configurar o Back-end

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com as informações do banco local:

```env
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=enchente
DB_HOST=localhost
DB_PORT=5432
```

Também é possível usar uma `DATABASE_URL` para ambiente de produção:

```env
DATABASE_URL=sua_url_do_banco
```

Rodar o back-end em modo desenvolvimento:

```bash
npm run dev
```

O servidor será iniciado em:

```txt
http://localhost:3000
```

---

## 10. Configurar o Front-end

Entre na pasta do front-end:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Rode o projeto:

```bash
npm run dev
```

O front-end será iniciado em:

```txt
http://localhost:5173
```

---

## 11. Estrutura do Banco de Dados

### Tabela `abrigos`

```sql
CREATE TABLE abrigos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  endereco TEXT NOT NULL,
  cidade TEXT NOT NULL,
  capacidade_total INTEGER NOT NULL,
  vagas_disponiveis INTEGER NOT NULL,
  status TEXT NOT NULL
);
```

### Tabela `necessidades`

```sql
CREATE TABLE necessidades (
  id SERIAL PRIMARY KEY,
  abrigo_id INTEGER NOT NULL REFERENCES abrigos(id) ON DELETE CASCADE,
  item TEXT NOT NULL,
  quantidade INTEGER NOT NULL,
  prioridade TEXT NOT NULL
);
```

A tabela `necessidades` possui uma chave estrangeira `abrigo_id`, que referencia a tabela `abrigos`.

Isso significa que cada necessidade cadastrada pertence a um abrigo específico.

---

## 12. Rotas da API

### Abrigos

#### Listar abrigos

```http
GET /abrigos
```

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "nome": "Abrigo Central",
    "endereco": "Rua das Flores, 123",
    "cidade": "Uberaba",
    "capacidade_total": 100,
    "vagas_disponiveis": 40,
    "status": "disponivel"
  }
]
```

#### Criar abrigo

```http
POST /abrigos
```

Exemplo de corpo da requisição:

```json
{
  "nome": "Abrigo Central",
  "endereco": "Rua das Flores, 123",
  "cidade": "Uberaba",
  "capacidade_total": 100,
  "vagas_disponiveis": 40,
  "status": "disponivel"
}
```

---

### Necessidades

#### Listar necessidades

```http
GET /necessidades
```

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "abrigo_id": 1,
    "abrigo_nome": "Abrigo Central",
    "item": "Água potável",
    "quantidade": 50,
    "prioridade": "alta"
  }
]
```

#### Criar necessidade

```http
POST /necessidades
```

Exemplo de corpo da requisição:

```json
{
  "abrigo_id": 1,
  "item": "Água potável",
  "quantidade": 50,
  "prioridade": "alta"
}
```

---

## 13. Validações Implementadas

O sistema possui validações tanto no back-end quanto no front-end.

### Abrigos

As validações implementadas para abrigos são:

- Nome obrigatório;
- Endereço obrigatório;
- Cidade obrigatória;
- Capacidade total deve ser maior que zero;
- Vagas disponíveis não podem ser negativas;
- Vagas disponíveis não podem ser maiores que a capacidade total;
- Status deve ser um dos valores permitidos:
  - `disponivel`
  - `lotado`
  - `indisponivel`;
- Não é permitido cadastrar abrigo duplicado com o mesmo nome, endereço e cidade.

Essas validações ajudam a manter os dados mais confiáveis e evitam registros inválidos no banco de dados.

### Necessidades

As validações implementadas para necessidades são:

- O abrigo deve ser informado;
- O item é obrigatório;
- A quantidade deve ser maior que zero;
- A prioridade deve ser um dos valores permitidos:
  - `alta`
  - `media`
  - `baixa`;
- Não é permitido criar uma necessidade vinculada a um abrigo inexistente.

Essas regras garantem que cada necessidade cadastrada esteja corretamente associada a um abrigo real.

---

## 14. Testes

O projeto possui testes automatizados utilizando **Jest** e **Supertest**.

Os testes foram desenvolvidos seguindo uma abordagem de **TDD**, principalmente durante a criação das rotas da API e das validações de dados.

Foram criados testes para verificar os comportamentos esperados antes da implementação ou ajuste das funcionalidades, garantindo maior segurança durante o desenvolvimento.

Para rodar os testes, use:

```bash
npm test
```

Os testes verificam:

- Criação de abrigos;
- Listagem de abrigos;
- Validações de campos obrigatórios em abrigos;
- Validação de capacidade e vagas disponíveis;
- Bloqueio de abrigos duplicados;
- Criação de necessidades;
- Listagem de necessidades;
- Validações de campos obrigatórios em necessidades;
- Validação de quantidade;
- Validação de prioridade;
- Verificação de abrigo inexistente ao cadastrar necessidade.

O uso dos testes ajuda a garantir que as principais funcionalidades da API continuem funcionando corretamente mesmo após alterações no código.

---

## 15. Organização do Projeto

A estrutura principal do projeto ficou organizada da seguinte forma:

```txt
sos-enchentes/
  src/
    controllers/
      abrigosController.js
      necessidadesController.js

    db/
      index.js

    routes/
      abrigosRoutes.js
      necessidadesRoutes.js

    app.js
    server.js

  tests/
    abrigos.test.js
    necessidades.test.js

  frontend/
    src/
      components/
        AbrigoCard.jsx
        AbrigoForm.jsx
        AbrigoList.jsx
        NecessidadeCard.jsx
        NecessidadeForm.jsx
        NecessidadeList.jsx

      services/
        api.js

      App.jsx
      main.jsx
      index.css
```

### Back-end

O back-end foi organizado em camadas para facilitar a manutenção:

- `routes`: define os endpoints da API;
- `controllers`: concentra a lógica de cada rota;
- `db`: configura a conexão com o PostgreSQL;
- `app.js`: configura middlewares e rotas;
- `server.js`: inicializa o servidor.

### Front-end

O front-end foi organizado em componentes reutilizáveis:

- `AbrigoForm`: formulário de cadastro de abrigos;
- `NecessidadeForm`: formulário de cadastro de necessidades;
- `AbrigoCard`: exibição individual de um abrigo;
- `NecessidadeCard`: exibição individual de uma necessidade;
- `AbrigoList`: listagem de abrigos;
- `NecessidadeList`: listagem de necessidades;
- `services/api.js`: centraliza as chamadas para a API.

---

## 16. Deploy

O deploy foi realizado utilizando:

- **Render** para o back-end;
- **PostgreSQL no Render** para o banco de dados;
- **Vercel** para o front-end.

Durante o deploy, o back-end foi configurado para utilizar a variável de ambiente `DATABASE_URL`.

No front-end, o arquivo `services/api.js` foi configurado para consumir a URL da API hospedada no Render.

---

## 17. Considerações Finais

Este projeto foi desenvolvido com o objetivo de aplicar tecnologia na organização de informações importantes em situações de enchentes.

Mais do que apenas cadastrar dados, a proposta busca mostrar como uma aplicação web pode ajudar a centralizar informações, facilitar a comunicação e apoiar pessoas em momentos de emergência.

O projeto demonstra conceitos de:

- Análise de problema;
- Organização de dados;
- Desenvolvimento de API;
- Integração entre front-end e back-end;
- Uso de banco relacional;
- Testes automatizados;
- Deploy de aplicação web.
