function AbrigoCard({ abrigo }) {
  return (
    <div className="card">
      <h3>🏠 {abrigo.nome}</h3>
      <p>
        <strong>Endereço:</strong> {abrigo.endereco}
      </p>
      <p>
        <strong>Cidade:</strong> {abrigo.cidade}
      </p>
      <p>
        <strong>Capacidade total:</strong> {abrigo.capacidade_total}
      </p>
      <p>
        <strong>Vagas disponíveis:</strong> {abrigo.vagas_disponiveis}
      </p>
      <p>
        <strong>Status:</strong> {abrigo.status}
      </p>
    </div>
  );
}

export default AbrigoCard;
