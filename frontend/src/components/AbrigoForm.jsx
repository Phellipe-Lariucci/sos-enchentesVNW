function AbrigoForm({ novoAbrigo, handleChange, handleSubmit }) {
  return (
    <section className="form-section">
      <h2>Cadastrar novo abrigo</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do abrigo"
          value={novoAbrigo.nome}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={novoAbrigo.endereco}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={novoAbrigo.cidade}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="capacidade_total"
          placeholder="Capacidade total"
          value={novoAbrigo.capacidade_total}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="number"
          name="vagas_disponiveis"
          placeholder="Vagas disponíveis"
          value={novoAbrigo.vagas_disponiveis}
          onChange={handleChange}
          min="0"
          required
        />

        <select name="status" value={novoAbrigo.status} onChange={handleChange}>
          <option value="disponivel">Disponível</option>
          <option value="lotado">Lotado</option>
          <option value="indisponivel">Indisponível</option>
        </select>

        <button type="submit">Cadastrar abrigo</button>
      </form>
    </section>
  );
}

export default AbrigoForm;
