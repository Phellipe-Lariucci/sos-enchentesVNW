function NecessidadeForm({
  novaNecessidade,
  handleNecessidadeChange,
  handleNecessidadeSubmit,
  abrigos,
}) {
  return (
    <section className="form-section">
      <h2>Cadastrar nova necessidade</h2>

      <form className="form" onSubmit={handleNecessidadeSubmit}>
        <select
          name="abrigo_id"
          value={novaNecessidade.abrigo_id}
          onChange={handleNecessidadeChange}
          required
        >
          <option value="">Selecione um abrigo</option>

          {abrigos.map((abrigo) => (
            <option key={abrigo.id} value={abrigo.id}>
              {abrigo.nome} - {abrigo.cidade}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="item"
          placeholder="Item necessário"
          value={novaNecessidade.item}
          onChange={handleNecessidadeChange}
        />

        <input
          type="number"
          name="quantidade"
          placeholder="Quantidade"
          value={novaNecessidade.quantidade}
          onChange={handleNecessidadeChange}
          min="1"
          required
        />

        <select
          name="prioridade"
          value={novaNecessidade.prioridade}
          onChange={handleNecessidadeChange}
        >
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        <button type="submit">Cadastrar necessidade</button>
      </form>
    </section>
  );
}

export default NecessidadeForm;
