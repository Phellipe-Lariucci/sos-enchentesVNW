import { useEffect, useState } from 'react';
import AbrigoList from './components/AbrigoList';
import NecessidadeList from './components/NecessidadeList';
import AbrigoForm from './components/AbrigoForm';
import NecessidadeForm from './components/NecessidadeForm';
import {
  buscarAbrigos,
  criarAbrigo,
  buscarNecessidades,
  criarNecessidade,
} from './services/api';

function App() {
  const [abrigos, setAbrigos] = useState([]);
  const [necessidades, setNecessidades] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  function carregarAbrigos() {
    buscarAbrigos()
      .then((data) => {
        setAbrigos(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar abrigos:', error);
      });
  }

  const [novoAbrigo, setNovoAbrigo] = useState({
    nome: '',
    endereco: '',
    cidade: '',
    capacidade_total: '',
    vagas_disponiveis: '',
    status: 'disponivel',
  });

  const [novaNecessidade, setNovaNecessidade] = useState({
    abrigo_id: '',
    item: '',
    quantidade: '',
    prioridade: 'alta',
  });

  function carregarNecessidades() {
    buscarNecessidades()
      .then((data) => {
        setNecessidades(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar necessidades:', error);
      });
  }

  useEffect(() => {
    carregarAbrigos();
    carregarNecessidades();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setNovoAbrigo({
      ...novoAbrigo,
      [name]: value,
    });
  }

  function handleNecessidadeChange(event) {
    const { name, value } = event.target;

    setNovaNecessidade({
      ...novaNecessidade,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setMensagem('');
    setErro('');

    if (
      !novoAbrigo.nome ||
      !novoAbrigo.endereco ||
      !novoAbrigo.cidade ||
      !novoAbrigo.capacidade_total ||
      !novoAbrigo.vagas_disponiveis
    ) {
      setErro('Preencha todos os campos do abrigo.');
      return;
    }

    if (Number(novoAbrigo.capacidade_total) <= 0) {
      setErro('A capacidade total deve ser maior que zero.');
      return;
    }

    if (Number(novoAbrigo.vagas_disponiveis) < 0) {
      setErro('As vagas disponíveis não podem ser negativas.');
      return;
    }

    if (
      Number(novoAbrigo.vagas_disponiveis) > Number(novoAbrigo.capacidade_total)
    ) {
      setErro(
        'As vagas disponíveis não podem ser maiores que a capacidade total.',
      );
      return;
    }

    const abrigoFormatado = {
      ...novoAbrigo,
      capacidade_total: Number(novoAbrigo.capacidade_total),
      vagas_disponiveis: Number(novoAbrigo.vagas_disponiveis),
    };

    criarAbrigo(abrigoFormatado)
      .then((data) => {
        setAbrigos([...abrigos, data]);

        setNovoAbrigo({
          nome: '',
          endereco: '',
          cidade: '',
          capacidade_total: '',
          vagas_disponiveis: '',
          status: 'disponivel',
        });
        setMensagem('Abrigo cadastrado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar abrigo:', error);
        setErro(error.message);
      });
  }

  function handleNecessidadeSubmit(event) {
    event.preventDefault();

    setMensagem('');
    setErro('');

    if (
      !novaNecessidade.abrigo_id ||
      !novaNecessidade.item ||
      !novaNecessidade.quantidade ||
      !novaNecessidade.prioridade
    ) {
      setErro('Preencha todos os campos da necessidade.');
      return;
    }

    if (Number(novaNecessidade.quantidade) <= 0) {
      setErro('A quantidade deve ser maior que zero.');
      return;
    }

    const necessidadeFormatada = {
      ...novaNecessidade,
      abrigo_id: Number(novaNecessidade.abrigo_id),
      quantidade: Number(novaNecessidade.quantidade),
    };

    criarNecessidade(necessidadeFormatada)
      .then(() => {
        carregarNecessidades();

        setNovaNecessidade({
          abrigo_id: '',
          item: '',
          quantidade: '',
          prioridade: 'alta',
        });
        setMensagem('Necessidade cadastrada com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar necessidade:', error);
        setErro(error.message);
      });
  }

  return (
    <main className="app">
      <h1>SOS Enchentes</h1>

      {mensagem && <p className="alert success">{mensagem}</p>}
      {erro && <p className="alert error">{erro}</p>}

      <AbrigoForm
        novoAbrigo={novoAbrigo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <NecessidadeForm
        novaNecessidade={novaNecessidade}
        handleNecessidadeChange={handleNecessidadeChange}
        handleNecessidadeSubmit={handleNecessidadeSubmit}
        abrigos={abrigos}
      />

      <AbrigoList abrigos={abrigos} />

      <NecessidadeList necessidades={necessidades} />
    </main>
  );
}

export default App;
