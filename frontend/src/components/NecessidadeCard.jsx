function NecessidadeCard({ necessidade }) {
  return (
    <div className="card">
      <h3>📦 {necessidade.item}</h3>
      <p>
        <strong>Abrigo:</strong> {necessidade.abrigo_nome}
      </p>
      <p>
        <strong>Quantidade:</strong> {necessidade.quantidade}
      </p>
      <p>
        <strong>Prioridade:</strong> {necessidade.prioridade}
      </p>
    </div>
  );
}

export default NecessidadeCard;
